const tokens = {
  [1]: [
    {
      decimals: 18,
      symbol: "ETH",
      address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
    {
      decimals: 18,
      symbol: "LINK",
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    },
    {
      decimals: 6,
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      decimals: 8,
      symbol: "CDAI",
      address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    },
    {
      decimals: 18,
      symbol: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
    {
      decimals: 18,
      symbol: "ALBT",
      address: "0x00a8b738E453fFd858a7edf03bcCfe20412f0Eb0",
    },
    {
      decimals: 18,
      symbol: "WETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
      decimals: 18,
      symbol: "UDAI",
      address: "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
    },
    {
      decimals: 18,
      symbol: "ULINK",
      address: "0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974",
    },
  ],
  [4]: [
    {
      decimals: 18,
      symbol: "DAI",
      address: "0x95b58a6Bff3D14B7DB2f5cb5F0Ad413DC2940658",
    },
    {
      decimals: 18,
      symbol: "UDAI",
      address: "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11",
    },
    {
      decimals: 18,
      symbol: "WETH",
      address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    },
    {
      decimals: 18,
      symbol: "ULINK",
      address: "0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974",
    },
  ],
};

const getToken = (networkId, symbol) => {
  return tokens[networkId].find((token) => token.symbol === symbol);
};

export { tokens, getToken };
