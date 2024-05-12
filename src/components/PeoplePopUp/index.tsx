import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../index";
import {Link, useNavigate} from "react-router-dom";
import * as exports from "webpack";
import NOT_SERIALIZABLE = exports.util.serialization.NOT_SERIALIZABLE;

export default function PeoplePopUp(props: { people: string }) {
    const { regionsDict, peoplesDict, currentRegion } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [currentPeopleDict, setCurrentPeopleDict] = useState({
        name: '',
        text: '',
        params: [],
        images: [],
        youtube: '',
    });

    useEffect(() => {
        setCurrentPeopleDict(peoplesDict?.[decodeURI(props.people)] ?? {});
    }, [props.people, peoplesDict]);

    function ClosePopUp (evt) {
        if (evt.target.classList.contains('people-popup')) {
            navigate(`/${currentRegion}`);
        }
    }

    return (
        <div className="people-popup" onMouseUp={ClosePopUp}>
            <div className="people-popup__wrapper">
                <div className="people-popup__top">
                    <h2 className="people-popup__title">{currentPeopleDict?.name}</h2>
                    <Link to={`/${currentRegion}`} className="people-popup__close material-symbols-outlined">cancel</Link>
                </div>
                <div className="people-popup__params">
                    {(currentPeopleDict?.params ?? []).map((param) => {
                        return (
                            <div className="people-popup__param">
                                <span className="people-popup__param-name">{param[0]}</span>
                                <span className="people-popup__param-text">{param[1]}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="people-popup__text">
                    {(currentPeopleDict?.text ?? '').split("\n").map(textPart => <p>{textPart}</p>)}
                </div>
                <div className="people-popup__images">
                    {(currentPeopleDict?.images ?? []).map((img) => <img src={img}/>)}
                </div>
                <div className="people-popup__youtube" hidden={!currentPeopleDict['youtube']} dangerouslySetInnerHTML={{__html: currentPeopleDict['youtube'] || ''}}></div>
            </div>
        </div>
    )
}