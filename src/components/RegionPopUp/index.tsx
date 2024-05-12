import * as React from "react";
import {useContext} from "react";
import {GlobalContext} from "../../index";
import {Link} from "react-router-dom";
import * as exports from "webpack";
import NOT_SERIALIZABLE = exports.util.serialization.NOT_SERIALIZABLE;

export default function RegionPopUp(props: { region: string }) {
    const {regionsDict, peoplesDict, currentRegion, populationDict} = useContext(GlobalContext);

    function RussianNoun(n: number, nouns: string[]): string {
        const d1: number = n % 10;
        const d2: number = Math.floor(n / 10) % 10;
        if (d2 === 1) {
            return nouns[2];
        } else if (~[2, 3, 4].indexOf(d1)) {
            return nouns[1];
        } else if (d1 === 1) {
            return nouns[0];
        }
        return nouns[2];
    }

    function FormatPopulation (n: number) {
        if (n < 10000) {
            return n + ' ' + RussianNoun(n, ['человек', 'человека', 'человек']);
        }

        if (n < 1000000) {
            n = Math.round(n / 1000);
            return n + 'K человек';
        }

        n = Math.round(n / 10000) / 100;
        return n + 'M человек';
    }

    return (
        <div className="region-popup">
            <div className="region-popup__top">
                <div className="region-popup__title">
                    {regionsDict?.[props.region]?.name ?? props.region}
                </div>
                <Link to="/" className="region-popup__close material-symbols-outlined">cancel</Link>
            </div>

            <div className="region-popup__peoples">
                {populationDict[currentRegion]?.filter((people) => peoplesDict[people[0]])?.map((people, i) => {
                    return <div className="region-popup__people">
                        {i + 1}. <Link className="text-link" to={`/${props.region}/${people[0]}`}>{peoplesDict?.[people[0]]?.name ?? people[0]}</Link> ({FormatPopulation(people[1] ?? 0)})
                    </div>
                })}
            </div>
        </div>
    )
}