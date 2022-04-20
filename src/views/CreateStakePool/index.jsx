import React, { useContext, useEffect } from "react";
import { StakeContainer, Container } from "./styles";
import StakeManagerContext from "../../context/StakeManager";
import useForm from "../../hooks/useForm";
import { Select, Input } from "../../GlobalStyles/styles";
import { tokens } from "../../functions/tokens";
import { notify } from "../../utils/notify";

export default function CreateStackPool() {
  const { deploy } = useContext(StakeManagerContext);
  const tokenList = tokens[process.env.REACT_APP_NETWORK_ID];
  const selectToken = useForm({ type: "select" });
  const rewardAmount = useForm({
    type: "number",
    placeholder: "Reward Amount",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectToken.value || !rewardAmount.value)
      return notify({ type: "error", message: "fill all fields" });
    const data = {
      stakeToken: selectToken.value,
      rewardAmount: rewardAmount.value,
    };
    await deploy(data);
  };

  return (
    <StakeContainer>
      <Container>
        <form onSubmit={handleSubmit}>
          <h1>Create pool</h1>
          <Select {...selectToken}>
            <option>Select stake token</option>
            {tokenList.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </Select>
          <Input {...rewardAmount} />
          <button>Submit</button>
        </form>
      </Container>
    </StakeContainer>
  );
}
