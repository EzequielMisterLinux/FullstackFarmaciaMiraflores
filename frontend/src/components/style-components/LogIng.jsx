// style-components.js
import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Button = styled.button`
  display: flex;
  background: radial-gradient(#eeff56, #33570b);
  flex-direction: row;
  align-items: center;
  border: none;
  padding: 8px;
  border-color: black;
  justify-content: space-between;
  border-radius: 8px;
  width: 100px;
  position: relative;
  z-index: 0;
  transform: scale(1);
  transition: 2s;

  &:hover {
    transform: scale(1.1);
    transition: 2s;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-color: black;
    border-radius: 8px;
    background: linear-gradient(-45deg, #ff92eb, #a7d4ff, #93ff85, #003044);
    backdrop-filter: blur(50px);
    z-index: -1;
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
  }
`;


export const Centrado = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  z-index: 2;
`;


export const NotShowLogin = styled.div`
display: none;

`

export const exitIcon = styled.div`
color: red;
padding: 10px 10px;
display: none;
`