import { createContext, useEffect, useContext, useState } from "react";
import stakingManagerInfo from "../../contracts/StakingManager.json";
import { ethers } from "ethers";
import WalletContext from "../Wallet";
import { notify } from "../../utils/notify";
import { getToken } from "../../functions/tokens";
import { getContract } from "../../functions/contracts";

const StakeManagerContext = createContext();

export function StakeManagerProvider({ children }) {
  const { signer, currentAccount, setRoles } = useContext(WalletContext);

  const [stakingManager, setStakingManager] = useState(null);
  const [poolTokens, setPoolTokens] = useState([]);
  const [poolAddress, setPoolAddress] = useState([]);
  const [availablePools, setAvailablePools] = useState([]);

  const address = stakingManagerInfo.address;
  const abi = stakingManagerInfo.abi;

  useEffect(() => {
    const stakeContract = new ethers.Contract(address, abi, signer);
    setStakingManager(stakeContract);
  }, [signer]);

  useEffect(() => {
    (async () => {
      const poolsNumber = await stakingManager?.poolsAmounts();
      if (stakingManager) setPoolTokens(poolsNumber.toString());
    })();
  }, [stakingManager]);

  useEffect(() => {
    (async () => {
      if (stakingManager) {
        const DEFAULT_ADMIN_ROLE = await stakingManager.DEFAULT_ADMIN_ROLE();
        const isStakeAdmin = await stakingManager.hasRole(
          DEFAULT_ADMIN_ROLE,
          currentAccount
        );

        setRoles((prev) => ({ ...prev, stakeAdmin: isStakeAdmin }));
      }
    })();
  }, [stakingManager, currentAccount, setRoles]);
  useEffect(() => {
    (async () => {
      const allPools = [];
      const allAvailableTokenPools = [];
      for (let i = 0; i < poolTokens; i++) {
        const address = await stakingManager.stakingTokens(i);
        const pool = await stakingManager.stakingRewardsTokenInfo(address);
        const token = getToken(
          process.env.REACT_APP_NETWORK_ID,
          address,
          "address"
        );
        if (token) {
          const lpToken = getToken(
            process.env.REACT_APP_NETWORK_ID,
            `U${token.symbol}`
          );
          allPools.push({
            address: pool.stakingRewards.toString().toLowerCase(),
            token: address,
            lpToken: lpToken?.address,
            symbol: token?.symbol,
          });
          allAvailableTokenPools.push(address);
        }
      }
      setPoolAddress(allPools);
      setAvailablePools(allAvailableTokenPools);
    })();
  }, [poolTokens]);

  const deploy = async ({ stakeToken, rewardAmount }) => {
    try {
      const rewardDuration = 60 * 60 * 24 * 5;
      const uniswap = getContract(process.env.REACT_APP_NETWORK_ID, "UNISWAP");
      const uniswapFactory = getContract(
        process.env.REACT_APP_NETWORK_ID,
        "UNISWAP_FACTORY"
      );
      const weth = getToken(process.env.REACT_APP_NETWORK_ID, "WETH");

      const tx = await stakingManager
        .connect(signer)
        .deploy(
          stakeToken,
          rewardAmount,
          rewardDuration,
          uniswap.address,
          weth.address,
          uniswapFactory.address
        );
      await tx.wait();
      notify({
        type: "success",
        message: "Pool created",
      });
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
        title: "Fail creating pool",
      });
    }
  };

  const notifyRewardAmount = async ({ stakeToken }) => {
    try{
      const tx = await stakingManager
        .connect(signer)
        .notifyRewardAmount(
          stakeToken,
      );
      await tx.wait();
      notify({
        type: "success",
        message: "notifyRewardAmount successful",
      });
    }catch(error) {
      notify({
        type: "error",
        message: error.message,
        title: "Fail tx notifyRewardAmount",
      });
    }
  };

  const getPool = async (tokenAddress) => {
    try {
      const stake = await stakingManager.stakingRewardsTokenInfo(tokenAddress);

      return { stake };
    } catch (error) {
      return { error: error.message };
    }
  };

  return (
    <StakeManagerContext.Provider
      value={{
        address,
        abi,
        poolAddress,
        availablePools,
        stakingManager,
        poolTokens,
        deploy,
        notifyRewardAmount,
        getPool,
      }}
    >
      {children}
    </StakeManagerContext.Provider>
  );
}

export default StakeManagerContext;
