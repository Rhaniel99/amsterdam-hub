import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle
`
* {
    margin: 0;
    padding: 0;
    font-family: "PT Serif", serif;
}

body {
    width: 100vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
}
.App {

    margin-top: 60px ;
    width: 50vw;
    height: 50vh;
}

`;

export default Global;
