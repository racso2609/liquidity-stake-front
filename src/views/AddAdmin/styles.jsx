import { Container } from "../../GlobalStyles/styles";
import styled from "styled-components";
import { getColor } from "../../GlobalStyles/Colors";

export const ContainerForm = styled(Container)`
  form {
    background-color: ${(props) => getColor(props.background || "card")};
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
  }
`;
