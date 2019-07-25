import React from "react";
import { Link } from "react-router-dom";
import logo from "./img/logo.jpg";

const Header = () => (
	<header>
		<Link to="/">{<img src={ logo } alt="Узнагароды Беларусі"/>}</Link>
		<nav>
			<Link to="/data">Узнагароджаныя</Link>
			<Link to="/nagrady">Узнагароды</Link>
		</nav>
	</header>
);

export default Header;
