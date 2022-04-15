import React, { useContext, useEffect, useState } from "react";
import DropFactoryContext from "../../context/DropFactory";
import WalletContext from "../../context/Wallet";
import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
const styleContainer = {
  padding: "10px 20px",
};
const styleForm = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
};
const styleHeader = {
  ...styleForm,
  flexDirection: "row",
  justifyContent: "space-between",
};

function DropInfo() {
  const { getDropById, mintDrop, revealDrop } = useContext(DropFactoryContext);
  const { currentAccount } = useContext(WalletContext);
  const { dropId } = useParams();
  const [drop, setDrop] = useState({});
  const mintQuantity = useForm({
    type: "number",
    placeholder: "quantity of mints",
    min: 1,
    max: drop?.maxMintPerTx,
  });

  useEffect(() => {
    const dropPromise = getDropById(dropId);
    Promise.all([dropPromise]).then((e) => {
      setDrop(e[0]);
    });
  }, [getDropById, dropId]);
  const revealNFTS = async () => {
    if (currentAccount.toString() !== drop?.owner.toString())
      return alert("You are not the owner");
    await revealDrop(dropId);
  };
  const mintHandler = async (e) => {
    e.preventDefault();
    const mintAmount = mintQuantity.value;
    await mintDrop(dropId, mintAmount);
  };

  return (
    <div style={styleContainer}>
      <div style={styleHeader}>
        <div>
          <h1>{drop?.name}</h1>
          <p>
            {drop?.totalNft?.toString()}/{drop?.maxSupply?.toString()}
          </p>
        </div>
        {drop?.owner?.toLowerCase().toString() ===
          currentAccount?.toLowerCase()?.toString() && (
          <button
            onClick={revealNFTS}
            className="cta-button connect-wallet-button"
          >
            Reveal drop
          </button>
        )}
      </div>
      <form style={styleForm} onSubmit={mintHandler}>
        <input style={{ margin: "10px 0" }} {...mintQuantity} />
        <button className="cta-button connect-wallet-button">Mint</button>
      </form>
    </div>
  );
}

export default DropInfo;
