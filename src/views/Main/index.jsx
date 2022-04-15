import React, { useContext, useEffect, useState } from "react";
import WalletContext from "../../context/Wallet";
import DropFactoryContext from "../../context/DropFactory";
import useToggle from "../../hooks/useToggle.js";
import useForm from "../../hooks/useForm.js";
import DropCard from "../../components/DropsCard";
import CreateDrop from '../../components/DropForm';

const ConnectWalletButton = () => {
  const { connectWalletHandler } = useContext(WalletContext);

  return (
    <button
      onClick={connectWalletHandler}
      className="cta-button connect-wallet-button"
    >
      Connect Wallet
    </button>
  );
};


const Main = () => {
  const { currentAccount } = useContext(WalletContext);
  const { totalDrops, getAllDrops } = useContext(DropFactoryContext);
  const [dropsCount, setDropsCount] = useState(0);
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    if (totalDrops) {
      const dropsNumber = totalDrops();
      const allDrops = getAllDrops();

      Promise.all([dropsNumber, allDrops]).then((e) => {
        setDropsCount(e[0]?.toString());
        setDrops(e[1]);
      });
    }
    //eslint-disable-next-line
  }, [getAllDrops, totalDrops]);

  return (
    <div className="main-app">
      <h1>add liquidy {dropsCount}</h1>
      {currentAccount ? <CreateDrop /> : <ConnectWalletButton />}
      <div className="drops-grid">
        {drops.map((drop, index) => {
          return <DropCard dropId={index} key={index + drop.name} drop={drop} />;
        })}
      </div>
    </div>
  );
};

export default Main;
