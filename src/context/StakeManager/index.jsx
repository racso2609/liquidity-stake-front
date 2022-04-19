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

  const deploy = async ({ stakeToken, rewardAmount }) => {
    try {
      const rewardDuration = (Date.now / 1000) * 60 * 60 * 5 * 24;
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
      console.log(tx);
      notify({
        type: "success",
        message: "Pool created",
      });
    } catch (error) {
      console.log(error);
      notify({
        type: "error",
        message: error.message,
        title: "Fail creating pool",
      });
    }
  };

  return (
    <StakeManagerContext.Provider
      value={{ address, abi, stakingManager, poolTokens, deploy }}
    >
      {children}
    </StakeManagerContext.Provider>
  );
}

export default StakeManagerContext;
