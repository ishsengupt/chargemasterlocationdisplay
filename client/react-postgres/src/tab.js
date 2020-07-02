import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  background: transparent;
  color: white
  height: 100%;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
  position: relative;
  margin-left: 0px;
  padding-left: 0px;
  margin-right: 0.5em;
  background-color: #343332;
  border: ${props => (props.active ? "" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  color: ${props => (props.active ? "orangered" : "white")};
  
  transition: background-color 0.5s ease-in-out;

  :hover {
    color: orangered;
  }
`;
export const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;