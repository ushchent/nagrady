import React from "react";
import { Link } from "react-router-dom";
import cc_logo from "./img/bysa.png";

const Footer = () => (
	<footer>
	<div className="cc_logo">
		<Link to="http://creativecommons.org/licenses/by-sa/4.0/deed.be">{
			<img src={ cc_logo }
			alt="Creative Commons CC BY-SA 4.0"/>
			}</Link>
</div>
<div>
		<p>2014 - 2019 dataШкола разам з <a href="http://falanster.by/">Фаланстэр</a>.</p>
</div>
<div>
		<Link to="/info" className="impressum">Выходныя дадзеныя</Link>
</div>
    </footer>
);

export default Footer;
