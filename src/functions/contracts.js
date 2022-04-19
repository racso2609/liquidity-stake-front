const contracts = {
  [1]: [
    {
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      name: "UNISWAP",
    },
    {
      address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      name: "UNISWAP_FACTORY",
    },
  ],
  [4]: [
    {
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      name: "UNISWAP",
    },

    {
      address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      name: "UNISWAP_FACTORY",
    },
  ],
};

const getContract = (networkId, name) => {
  return contracts[networkId].find((contract) => contract.name === name);
};

export { contracts, getContract };
