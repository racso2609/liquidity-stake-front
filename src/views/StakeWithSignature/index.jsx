import React, { useContext, useEffect, useState } from "react";

import { Input, Select, H1, Button, Text } from "../../GlobalStyles/styles";
import { StakeContainer, Container } from "./styles";
import useForm from "../../hooks/useForm";
import StakeManagerContext from "../../context/StakeManager";
import useReward from "../../hooks/useStakingReward";
import { tokens } from "../../functions/tokens";
const AddLiquidity = () => {
  const networkId = process.env.REACT_APP_NETWORK_ID;
  const tokenList = tokens[networkId];
  const selectedToken = useForm({ type: "select" });
  const stakeAmount = useForm({
    type: "number",
    placeholder: "eth amount",
  });
  const { stakeWithSignature, addLiquidity, UTokenBalanceOf } = useReward({
    address: selectedToken.value ? JSON.parse(selectedToken.value).address : "",
    erc20Address: selectedToken.value
      ? JSON.parse(selectedToken.value).address
      : "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const liquidityData = {
      tokenB: JSON.parse(selectedToken.value).address,
      ethAmount: stakeAmount.value,
    };
    addLiquidity(liquidityData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <H1 style={{ textAlign: "center" }}>Add liquidity</H1>
        <Input margin="20px auto" {...stakeAmount} />
        <Select margin="20px auto" {...selectedToken}>
          <option>Select a token from the list</option>
          {tokenList
            .filter((token) => token.symbol[0] !== "U")
            .map((pool) => (
              <option key={pool.address} value={JSON.stringify(pool)}>
                {pool.symbol}
              </option>
            ))}
        </Select>
        <Button>Stake</Button>
      </form>
    </Container>
  );
};

export default function StakeSignature() {
  const [uTokenBalanceOf, setUTokenBalanceOf] = useState();
  const selectedPool = useForm({ type: "select" });
  const stakeAmount = useForm({
    type: "number",
    placeholder: "eth amount",
  });
  // const { poolAddress } = useContext(StakeManagerContext);
  const poolAddress = tokens[process.env.REACT_APP_NETWORK_ID];
  const { stakeWithSignature, addLiquidity, UTokenBalanceOf } = useReward({
    address: selectedPool.value ? JSON.parse(selectedPool.value).address : "",
    erc20Address: selectedPool.value
      ? JSON.parse(selectedPool.value).lpToken
      : "",
  });
  useEffect(() => {
    (async () => {
      if (selectedPool.value) {
        const balance = await UTokenBalanceOf(
          JSON.parse(selectedPool.value).lpToken
        );
        console.log(
          "balance",
          balance,
          "symbol",
          JSON.parse(selectedPool.value).symbol
        );
      }
    })();
  }, [selectedPool.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPool.value) return;
    const liquidityData = {
      tokenB: JSON.parse(selectedPool.value).lpToken,
      ethAmount: stakeAmount.value,
    };

    await addLiquidity(liquidityData);
    const liquidity = await UTokenBalanceOf(
      JSON.parse(selectedPool.value).lpToken
    );

    console.log("liquidity: " + liquidity.value);
    const data = {
      lpToken: JSON.parse(selectedPool.value).lpToken,
      lpAmount: liquidity.toString(),
    };
    await stakeWithSignature(data);
  };

  return (
    <StakeContainer justify="space-around" direction="row">
      <AddLiquidity />

      <Container>
        <form onSubmit={handleSubmit}>
          <H1 style={{ textAlign: "center" }}>Stake with Signature</H1>
          <Text>lp balance: </Text>
          <Input margin="20px auto" {...stakeAmount} />
          <Select margin="20px auto" {...selectedPool}>
            <option>Select a token from the list</option>
            {poolAddress
              // .filter((pool) => pool.isLp)
              .map((pool) => (
                <option key={pool.address} value={JSON.stringify(pool)}>
                  {pool.symbol.substring(1, pool.symbol.length)}
                </option>
              ))}
          </Select>
          <Button>Stake</Button>
        </form>
      </Container>
    </StakeContainer>
  );
}
