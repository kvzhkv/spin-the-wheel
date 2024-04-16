import React, { useState } from "react";
import styled from "styled-components";
import PickedItem from "./wheel/PickedItem";
import ResetButton from "./wheel/ResetButton";
import SpinButton from "./wheel/SpinButton";
import Wheel from "./wheel/Wheel";
import Icon from "./Icon";
import { Button, ButtonsBlock } from "./styled";
import EditForm from "./editor/EditForm";

interface Props {}

const MainBlock: React.FC<Props> = () => {
    const [isEditMode, setEditMode] = useState(false);

    const closeEditMode = () => {
        setEditMode(false);
    };

    const openEditMode = () => {
        setEditMode(true);
    };

    if (isEditMode) {
        return <EditForm onClose={closeEditMode} />;
    }

    return (
        <>
            <AspectRatio>
                <WheelContainer>
                    <Wheel />
                    <SpinButton />
                    <PickedItem />
                </WheelContainer>
            </AspectRatio>
            <ButtonsBlock>
                <Button onClick={openEditMode}>
                    <Icon name="settings" />
                </Button>
                <ResetButton />
            </ButtonsBlock>
        </>
    );
};

const AspectRatio = styled.div`
    display: flex;
    width: 100%;
    height: 0;
    position: relative;
    padding-bottom: 100%;
    margin: 0;
    aspect-ratio: 1 / 1;
    overflow: hidden;
`;

const WheelContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    place-items: center;
`;

export default MainBlock;
