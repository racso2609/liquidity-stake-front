import { useState, useEffect, useContext } from "react";
import stakeReward from "../contracts/StakingRewards";
import WalletContext from "../context/Wallet";
import { ethers } from "ethers";
import { notify } from "../utils/notify";
import useToggle from "../hooks/useToggle";
import erc20Abi from "../contracts/RewardToken.json";
import { getToken } from "../functions/tokens";

export default function useReward({ address }) {
  const { signer } = useContext(WalletContext);
  const [reward, setReward] = useState();
  const loading = useToggle();

  const abi = stakeReward.abi;

  useEffect(() => {
    if (address && signer) {
      loading.toggle();
      const stakeContract = new ethers.Contract(address, abi, signer);
      setReward(stakeContract);
      loading.toggle();
    }
  }, [signer, address]);

  const liquidityAndStake = async ({ tokenB, ethAmount }) => {
    try {
      const tokenContract = new ethers.Contract(
        getToken(process.env.REACT_APP_NETWORK_ID, "UDAI").address,
        erc20Abi.abi,
        signer
      );
      let tx = await tokenContract
        .connect(signer)
        .approve(reward.address, ethers.utils.parseEther("100"));
      tx = await reward.addLiquidityAndStake(tokenB, {
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

  return {
    reward,
    liquidityAndStake,
    loading,
  };
}
