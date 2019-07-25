import React from "react";
import Table from "./Table";
import PersonTable from "./PersonTable";
import { Consumer } from "./context";
import Gallery from "./Gallery";
import BarChart from "./BarChart";

class Home extends React.Component {
    //componentDidMount() {
        //fetch(`https://nagrady-29748.firebaseio.com/nagrady_counts.json`)
            //.then(response => response.json())
	            //.then(data => this.setState({ data }));
	    //fetch("https://nagrady-29748.firebaseio.com/total_stats/totals.json")
		//.then(response => response.json())
		//.then(data => this.setState({ stats }))
    //}
    
	render() {
		return (
			<Consumer>
				{ value => {
					const { data, totals, names } = value;
						return (
						<main>
							<Gallery data={data} />
							<BarChart nagrada_id={null}/>
							<PersonTable data={names} />
							{/* <h2>Папулярныя ўзнагароды</h2>
							<Table data={data.slice(0,10)} /> */}
						</main>
						)
					}}
			</Consumer>
		)
	};
}

export default Home;
