import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { DataContext } from "../context/DataContextProvider";
import Icon from "../Icon";
import { Button } from "../styled";
interface Props {}

const PickedItem: React.FC<Props> = () => {
    const { values, currentItem, dispatch } = useContext(DataContext);

    if (currentItem === null) return null;

    return (
        <PickedItemBlock>
            <ContentBlock>
                <Text>{values[currentItem]}</Text>
                <Button onClick={() => dispatch({ type: "close" })}>
                    <Icon name="close" />
                </Button>
            </ContentBlock>
        </PickedItemBlock>
    );
};

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const PickedItemBlock = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    border-radius: 50%;
    border: 3px solid #fff;

    background-color: #333;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    opacity: 0;
    animation: ${fadeIn} 0.5s ease-in;
    animation-delay: 5s;
    animation-fill-mode: forwards;
`;

const ContentBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Text = styled.div`
    text-align: center;
    font-weight: 600;
    font-size: 1.5rem;
    padding: 4rem 2rem;
`;

export default PickedItem;
