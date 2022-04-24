import React, { useContext } from "react";
import { NotifyContainer } from "./styles";
import StakeManagerContext from "../../context/StakeManager";
import useForm from "../../hooks/useForm";
import { Select, H1, Button, FormContainer } from "../../GlobalStyles/styles";
import { notify } from "../../utils/notify";

export default function CreateStackPool() {
  const { notifyRewardAmount } = useContext(StakeManagerContext);
  const { poolAddress } = useContext(StakeManagerContext);
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
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <H1>Notify Reward Amount</H1>
          <Select margin="20px auto" {...selectToken}>
            <option>Select stake token</option>
            {poolAddress
              .filter((pool) => pool.isLp)
              .map((pool) => (
                <option key={pool.address} value={pool.address}>
                  {pool.symbol}
                </option>
              ))}
          </Select>
          <Button>Notify</Button>
        </form>
      </FormContainer>
    </NotifyContainer>
  );
}
