import React, { createContext, useEffect, useState } from "react";
import DropFactoryContract from "../../Contracts/NftDrop.json";
import { ethers } from "ethers";

const DropFactoryContext = createContext();

export function DropFactoryProvider({ children }) {
  const address = DropFactoryContract.address;
  const abi = DropFactoryContract.abi;
  const [dropFactory, setDropFactory] = useState(null);
  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return alert("Install metamask");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const dropFactoryContract = new ethers.Contract(address, abi, signer);
    setDropFactory(dropFactoryContract);
  }, [abi, address]);

  const createDrop = async (
    maxSupply,
    name,
    cid,
    prefix,
    sufix,
    hiddenURI,
    maxPerTx
  ) => {
    try {
      const tx = await dropFactory.createDrop(
        ethers.BigNumber.from(maxSupply),
        name,
        cid,
        prefix,
        sufix,
        hiddenURI,
        ethers.BigNumber.from(maxPerTx)
      );
      console.log("loading...");
      await tx.wait();
      alert("drop create succesfully " + tx.hash);
    } catch (error) {
      alert(error.message);
    }
  };
  const totalDrops = async () => {
    return await dropFactory?.totalDrops();
  };
  const getAllDrops = async () => {
    const dropsCount = await totalDrops();
    const allDrops = [];
    for (let i = 0; i < dropsCount; i++) {
      const drop = await dropFactory.drops(i);
      allDrops.push(drop);
    }
    return allDrops;
  };
  const getDropById = async (dropId) => {
    return await dropFactory?.drops(dropId);
  };
  const mintDrop = async (dropId, mintAmount) => {
    try {
      const tx = await dropFactory.mint(
        dropId,
        ethers.BigNumber.from(mintAmount),
        {
          gasLimit: 750000,
          value: ethers.utils.parseEther("0.01").mul(mintAmount),
        }
      );
      console.log("loading...");
      await tx.wait();
      alert("mint succesfully " + tx.hash);
    } catch (error) {
      alert(error.message);
    }
  };
  const revealDrop = async(dropId) => {
    try {
      const tx = await dropFactory.defineDrop(dropId);
      console.log("loading...");
      await tx.wait();
      alert("drop revealed" + tx.hash);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <DropFactoryContext.Provider
      value={{
        address,
        abi,
        getAllDrops,
        dropFactory,
        createDrop,
        totalDrops,
        getDropById,
        mintDrop,
    revealDrop
      }}
    >
      {children}
    </DropFactoryContext.Provider>
  );
}
export default DropFactoryContext;
