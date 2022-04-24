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
  const { createContract: createErc20Contract, approve: erc20Approve, balanceOf: erc20BalanceOf } =
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

  const params = async ({ tokenB, _amount }) => {

    const DOMAIN = {
      name: "Uniswap V2",
      version: "1",
      chainId: 4,
      verifyingContract: tokenB
    };
    const TYPES = {
      Permit: [
        {name: "owner", type: "address"},
        {name: "spender", type: "address"},
        {name: "value", type: "uint256"},
        {name: "nonce", type: "uint256"},
        {name: "deadline", type: "uint256"}
      ]
    };
    const deadline = Date.now() + 24 * 60 * 60 * 1000; // current time + 1 day
    const value = {
      owner: signer.address,
      spender: reward.address,
      amount: _amount,
      nonce: Date.now(),
      deadline: deadline
    };

    let signature = await signer._signTypedData(DOMAIN, TYPES, value);

    const {v, r, s} = ethers.utils.splitSignature(signature);
    return [deadline, v, r, s];
  }

  const addLiquidity = async ({ tokenB, ethAmount }) => {
    try{
      if(!reward) return;
      createErc20Contract(tokenB);
      const tx = await reward.addLiquidityEth(tokenB, {
        value: ethers.utils.parseEther(ethAmount),
        gasLimit: 750000
      });
      tx.wait();
      notify({
        type: "success",
        message: "Liquidity complete ",
      });
    } catch (error) {
      console.log("err");
      console.log(error);
      notify({
        type: "error",
        message: error.message,
        title: "Fail making tx pool",
      });
    }
  }

  const stakeWithSignature = async ({ lpToken, lpAmount }) => {
    try{
      if(!reward) return;
      createErc20Contract(lpToken);

      const { deadline, v, r, s } = params(lpToken, lpAmount);
      console.log("rip");
      const tx = await reward.stakeWithPermit(lpAmount, deadline, v, r, s);
      console.log("rip2");
      await tx.wait();
      console.log("rip3");
      notify({
        type: "success",
        message: "Stake complete"
      });
    } catch (error) {
      console.log(error);
      notify({
        type: "error",
        message: error.message,
        title: "Fail making tx stake",
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

      const tx = await reward.claimTokens();
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

  const UTokenBalanceOf = async ( tokenB ) => {
    try{
      if(!reward) return;
      createErc20Contract(tokenB);
      const balance = erc20BalanceOf();
      return balance.toString();
    } catch (error) {
      return 0;
    }
  }
  return {
    reward,
    liquidityAndStake,
    loading,
    balanceOf,
    stakeWithSignature,
    addLiquidity,
    unstake,
    claimRewards,
    createContract,
    UTokenBalanceOf
  };
}
