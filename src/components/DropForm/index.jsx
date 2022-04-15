import React, { useContext } from "react";
import DropFactoryContext from "../../context/DropFactory";
import useToggle from "../../hooks/useToggle.js";
import useForm from "../../hooks/useForm.js";

const CreateDrop = () => {

  const { createDrop } = useContext(DropFactoryContext);
  const showForm = useToggle();

  const maxSupply = useForm({
    type: "number",
    placeholder: "max suply of nfts",
  });
  const name = useForm({ type: "text", placeholder: "name of the drop" });
  const cid = useForm({
    type: "text",
    placeholder: "cid from ipfs or use a body of your url",
  });
  const prefix = useForm({ type: "text", placeholder: "ipfs:// or https" });
  const sufix = useForm({
    type: "text",
    placeholder: "extension of your file e.j .json",
  });
  const hiddenURI = useForm({
    type: "text",
    placeholder: "URI from the nft loading image",
  });
  const maxPerTX = useForm({
    type: "number",
    placeholder: "max mint per transaction",
  });

  const crateDropHandler = async (e) => {
    e.preventDefault();
    await createDrop(
      maxSupply.value,
      name.value,
      cid.value,
      prefix.value,
      sufix.value,
      hiddenURI.value,
      maxPerTX.value
    );
  };

  return (
    <>
      <button onClick={showForm.toggle} className="cta-button mint-nft-button">
        {!showForm.show ? "Create Drops" : "Hide form"}
      </button>
      {showForm.show && (
        <form onSubmit={crateDropHandler}>
          <div className="drop-form">
            <input {...maxSupply} />
            <input {...name} />
          </div>
          <div className="drop-form">
            <input {...cid} />
            <input {...prefix} />
          </div>
          <div className="drop-form">
            <input {...sufix} />
            <input {...hiddenURI} />
          </div>
          <input {...maxPerTX} />

          <button className="cta-button mint-nft-button">Create drop</button>
        </form>
      )}
    </>
  );
};
export default CreateDrop;
