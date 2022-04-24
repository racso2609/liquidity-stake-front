import styled from "styled-components";
import { getColor } from "../../GlobalStyles/Colors";
import { Container as DefaultContainer } from "../../GlobalStyles/styles";

export const StakeContainer = styled(DefaultContainer)`
  min-height: 90vh;
  flex: 0;
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
  form {
    background-color: ${(props) => getColor(props.background || "card")};
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
