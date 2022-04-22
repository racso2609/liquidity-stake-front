import React, { useContext } from "react";
import { Input, Select, H1, Button } from "../../GlobalStyles/styles";
import { LiquidityContainer, Container } from "./styles";
import useForm from "../../hooks/useForm";
import StakeManagerContext from "../../context/StakeManager";
import useReward from "../../hooks/useStakingReward";

export default function AddLiquidity() {
  const selectedPool = useForm({ type: "select" });
  const ethAmount = useForm({
    type: "number",
    placeholder: "eth amount",
  });
  const { poolAddress } = useContext(StakeManagerContext);
  const { liquidityAndStake } = useReward({
    address: selectedPool.value ? JSON.parse(selectedPool.value).address : "",
    erc20Address: selectedPool.value
      ? JSON.parse(selectedPool.value).address
      : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPool.value) return;

    const data = {
      tokenB: JSON.parse(selectedPool.value).token,
      ethAmount: ethAmount.value,
    };
    await liquidityAndStake(data);
  };

  return (
    <LiquidityContainer>
      <Container>
        <form onSubmit={handleSubmit}>
          <H1 style={{ textAlign: "center" }}>Add liquidity - ETH / TOKEN</H1>
          <Input margin="20px auto" {...ethAmount} />
          <Select margin="20px auto" {...selectedPool}>
            <option>Select a token from the list</option>
            {poolAddress
              .filter((pool) => pool.symbol[0] === "U")
              .map((pool) => (
                <option key={pool.address} value={JSON.stringify(pool)}>
                  {pool.symbol}
                </option>
              ))}
          </Select>
          <Button>Stake</Button>
        </form>
      </Container>
    </LiquidityContainer>
  );
}
