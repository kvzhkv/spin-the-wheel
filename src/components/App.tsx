import styled from "styled-components";
import DataContextProvider from "./context/DataContextProvider";
import MainBlock from "./MainBlock";
import {
    getItemsFromLocalStorage,
    parseJsonArray,
    setItemsToLocalStorage,
} from "../localStorage";
import { Navigate, useLocation } from "react-router";

const defaultValues = [
    "What time do you usually wake up in the morning?",
    "How do you typically start your day?",
    "What's your go-to breakfast choice?",
    "What activities do you usually do to stay productive during the day?",
    "Do you have any daily rituals or routines that you follow?",
    "How do you like to unwind after a busy day?",
    "What's your favorite way to spend your free time during the day?",
    "How often do you take breaks throughout the day, and what do you do during those breaks?",
    "What's one thing you always make sure to accomplish each day?",
    "How do you wind down and prepare for sleep at the end of the day?",
];

const parseSharedData = (hash: string): string[] | null => {
    try {
        return parseJsonArray(decodeURIComponent(hash).replace("#", ""));
    } catch (e) {
        return null;
    }
};

const App: React.FC = () => {
    const { hash } = useLocation();
    if (hash) {
        const sharedItems = parseSharedData(hash);
        if (sharedItems) {
            setItemsToLocalStorage(sharedItems);
        }
        return <Navigate to="/" replace={true} />;
    }
    const initValues = getItemsFromLocalStorage() || defaultValues;
    return (
        <DataContextProvider initValues={initValues}>
            <Main>
                <h1>Spin the Wheel</h1>
                <MainBlock />
            </Main>
        </DataContextProvider>
    );
};

const Main = styled.main`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 0.5rem;
    display: flex;
    place-items: center;
    flex-direction: column;
    flex: 1;
`;

export default App;
