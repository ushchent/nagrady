import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Info from "./Info";
import "./../css/App.css";
import Header from "./Header";
import Nagrady from "./Nagrady";
import Data from "./Data";
import Nagrada from "./Nagrada";
import Person from "./Person";
import Footer from "./Footer";
import Home from "./Home";

// Вложенные маршруты: https://reacttraining.com/react-router/web/guides/quick-start

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
				<Router >
					<Header />
					<Switch>
						<Route exact path='/' component={ Home }/>
						<Route path="/nagrady" component={ Nagrady } />
						<Route path="/nagrada/:image_id/:page_id?" component={ Nagrada } />
						<Route path="/persona/:person_id" component={ Person } />
						<Route path="/data/:page_id?" component={ Data } />
						<Route path="/info" component={ Info } />
						<Route render={ () => 
							<h1 className="page_title">Старонка не знойдзена</h1>
						} />
					</Switch>
					<Footer />
				</Router>
            </React.Fragment>
        )
    }
}
export default App;
