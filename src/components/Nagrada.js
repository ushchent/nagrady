import React from "react";
import Stats from "./Stats";
import PersonTable from "./PersonTable";
import Paginator from "./Paginator";

class Nagrada extends React.Component {
	constructor(props) {
		super(props);
		this.image_id = props.match.params.image_id;
		this.page_id = props.match.params.page_id;
		this.state = {
			nagrada_description: {},
			people: {},
			
			table_data: {},
			data_found: null,
			total_awards: null,
			current_page: props.location.pathname.split("/")[2] ? parseInt(props.location.pathname.split("/")[2]) : 1,
			page_count: null
			}
		}

	componentDidMount() {
	fetch(`https://nagrady-29748.firebaseio.com/descriptions/${this.image_id}.json`)
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
				<div className="description">
					<h1>{ nagrada_description.title }</h1>
						<img className="nagrada_image" src={`/img/${this.image_id}.jpg`}
								alt={ nagrada_description.title }
								title={ nagrada_description.title }
						/>
						<p>{ nagrada_description.text }</p>
				</div>
					<Stats nagrada_id={this.image_id}/>
					<PersonTable data={ people } />
					<Paginator nagrada_id = { this.image_id }
								page_id = { this.page_id }  />
			</main>
			)
		}
}

export default Nagrada;
