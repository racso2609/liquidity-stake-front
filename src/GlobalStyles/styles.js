import styled from "styled-components";
import { Link as DefaultLink } from "react-router-dom";
import { getColor } from "./Colors";

export const Link = styled(DefaultLink)`
  color: ${(props) => getColor(props.color || "foreground")};
  text-decoration: none;
`;

export const Text = styled.span`
  color: ${(props) => getColor(props.color || "foreground")};
  display: ${(props) => props.display};
  font-size: ${(props) => props.fontSize};
`;
export const H1 = styled.h1`
  color: ${(props) => getColor(props.color || "foreground")};
  display: ${(props) => props.display};
  font-size: ${(props) => props.fontSize};
`;

export const Input = styled.input`
  all: unset;
  max-width: 90%;
  background-color: ${(props) => getColor(props.background || "card")};
  border-radius: 10px;
  border: 1px solid white;
  display: block;
  padding: 10px;
  margin: ${(props) => props.margin};
  width: 100%;
  color: ${(props) => getColor(props.color || "foreground")};
`;

export const Select = styled.select`
  all: unset;
  max-width: 90%;
  color: ${(props) => getColor(props.color || "foreground")};
  background-color: ${(props) => getColor(props.background || "card")};
  border-radius: 10px;
  border: 1px solid white;
  display: block;
  padding: 10px;
  margin: ${(props) => props.margin};
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  flex-wrap: ${(props) => props.wrap || "wrap"};
`;
