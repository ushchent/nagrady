import React from "react";

class Paginator extends React.Component {
	constructor(props) {
		super(props);
		
		}

	componentDidUpdate() {
		console.log("Paginator speaking: ", this.props);
	}
	render() {
		return null;
	}
}

export default Paginator;
