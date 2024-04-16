import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../context/DataContextProvider";
import Icon from "../Icon";
import { Button } from "../styled";

interface Props {}

const SpinButton: React.FC<Props> = () => {
    const { dispatch, currentItem, viewedItems, values } =
        useContext(DataContext);
    return (
        <Btn
            onClick={() => dispatch({ type: "pick" })}
            disabled={
                currentItem !== null || viewedItems.length === values.length
            }
        >
            <Icon
                name={
                    viewedItems.length === values.length
                        ? "checkRounded"
                        : "spin"
                }
            />
        </Btn>
    );
};

const Btn = styled(Button)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 0 auto;
    border: none;
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    background-color: #1a1a1a;

    &:before {
        position: absolute;
        content: "";
        border: 0.75rem solid transparent;
        border-right-color: #1a1a1a;
        margin-top: auto;
        margin-bottom: auto;
        left: -1.4rem;
    }
`;

export default SpinButton;
