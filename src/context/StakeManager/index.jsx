import { createContext, useEffect, useContext, useState } from "react";
import stakingManagerInfo from "../../contracts/StakingManager.json";
import { ethers } from "ethers";
import WalletContext from "../Wallet";

const StakeManagerContext = createContext();

export function StakeManagerProvider({ children }) {
  const { signer } = useContext(WalletContext);
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

  const deploy = () => {};

  return (
    <StakeManagerContext.Provider
      value={{ address, abi, stakingManager, poolTokens }}
    >
      {children}
    </StakeManagerContext.Provider>
  );
}

export default StakeManagerContext;
