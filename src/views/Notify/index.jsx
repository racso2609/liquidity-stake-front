import React, { useContext } from "react";
import { NotifyContainer, Container } from "./styles";
import StakeManagerContext from "../../context/StakeManager";
import useForm from "../../hooks/useForm";
import { Select, H1, Button } from "../../GlobalStyles/styles";
import { tokens } from "../../functions/tokens";
import { notify } from "../../utils/notify";

export default function CreateStackPool() {
  const { notifyRewardAmount } = useContext(StakeManagerContext);
  const tokenList = tokens[process.env.REACT_APP_NETWORK_ID];
  const selectToken = useForm({ type: "select" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectToken.value)
      return notify({ type: "error", message: "fill all fields" });
    const data = {
      stakeToken: selectToken.value,
    };
    await notifyRewardAmount(data);
  };

  return (
    <NotifyContainer>
      <Container>
        <form onSubmit={handleSubmit}>
          <H1>Notify Reward Amount</H1>
          <Select margin="20px auto" {...selectToken}>
            <option>Select stake token</option>
            {tokenList
              .filter((token) => token.symbol[0] === "U")
              .map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol}
                </option>
              ))}
          </Select>
          <Button>Notify</Button>
        </form>
      </Container>
    </NotifyContainer>
  );
}
