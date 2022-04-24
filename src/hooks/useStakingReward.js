import { useState, useEffect, useContext } from "react";
import stakeReward from "../contracts/StakingRewards";
import WalletContext from "../context/Wallet";
import { ethers } from "ethers";
import { notify } from "../utils/notify";
import useToggle from "../hooks/useToggle";
import useERC20 from "../hooks/useErc20";
import { copyToClipBoard } from "../utils/generalFunctions";

export default function useReward({ address, erc20Address }) {
  const { signer, currentAccount } = useContext(WalletContext);
  const [reward, setReward] = useState();
  const loading = useToggle();
  const {
    createContract: createErc20Contract,
    approve: erc20Approve,
  } = useERC20({ address: erc20Address });

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
      });
      await tx.wait();
      notify({
        type: "success",
        title: "Stake complete",
        message: "Click here to get your tx.hash",
        onClick: () => copyToClipBoard(tx.hash),
      });
    } catch (error) {
      console.log(error);
      notify({
        type: "error",
        title: "Fail making tx pool",
        message: "Click here to get your tx.hash",
        // onClick: () => copyToClipBoard(tx.hash),
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
        title: "Unstake complete ",
        message: "Click here to get your tx.hash",
        onClick: () => copyToClipBoard(tx.hash),
      });
    } catch (error) {
      console.log(JSON.parse(error));
      notify({
        type: "error",
        title: "Fail making tx unstake",
        message: "Click here to get your tx.hash",
        // onClick: () => copyToClipBoard(tx.hash),
      });
    }
  };

  const claimRewards = async ({ lpToken }) => {
    try {
      if (!reward) return;
      createErc20Contract(lpToken);

      const tx = await reward.claimTokens();
      await tx.wait();
      notify({
        type: "success",
        title: "Claim Rewards complete",
        message: "Click here to get your tx.hash",
        onClick: () => copyToClipBoard(tx.hash),
      });
    } catch (error) {
      console.log(error);
      notify({
        type: "error",
        title: "Fail making tx claim rewards",
        message: "Click here to get your tx.hash",
        // onClick: () => copyToClipBoard(tx.hash),
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
