import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';
import {useContext, createContext, useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

import App from "./App";
import "normalize.css";
import "./style/main.less";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

export const GlobalContext = createContext({
    loaded: false,
    regionsDict: {},
    peoplesDict: {},
    populationDict: {},
    currentRegion: '',
    currentPeople: '',
    setGlobalCurrentRegion: (val: string) => {},
    setGlobalCurrentPeople: (val: string) => {},
});

function GlobalContextProvider(props: { children?: any }) {
    const [loaded, setLoaded] = useState(false);
    const [regionsDict, setRegionsDict] = useState({});
    const [peoplesDict, setPeoplesDict] = useState({});
    const [populationDict, setPopulationDict] = useState({});
    const [currentRegion, setCurrentRegion] = useState('');
    const [currentPeople, setCurrentPeople] = useState('');

    const setGlobalCurrentRegion = (val: string) => setCurrentRegion(val);
    const setGlobalCurrentPeople = (val: string) => setCurrentPeople(val);

    useEffect(() => {
        Promise.all([
            fetch('/json/regions.json')
                .then((res) => res.json())
                .then(
                    (response) => {
                        setRegionsDict(response);
                    }
                ),
            fetch('/json/peoples.json')
                .then((res) => res.json())
                .then(
                    (response) => {
                        setPeoplesDict(response);
                    }
                ),
            fetch('/json/population.json')
                .then((res) => res.json())
                .then(
                    (response) => {
                        setPopulationDict(response);
                    }
                )
        ])
            .finally(() => setTimeout(() => setLoaded(true), 10))

    }, []);

    return (
        <GlobalContext.Provider value={{ loaded, regionsDict, peoplesDict, populationDict, currentRegion, currentPeople, setGlobalCurrentRegion, setGlobalCurrentPeople }}>
            {props.children}
        </GlobalContext.Provider>
    )
}


const app = (
    <BrowserRouter>
        <GlobalContextProvider>
            <App></App>
        </GlobalContextProvider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
