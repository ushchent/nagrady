import React from "react";
import Gallery from "./Gallery";
import Stats from "./Stats";
import PersonTable from "./PersonTable";

class Home extends React.Component {
	state = {
			data: {},
			names: {} 
	}
    componentDidMount() {
      fetch(`https://nagrady-29748.firebaseio.com/gallery_data.json`)
          .then(response => response.json())
	      .then(data => this.setState({ data: data }));
	  fetch("https://nagrady-29748.firebaseio.com/names.json?orderBy=%22date%22&limitToLast=10")
          .then(response => response.json())
          .then(data => this.setState({ names: data }));
    }
    
	render() {
		const { data, names } = this.state;
		return (
			<main>
				<Gallery data={ data } />
				<Stats nagrada_id={ null }/>
				<PersonTable data={ names } />
			</main>
		)
	};
}

export default Home;
