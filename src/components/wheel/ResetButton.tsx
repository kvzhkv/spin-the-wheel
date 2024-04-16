import React, { useContext } from "react";
import { Button } from "../styled";
import Icon from "../Icon";
import { DataContext } from "../context/DataContextProvider";

interface Props {}

const ResetButton: React.FC<Props> = () => {
    const { viewedItems, dispatch } = useContext(DataContext);
    return (
        <Button
            onClick={() => dispatch({ type: "reset" })}
            disabled={!viewedItems.length}
        >
            <Icon name="reset" />
        </Button>
    );
};

export default ResetButton;
