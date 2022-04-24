import React, { useContext } from "react";
import {
  Input,
  Select,
  H1,
  Button,
  FormContainer,
} from "../../GlobalStyles/styles";
import { UnstakeContainer } from "./styles";
import useForm from "../../hooks/useForm";
import StakeManagerContext from "../../context/StakeManager";
import useReward from "../../hooks/useStakingReward";

export default function Unstake() {
  const selectedPool = useForm({ type: "select" });
  const lpAmount = useForm({
    type: "number",
    placeholder: "eth amount",
  });
  const { poolAddress } = useContext(StakeManagerContext);
  const { unstake } = useReward({
    address: selectedPool.value ? JSON.parse(selectedPool.value).address : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPool.value) return;

    const data = {
      lpToken: JSON.parse(selectedPool.value).lpToken,
      lpAmount: lpAmount.value,
    };
    await unstake(data);
  };

  return (
    <UnstakeContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <H1 style={{ textAlign: "center" }}>Unstake</H1>
          <Input margin="20px auto" {...lpAmount} />
          <Select margin="20px auto" {...selectedPool}>
            <option>Select a token from the list</option>
            {poolAddress
              .filter((pool) => pool.isLp)
              .map((pool) => (
                <option key={pool.address} value={JSON.stringify(pool)}>
                  {pool.symbol}
                </option>
              ))}
          </Select>
          <Button>Unstake</Button>
        </form>
      </FormContainer>
    </UnstakeContainer>
  );
}
