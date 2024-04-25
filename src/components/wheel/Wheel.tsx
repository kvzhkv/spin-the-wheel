import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { DataContext } from "../context/DataContextProvider";
import Slice from "./Slice";

const colorsCollection = [
    "#004445",
    "#022C1E",
    "#2C7873",
    "#6F998F",
    "#004D47",
    "#128277",
    "#002E38",
    "#011D15",
    "#1D5550",
    "#4B7668",
    "#00332D",
    "#0B5652",
    "#00474C",
    "#255D58",
    "#002F29",
    "#0F433E",
    "#255856",
    "#4B6F68",
    "#002623",
    "#396C65",
];
const Wheel: React.FC = () => {
    const { values, currentItem, viewedItems } = useContext(DataContext);
    const count = values.length;
    const colors = colorsCollection.slice(0, values.length);

    const gradient = colors
        .map(
            (c, i) =>
                `${viewedItems.includes(i) ? "#333" : c} ${Math.floor(
                    (i / count) * 100,
                ).toFixed(2)}% ${Math.floor(((i + 1) / count) * 100).toFixed(
                    2,
                )}%`,
        )
        .join(", ");

    return (
        <WheelBlock
            $back={`conic-gradient(from -${
                Math.PI / 2 + Math.PI / count
            }rad at 50% 50%, ${gradient})`}
            className={currentItem !== null ? "rotate-it" : undefined}
            $start={
                viewedItems.length
                    ? (-1 * viewedItems[viewedItems.length - 1]) / values.length
                    : 0
            }
            $end={
                (values.length - viewedItems.length > 1 ? 5 : 1) -
                (currentItem || 0) / values.length
            }
        >
            {values.map((t, i) => (
                <Slice key={t + i} index={i} text={t} />
            ))}
        </WheelBlock>
    );
};

const rotate = (start: number, end: number) => keyframes`
    0% { 
        transform: rotate(${start}turn);
    }
    100% {
        transform: rotate(${end}turn); 
    }
`;

interface WheelBlockProps {
    $start: number;
    $end: number;
    $back: string;
}

const WheelBlock = styled.div<WheelBlockProps>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid #fff;
    width: 100%;
    height: 100%;
    background: ${({ $back }) => $back};
    transform: rotate(${({ $start }) => $start}turn);
    &.rotate-it {
        animation: ${({ $start, $end }) => rotate($start, $end)} 3s
            cubic-bezier(0.65, 0, 0.35, 1);
        animation-fill-mode: forwards;
    }
`;

export default Wheel;
