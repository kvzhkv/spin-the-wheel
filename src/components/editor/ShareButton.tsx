import React, { useContext } from "react";
import { Button } from "../styled";
import Icon from "../Icon";
import styled from "styled-components";
import { DataContext } from "../context/DataContextProvider";
import copy from "copy-to-clipboard";

interface Props {
    disabled: boolean;
}

const ShareButton: React.FC<Props> = ({ disabled }) => {
    const { values } = useContext(DataContext);
    return (
        <Btn
            type="button"
            onClick={() => {
                copy(
                    `${document.URL}#${encodeURIComponent(
                        JSON.stringify(values),
                    )}`,
                );
            }}
            disabled={disabled}
        >
            <Icon name="share" />
        </Btn>
    );
};

const Btn = styled(Button)`
    &:active {
        color: green;
    }
`;

export default ShareButton;
