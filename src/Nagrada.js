import React from "react";
import Stats from "./Stats";
import BarChart from "./BarChart";
import PersonTable from "./PersonTable";
import Paginator from "./Paginator";
import { Consumer } from "./context";

class Nagrada extends React.Component {
	constructor(props) {
		super(props);
		this.image_id = props.location.pathname.split("/")[2];
		this.state = {
			nagrada_description: {},
			people: {}
			}
		}

	componentDidMount() {
	fetch(`https://nagrady-29748.firebaseio.com/descript/${this.image_id}.json`)
		.then(response => response.json())
		.then(data => this.setState({ nagrada_description: data }));

	fetch(`https://nagrady-29748.firebaseio.com/names.json?orderBy="nagrada_id"&equalTo=${this.image_id}&orderBy="date"&limitToLast=10`)
		.then(response => response.json())
		.then(data => this.setState({ people: data }))
	}

	render() {
		const { nagrada_description, people } = this.state;
		return (
			<main>
				<div>
				<h1>{ nagrada_description.title }</h1>
					<img className="nagrada_image" src={`/img/${this.image_id}.jpg`}
							alt={ nagrada_description.title }
							title={ nagrada_description.title }
					/>
					<p className="description">{ nagrada_description.text }</p>
					<BarChart nagrada_id={this.image_id}/>
					<PersonTable data={ people } />


			<Consumer>
				{ value => {
					const { data } = value;
					console.log(data);
						return (
							<Paginator data={ data } />
						)
					}}
			</Consumer>


				</div>
			</main>
			)
		}
}

export default Nagrada;
