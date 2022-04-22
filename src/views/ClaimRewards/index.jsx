import React, { useContext } from "react";
import { Select, H1, Button } from "../../GlobalStyles/styles";
import { ClaimContainer, Container } from "./styles";
import useForm from "../../hooks/useForm";
import StakeManagerContext from "../../context/StakeManager";
import useReward from "../../hooks/useStakingReward";

export default function ClaimRewards() {
  const selectedPool = useForm({ type: "select" });
  const { poolAddress } = useContext(StakeManagerContext);
  const { claimRewards } = useReward({
    address: selectedPool.value ? JSON.parse(selectedPool.value).address : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPool.value) return;

    const data = {
      lpToken: JSON.parse(selectedPool.value).lpToken,
    };
    await claimRewards(data);
  };

  return (
    <ClaimContainer>
      <Container>
        <form onSubmit={handleSubmit}>
          <H1 style={{ textAlign: "center" }}>Claim Rewards</H1>
          <Select margin="20px auto" {...selectedPool}>
            <option>Select a token from the list</option>
            {poolAddress
              .filter((pool) => pool.symbol[0] !== "U")
              .map((pool) => (
                <option key={pool.address} value={JSON.stringify(pool)}>
                  {pool.symbol}
                </option>
              ))}
          </Select>
          <Button>Claim Rewards</Button>
        </form>
      </Container>
    </ClaimContainer>
  );
}
