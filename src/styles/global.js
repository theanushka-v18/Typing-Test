import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
}

body {
    color: ${({theme}) => theme.textColor};
    background-color: ${({theme}) => theme.backgroundColor};
    margin: 0;
    padding: 0;
    transition: all 0.3s linear;
}

.canvas {
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: 1fr auto 1fr;
    gap: 0.5rem;
    padding: 2rem;
    width: 100vw;
    align-items: center;
    text-align: center;
}

.type-box {
    display: block;
    max-width: 800px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.words {
    font-size: 24px;
    font-family: cursive;
    display: flex;
    flex-wrap: wrap;
    color: ${({theme}) => theme.typeBoxText};
}

.word {
    margin: 5px;
    padding-right: 2px;
}

.hidden-input {
    opacity: 0;
}

.current {
    border-left: 1px solid;
    animation: blinkingCursor 2s linear infinite;
    animation-timing-function: ease;

    @keyframes blinkingCursor {
        0% {border-left-color: ${({theme}) => theme.typeBoxText}}
        25% {border-left-color: transparent}
        50% {border-left-color: ${({theme}) => theme.typeBoxText}}
        75% {border-left-color: transparent}
        100% {border-left-color: ${({theme}) => theme.typeBoxText}}
    }
}

.current-right {
    border-right: 1px solid;
    animation: blinkingCursorRight 2s linear infinite;
    animation-timing-function: ease;

    @keyframes blinkingCursorRight {
        0% {border-right-color: ${({theme}) => theme.typeBoxText}}
        25% {border-right-color: transparent}
        50% {border-right-color: ${({theme}) => theme.typeBoxText}}
        75% {border-right-color: transparent}
        100% {border-right-color: ${({theme}) => theme.typeBoxText}}
    }
}

.correct {
    color: green;
}

.wrong {
    color: red;
}

.upper-menu {
    display: flex;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    font-size: 1.35rem;
    padding: 0.5rem;
}

.modes {
    display: flex;
    gap: 0.5rem;
}

.time-mode:hover {
    color: #FFDEB9;
    cursor: pointer;
}

.footer {
    display: flex;
    justify-content: space-between;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.stat-box {
    display: flex;
    width: 800px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.left-stats {    
    width: 30%;
    padding: 30px;
}

.right-stats {
    width: 70%;
}

.title {
    font-size: 20px;
}

.subtitle {
    font-size: 30px;
}

.header {
    width: 800px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.user-profile {
    width: 800px;
    margin: auto;
    display: flex;
    height: 15rem;
    // background-color: ${({theme})=> theme.typeBoxText};
    border-radius: 20px;
    padding: 1rem;
    justify-content: center;
    text-align: center;
}

.user {
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.35rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info {
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}

.picture {
    width: 40%;
}

.total-tests {
    width: 50%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table, .graph-user-page {
    margin: auto;
    width: 800px;
}

.center-of-screen {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
}

`