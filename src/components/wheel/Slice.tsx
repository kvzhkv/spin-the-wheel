import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../context/DataContextProvider";

interface Props {
    index: number;
    text: string;
}

const Slice: React.FC<Props> = ({ index, text }) => {
    const { values, viewedItems } = useContext(DataContext);
    return (
        <SliceItem
            key={text}
            $picked={viewedItems.includes(index)}
            $rad={(2 * Math.PI * index) / values.length}
        >
            {text}
        </SliceItem>
    );
};

interface SliceItemProps {
    $rad: number;
    $picked: boolean;
}

const SliceItem = styled.div<SliceItemProps>`
    display: block;
    position: absolute;
    background: transparent;
    top: calc(50% - 0.6rem);
    left: 0%;
    margin: 0;
    height: 1.2rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1rem;
    transform-origin: 100% 50%;
    width: 50%;
    padding: 0 3rem 0 1rem;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    transform: rotate(${({ $rad }) => $rad}rad);
    color: ${({ $picked }) => ($picked ? "#555555" : "inherit")};
`;

export default Slice;
