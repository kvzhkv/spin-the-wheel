import React, { PropsWithChildren, useReducer } from "react";

interface Props {
    initValues: string[];
}

type ActionType = "pick" | "close" | "reset";

type Action = { type: ActionType } | { type: "update"; items: string[] };

type Dispatch = React.Dispatch<Action>;

interface DataState {
    values: string[];
    viewedItems: number[];
    currentItem: number | null;
}

export const DataContext = React.createContext<
    DataState & { dispatch: Dispatch }
>({
    values: [],
    viewedItems: [],
    currentItem: null,
    dispatch: () => {},
});

type CountCorrectReducer = (prevValue: DataState, action: Action) => DataState;

const pickRandom = (total: number, excluded: number[]): number => {
    return Math.floor(Math.random() * (total - excluded.length));
};

const DataContextProvider: React.FC<PropsWithChildren<Props>> = ({
    initValues,
    children,
}) => {
    const [state, dispatch] = useReducer<CountCorrectReducer, DataState>(
        (state, action) => {
            switch (action.type) {
                case "pick": {
                    const rand = pickRandom(
                        state.values.length,
                        state.viewedItems,
                    );
                    const filtered = state.values
                        .map((v, i): [string, number] => [v, i])
                        .filter(([, i]) => !state.viewedItems.includes(i));

                    const r = filtered[rand][1];
                    return {
                        ...state,
                        currentItem: r,
                    };
                }
                case "close": {
                    return {
                        ...state,
                        currentItem: null,
                        viewedItems: [...state.viewedItems, state.currentItem!],
                    };
                }
                case "reset": {
                    return {
                        ...state,
                        currentItem: null,
                        viewedItems: [],
                    };
                }
                case "update": {
                    return {
                        ...state,
                        currentItem: null,
                        viewedItems: [],
                        values: action.items,
                    };
                }
                default:
                    throw new Error("Invalid action type.");
            }
        },
        {
            values: initValues,
            viewedItems: [],
            currentItem: null,
        },
        v => v,
    );
    return (
        <DataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;
