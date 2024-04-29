import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle
`
* {
    margin: 0;
    padding: 0;
    font-family: 'Jersey 25', cursive;
}

body {
    width: 100vw;
    heigth: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
}
`;

export default Global;
