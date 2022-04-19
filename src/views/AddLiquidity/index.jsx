import React from "react";
import { Text, Input, Select } from "../../GlobalStyles/styles";
import { LiquidityContainer, Container } from "./styles";
import { tokens } from "../../functions/tokens";
import useForm from "../../hooks/useForm";

export default function AddLiquidity() {
  const tokenList = tokens[process.env.REACT_APP_NETWORK_ID];
  const tokenSelect = useForm({ type: "select" });
  const ethAmount = useForm({
    type: "number",
    min: 1,
    placeholder: "eth amount",
  });
  return (
    <LiquidityContainer>
      <Container>
        <h1 style={{ textAlign: "center" }}>Add liquidity - ETH / TOKEN</h1>
        <Input margin="20px auto" {...ethAmount} />
        <Select margin="20px auto" {...tokenSelect}>
          <option>Select a token from the list</option>
          {tokenList.map((token) => (
            <option key={token.address} value={token.address}>
              {token.symbol}
            </option>
          ))}
        </Select>
      </Container>
    </LiquidityContainer>
  );
}
