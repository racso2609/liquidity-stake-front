import styled from "styled-components";
import { Link as DefaultLink } from "react-router-dom";
import { getColor } from "./Colors";

export const Link = styled(DefaultLink)`
  color: ${(props) => getColor(props.color || "foreground")};
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align || "center"};
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
  background-color: ${(props) => getColor(props.background || "card")};
  border-radius: 10px;
  border: 1px solid white;
  display: block;
  max-width: 90%;
  padding: 10px;
  margin: ${(props) => props.margin};
  width: 100%;
  color: ${(props) => getColor(props.color || "foreground")};
`;

export const Select = styled.select`
  all: unset;
  color: ${(props) => getColor(props.color || "foreground")};
  background-color: ${(props) => getColor(props.background || "card")};
  border-radius: 10px;
  border: 1px solid white;
  display: block;
  padding: 10px;
  margin: ${(props) => props.margin};
  width: 100%;
  max-width: 90%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  flex-wrap: ${(props) => props.wrap || "wrap"};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => getColor(props.background || "transparent")};
`;

export const Button = styled.button`
  all: unset;
  color: ${(props) => getColor(props.color || "foreground")};
  background: ${(props) => getColor(props.background || "active")};
  border-radius: 15px;
  padding: ${(props) => props.padding || "10px"};
  text-align: center;
  margin: ${(props) => props.margin};
  transition-timing-function: ease;
  width: ${(props) => props.width || "90%"};
  transition: 1s;
  :hover {
    opacity: 0.8;
  }
`;
