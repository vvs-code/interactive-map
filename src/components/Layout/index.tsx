import * as React from "react";
import {Link} from "react-router-dom";
import Helmet from "react-helmet";

import {useContext, useEffect} from "react";
import Map from "../Map";
import {GlobalContext} from "../../index";

export default function Layout(props: { children: any }) {
    const {currentRegion, curreg} = useContext(GlobalContext);

    return (
        <>
            <Helmet>
                <title>Интерактивная карта</title>
                <meta charSet="UTF-8"/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="format-detection" content="telephone=no"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                {/*<link
                    href="https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&family=Unbounded:wght@200..900&display=swap"
                    rel="stylesheet"/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>*/}
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0;24,900,1,0"/>
                <meta httpEquiv="cache-control" content="no-cache, no-store, must-revalidate"/>
                <meta httpEquiv="pragma" content="no-cache"/>
                <meta httpEquiv="expires" content="0"/>
            </Helmet>
            <div>
                <main className="main">
                    <div className="main-wrapper">
                        <div className="currentreg">{curreg}</div>
                        <Map/>
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    )
}
