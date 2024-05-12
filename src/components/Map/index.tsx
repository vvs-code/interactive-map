import * as React from "react";
import MapSVG from "./mapsvg";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../index";
import {useMatch} from "react-router-dom";

type coord = [number, number];

export default function Map() {
    const { loaded, currentRegion, populationDict, peoplesDict } = useContext(GlobalContext);

    useEffect(() => {
        const MAPS: HTMLDivElement = document.querySelector('.maps');
        const MAPS_WRAPPER: HTMLDivElement = document.querySelector('.maps-wrapper');
        const MAP_RATIO: number = (MAPS_WRAPPER.clientHeight - 10) / MAPS_WRAPPER.clientWidth;

        let pointer: coord;
        let pov: coord = [window.innerWidth / 2, window.innerHeight / 2];

        let old_scale: number;
        let new_scale: number;
        let scale: number = 1;
        let normalWidth: number = 500;

        let RunMove = function () {
            if (!location.pathname.split('/')[2]) {
                normalWidth = MAP_RATIO > window.innerHeight / window.innerWidth ? window.innerWidth : window.innerHeight / MAP_RATIO;
                MAPS.style.width = normalWidth * scale + 'px';
                MAPS.style.top = pov[1] + 'px';
                MAPS.style.left = pov[0] + 'px';
            }
        };

        addEventListener('wheel', evt => {
            if (!location.pathname.split('/')[2]) {
                old_scale = scale;
                new_scale = scale - evt.deltaY / 100;
                scale = new_scale < 1 ? 1 : new_scale;

                pointer = [evt.clientX, evt.clientY];

                pov = [
                    pointer[0] + (pov[0] - pointer[0]) * (new_scale / old_scale),
                    pointer[1] + (pov[1] - pointer[1]) * (new_scale / old_scale)
                ];
                RunMove();
            }
        });

        let startingPoint: coord = [0, 0];
        let moving: boolean = false;

        window.addEventListener('mousedown', evt => {
            if (!location.pathname.split('/')[2]) {
                startingPoint = [evt.clientX, evt.clientY];
                moving = true;
                RunMove();
            }
        });

        window.addEventListener('mousemove', evt => {
            if (!location.pathname.split('/')[2] && moving) {
                pov = [
                    pov[0] - (startingPoint[0] - evt.clientX),
                    pov[1] - (startingPoint[1] - evt.clientY)
                ];
                startingPoint = [evt.clientX, evt.clientY];
                RunMove();
            }
        });

        window.addEventListener('mouseup', evt => {
            moving = false;
            RunMove();
        });

        window.addEventListener('touchstart', evt => {
            if (!location.pathname.split('/')[2]) {
                startingPoint = [evt.changedTouches[0].screenX, evt.changedTouches[0].screenY];
                moving = true;
                RunMove();
            }
        });

        window.addEventListener('touchmove', evt => {
            if (!location.pathname.split('/')[2]) {
                let last_touch = evt.changedTouches[evt.changedTouches.length - 1];
                if (moving) {
                    pov = [
                        pov[0] - (startingPoint[0] - last_touch.screenX),
                        pov[1] - (startingPoint[1] - last_touch.screenY)
                    ];
                    startingPoint = [last_touch.screenX, last_touch.screenY];
                }
                RunMove();
            }
        });

        RunMove();
    }, [loaded]);

    useEffect(() => {
        Array.from(document.querySelectorAll('path[name]')).forEach((el: SVGPathElement) => {
            el.classList.remove('current');
            el.classList.remove('empty');
            let region = el.attributes?.['name']?.value;

            if (!(populationDict[region] ?? []).filter((people) => peoplesDict[people[0]]).length) {
                el.classList.add('empty');
            }
        });
        document.querySelector('path[name="' + currentRegion + '"]')?.classList?.add('current');
    }, [currentRegion, populationDict, peoplesDict]);

    return (
        <div className="maps">
            <div className="maps-wrapper">
                <img className="undermap" src="/img/undermap.png" alt=""/>
                <MapSVG/>
            </div>
        </div>
    )
}