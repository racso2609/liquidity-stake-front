import { useState, useEffect, useContext } from "react";
import stakeReward from "../contracts/StakingRewards";
import WalletContext from "../context/Wallet";
import { ethers } from "ethers";
import { notify } from "../utils/notify";
import useToggle from "../hooks/useToggle";
import useERC20 from "../hooks/useErc20";

export default function useReward({ address, erc20Address }) {
  const { signer, currentAccount } = useContext(WalletContext);
  const [reward, setReward] = useState();
  const loading = useToggle();
  const { createContract: createErc20Contract, approve: erc20Approve } =
    useERC20({ address: erc20Address });

  const abi = stakeReward.abi;

  useEffect(() => {
    if (address && signer) {
      createContract(address);
    }
  }, [signer, address]);

  useEffect(() => {
    if (erc20Address && signer) {
      createErc20Contract(erc20Address);
    }
  }, [signer, erc20Address]);

  const createContract = (contractAddress) => {
    const stakeContract = new ethers.Contract(contractAddress, abi, signer);
    setReward(stakeContract);
  };

  const liquidityAndStake = async ({ tokenB, ethAmount }) => {
    try {
      if (!reward) return;
      await erc20Approve({
        to: reward.address,
        amount: ethers.utils.parseEther("100"),
      });

      const tx = await reward.addLiquidityAndStake(tokenB, {
        value: ethers.utils.parseEther(ethAmount),
        gasLimit: 750000,
      });
      await tx.wait();
      notify({
        type: "success",
        message: "Stake complete ",
      });
    } catch (error) {
      console.log(error);
      notify({
        type: "error",
        message: error.message,
        title: "Fail making tx pool",
      });
    }
  };

  const unstake = async ({ lpToken, lpAmount }) => {
    try {
      if (!reward) return;
      createErc20Contract(lpToken);

      const tx = await reward.unstake(lpAmount);
      await tx.wait();
      notify({
        type: "success",
        message: "Unstake complete ",
      });
    } catch (error) {
      console.log(error);
      notify({
        type: "error",
        message: error.message,
        title: "Fail making tx unstake",
      });
    }
  };

  const claimRewards = async ({ lpToken }) => {
    try {
      if (!reward) return;
      createErc20Contract(lpToken);

      const tx = await reward.claimRewards();
      await tx.wait();
      notify({
        type: "success",
        message: "Claim Rewards complete",
      });
    } catch (error) {
      console.log(error);
      notify({
        type: "error",
        message: error.message,
        title: "Fail making tx claim rewards",
      });
    }
  };

  const balanceOf = async () => {
    try {
      if (!reward) return;
      const balance = await reward.balanceOf(currentAccount);
      return balance.toString();
    } catch (error) {
      return 0;
    }
  };
  return {
    reward,
    liquidityAndStake,
    loading,
    balanceOf,
    unstake,
    claimRewards,
    createContract,
  };
}
