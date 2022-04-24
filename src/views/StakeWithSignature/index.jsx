import React, { useContext } from "react";
import { Input, Select, H1, Button } from "../../GlobalStyles/styles";
import { StakeContainer, Container } from "./styles";
import useForm from "../../hooks/useForm";
import StakeManagerContext from "../../context/StakeManager";
import useReward from "../../hooks/useStakingReward";


export default function AddLiquidity() {
  const selectedPool = useForm({ type: "select" });
  const stakeAmount = useForm({
    type: "number",
    placeholder: "eth amount",
  });
  const { poolAddress } = useContext(StakeManagerContext);
  const { stakeWithSignature, addLiquidity, UTokenBalanceOf } = useReward({
    address: selectedPool.value ? JSON.parse(selectedPool.value).address : "",
    erc20Address: selectedPool.value
      ? JSON.parse(selectedPool.value).lpToken
      : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPool.value) return;
    const liquidityData = {
      tokenB: JSON.parse(selectedPool.value).lpToken,
      ethAmount: stakeAmount.value,
    };

    await addLiquidity(liquidityData);
    const liquidity = await UTokenBalanceOf(JSON.parse(selectedPool.value).lpToken);

    console.log("liquidity: " + liquidity.value);
    const data = {
      lpToken: JSON.parse(selectedPool.value).lpToken,
      lpAmount: liquidity.toString(),
    };
    await stakeWithSignature(data);
  };

  return (
    <StakeContainer>
      <Container>
        <form onSubmit={handleSubmit}>
          <H1 style={{ textAlign: "center" }}>Stake with Signature</H1>
          <Input margin="20px auto" {...stakeAmount} />
          <Select margin="20px auto" {...selectedPool}>
            <option>Select a token from the list</option>
            {poolAddress
              .filter((pool) => pool.isLp)
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
