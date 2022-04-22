import React, { useContext } from "react";
import { H1, Input, Container, Button } from "../../GlobalStyles/styles";
import { ContainerForm } from "./styles";
import useForm from "../../hooks/useForm";
import StakeManagerContext from "../../context/StakeManager";

export default function AdminView() {
  const address = useForm({ type: "text", placeholder: "New admin address" });
  const { setAdmin } = useContext(StakeManagerContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setAdmin(address.value);
  };

  return (
    <Container minHeight="90vh" justify="center" align="center">
      <ContainerForm>
        <form onSubmit={handleSubmit}>
          <H1 margin="10px 0">Add Admin</H1>
          <Input margin="0 0 20px 0" {...address} />
          <Button>Add new admin</Button>
        </form>
      </ContainerForm>
    </Container>
  );
}
