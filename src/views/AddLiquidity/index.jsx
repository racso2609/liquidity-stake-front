import React, { useContext } from "react";
import { Input, Select } from "../../GlobalStyles/styles";
import { LiquidityContainer, Container } from "./styles";
import { tokens } from "../../functions/tokens";
import useForm from "../../hooks/useForm";
import StakeManagerContext from "../../context/StakeManager";
import useReward from "../../hooks/useStakingReward";

export default function AddLiquidity() {
  const tokenList = tokens[process.env.REACT_APP_NETWORK_ID];
  const tokenSelect = useForm({ type: "select" });
  const ethAmount = useForm({
    type: "number",
    placeholder: "eth amount",
  });
  const { poolAddress, availablePools } = useContext(StakeManagerContext);
  const { loading: loadingRewardContract, liquidityAndStake } = useReward({
    address: poolAddress.find(
      (pool) => pool.token.toLowerCase() === tokenSelect.value.toLowerCase()
    )?.address,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { tokenB: tokenSelect.value, ethAmount: ethAmount.value };
    await liquidityAndStake(data);
  };

  return (
    <LiquidityContainer>
      <Container>
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>Add liquidity - ETH / TOKEN</h1>
          <Input margin="20px auto" {...ethAmount} />
          <Select margin="20px auto" {...tokenSelect}>
            <option>Select a token from the list</option>
            {tokenList
              .filter((token) => {
                return availablePools.includes(token.address);
              })
              .map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol}
                </option>
              ))}
          </Select>
          <button disabled={loadingRewardContract.show}>Stake</button>
        </form>
      </Container>
    </LiquidityContainer>
  );
}
