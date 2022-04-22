import styled from "styled-components";
import { getColor } from "../../GlobalStyles/Colors";

export const ClaimContainer = styled.div`
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.div`
  background-color: ${(props) => getColor(props.background || "card")};
  form {
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
