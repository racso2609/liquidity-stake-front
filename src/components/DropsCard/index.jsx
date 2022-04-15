import React from "react";
import { Link } from "react-router-dom";
const stylesContainer = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  padding: "5px 10px",
  margin: "20px 0",
  height: "100%",
};
const styleLink = {
  color: "black",
  textDecoration: "none",
};

function DropsCard({ drop, dropId }) {
  return (
    <div style={stylesContainer}>
      <Link style={styleLink} to={`/drops/${dropId}`}>
        <h4>{drop.name}</h4>
        <p>
          avaliable mint: {drop?.totalNft.toString()}/
          {drop?.maxSupply.toString()}
        </p>
      </Link>
    </div>
  );
}

export default DropsCard;
