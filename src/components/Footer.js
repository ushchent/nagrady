import React from "react";
import { Link } from "react-router-dom";
import bysa_logo from "../img/bysa.png";

const Footer = () => (
	<footer>
		<div className="cc_logo">
			<a href="http://creativecommons.org/licenses/by-sa/4.0/deed.be">{
				<img src={ bysa_logo }
				alt="Creative Commons CC BY-SA 4.0"/>
				}</a>
		</div>
		<div className="text">
			<p>2014 - 2019 dataШкола разам з <a href="http://falanster.by/">Фаланстэр</a>.</p>
		</div>
		<div className="impressum">
			<p>
				<Link to="/info" >Выходныя дадзеныя</Link>
			</p>
		</div>
    </footer>
);

export default Footer;
