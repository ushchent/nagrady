import React from "react";
import Table from "./Table";

class Nagrady extends React.Component {
	state = {
		data: {}
	}
	componentDidMount() {
      fetch(`https://nagrady-29748.firebaseio.com/counts.json`)
          .then(response => response.json())
	      .then(data => this.setState({ data: data }));
	}
    render() {
	const { data } = this.state;
		return (
			<main>
				<Table data={data} />
			</main>
		)
	}
}

export default Nagrady;
