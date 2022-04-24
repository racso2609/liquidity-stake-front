import React, { useContext } from "react";
import { StakeContainer } from "./styles";
import StakeManagerContext from "../../context/StakeManager";
import useForm from "../../hooks/useForm";
import {
  Select,
  Input,
  H1,
  Button,
  FormContainer,
} from "../../GlobalStyles/styles";
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
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <H1>Create pool</H1>
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
          <Input margin="20px auto" {...rewardAmount} />
          <Button>Submit</Button>
        </form>
      </FormContainer>
    </StakeContainer>
  );
}
