import * as React from "react";
import RegionPopUp from "../RegionPopUp";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../../index";
import PeoplePopUp from "../PeoplePopUp";

export default function IndexPage(props: { region?: string, people?: string }) {
    const {setGlobalCurrentPeople, setGlobalCurrentRegion} = useContext(GlobalContext);

    useEffect(() => {
        setGlobalCurrentPeople(props.people ?? '');
        setGlobalCurrentRegion(props.region ?? '');
    }, [props.region, props.people]);

    if (props.people !== undefined) {
        return (
            <div>
                <PeoplePopUp people={props.people}></PeoplePopUp>
                <RegionPopUp region={props.region}></RegionPopUp>
            </div>
        )
    }

    if (props.region !== undefined) {
        return (
            <div>
                <RegionPopUp region={props.region}></RegionPopUp>
            </div>
        )
    }

    return (
        <div>

        </div>
    );
}