import { useState, useEffect, useContext } from "react";
import erc20Abi from "../contracts/RewardToken.json";
import WalletContext from "../context/Wallet";
import { ethers } from "ethers";
const abi = erc20Abi.abi;

export default function useERC20({ address }) {
  const [contract, setContract] = useState(null);
  const { signer, currentAccount } = useContext(WalletContext);

  useEffect(() => {
    if (address && abi && signer) {
      const newContract = new ethers.Contract(address, abi, signer);
      setContract(newContract);
    } else {
      setContract(null);
    }
  }, [address, abi]);

  const createContract = (contractAddress) => {
    if (contractAddress) {
      const newContract = new ethers.Contract(contractAddress, abi, signer);
      setContract(newContract);
    }
  };
  const balanceOf = async () => {
    try {
      if (contract) {
        const balance = await contract.balanceOf(currentAccount);
        return balance.toString();
      }
      return 0;
    } catch (error) {
      return 0;
    }
  };
  const approve = async ({ to, amount }) => {
    await contract.connect(signer).approve(to, amount, { gasLimit: 750000 });
  };

  return { abi, erc20Contract: contract, balanceOf, approve, createContract };
}
