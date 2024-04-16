import React, { useContext } from "react";
import { Field, Form } from "react-final-form";
import { DataContext } from "../context/DataContextProvider";
import styled from "styled-components";
import { Button, ButtonsBlock } from "../styled";
import Icon from "../Icon";
import ShareButton from "./ShareButton";
import { setItemsToLocalStorage } from "../../localStorage";

interface Props {
    onClose: () => void;
}

const parseItems = (v: string = ""): string[] => v.split("\n").filter(i => !!i);

const EditForm: React.FC<Props> = ({ onClose }) => {
    const { values, dispatch } = useContext(DataContext);
    return (
        <Form<{ data: string }>
            initialValues={{
                data: values.join("\n"),
            }}
            onSubmit={({ data }) => {
                const items = parseItems(data);
                dispatch({
                    type: "update",
                    items,
                });
                setItemsToLocalStorage(items);
                onClose();
            }}
            render={({ handleSubmit, dirty, pristine, valid }) => {
                return (
                    <FromBlock>
                        <Field
                            name="data"
                            render={({ input, meta: { error } }) => {
                                return (
                                    <>
                                        <Textarea rows={20} {...input} />
                                        {error && <Message>{error}</Message>}
                                    </>
                                );
                            }}
                            validate={v => {
                                const l = parseItems(v).length;
                                if (l < 2 || l > 20)
                                    return "Add from 2 to 20 items.";
                            }}
                        />
                        <ButtonsBlock>
                            <Button
                                type="submit"
                                disabled={pristine || !valid}
                                onClick={handleSubmit}
                            >
                                <Icon name="check" />
                            </Button>
                            <ShareButton disabled={dirty} />
                            <Button type="button" onClick={onClose}>
                                <Icon name="close" />
                            </Button>
                        </ButtonsBlock>
                    </FromBlock>
                );
            }}
        />
    );
};

const FromBlock = styled.form`
    width: 100%;
`;

const Textarea = styled.textarea`
    width: 100%;
    color: inherit;
    background: transparent;
    padding: 0.5rem;
    border: 1px solid #fff;
    border-radius: 0.5rem;
    line-height: 1.5rem;
    resize: vertical;
`;

const Message = styled.p`
    margin: 0;
    color: red;
`;

export default EditForm;
