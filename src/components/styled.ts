import styled from "styled-components";

export const Button = styled.button`
    background: transparent;
    color: inherit;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: color 0.1s;

    &:hover {
        color: #646cff;
    }

    &:disabled {
        color: #333333;
        cursor: default;
    }
`;

export const ButtonsBlock = styled.div`
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
`;
