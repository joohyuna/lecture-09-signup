// GlobalStyle이라고 하는, 이변수는, "클로벌 css" 기능을 리엑트에서 사용하기 위한 변수
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

`;

export default GlobalStyle;
