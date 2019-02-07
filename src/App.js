import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Info from "./Info";
import "./App.css";
import Header from "./Header";
import Nagrady from "./Nagrady";
import Data from "./Data";
//import { YMInitializer } from 'react-yandex-metrika';
import Footer from "./Footer";

const App = () => {
	return (
    <div>
        {/*   <YMInitializer accounts={[26845122]} /> */}
    <Router>
		<Header />
		<Switch>
            <Route exact path="/" />
            <Route path="/nagrady" component={ Nagrady } />
            <Route path="/data" component={ Data } />
            <Route path="/info" component={ Info } />
            <Route render={() => <h1 className="page_title">Старонка ня знойдзена</h1>} />
		</Switch>
		<Footer />
    </Router>
    </div>
)};

export default App;
