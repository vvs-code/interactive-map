import * as React from 'react';
import {Route, Routes, useMatch} from 'react-router-dom';
// import store from './store/store'
// import {Provider} from 'react-redux'

import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";

class App extends React.Component {
    public PeoplePageWrapper() {
        const match = useMatch('/:region_tag/:people_tag');
        return <IndexPage region={match?.params.region_tag} people={match?.params.people_tag}/>
    }

    public RegionPageWrapper() {
        const match = useMatch('/:region_tag');
        return <IndexPage region={match?.params.region_tag}/>
    }

    render() {
        return (
            <Layout>
                <Routes>
                    <Route path='/:region_tag/:people_tag' Component={this.PeoplePageWrapper} />
                    <Route path='/:region_tag' Component={this.RegionPageWrapper} />
                    <Route path='/' Component={IndexPage} />
                </Routes>
            </Layout>
        );
    }
}

export default App;
