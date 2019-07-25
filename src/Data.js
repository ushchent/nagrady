import React from "react";
import PersonTable from "./PersonTable";
import { Link } from "react-router-dom";

class Data extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		//page: props.location.pathname.split("/")[2],
		names: {},
		data_found: null,
		total_awards: null
		};
	}
get_data = (text) => fetch(`https://nagrady-29748.firebaseio.com/names.json?orderBy="fio"&startAt="${text}"&endAt="${text}\uf8ff"&limitToFirst=10`)
            .then(response => response.json())
            .then(data => this.setState({ data_found: data }));


	month_map = {
		0: "студзеня",
		1: "лютага",
		2: "сакавіка",
		3: "красавіка",
		4: "мая",
		5: "чэрвеня",
		6: "ліпеня",
		7: "жніўня",
		8: "верасня",
		9: "кастрычніка",
		10: "лістапада",
		11: "снежня",
	};

	parseDate(date_num) {
		let date = new Date(date_num);
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		return `${day} ${this.month_map[month]} ${year}`
	}
output_data = () => {	
		if (this.state.data_found != null) {
			//document.getElementById("data_found").classList.toggle("hidden");
			 return (<ul>
				{Object.entries(this.state.data_found).map(
							d => <li>
								<Link to={`/persona/${d[0]}`}>{ d[1]["fio"] }</Link>, &nbsp;
								{this.parseDate(d[1]["date"])}
							</li>
							)}
					</ul>)
			} else {
				//return null;
				//document.getElementById("data_found").classList.toggle("hidden");
			}
	}

handle_input = (event) => {
	if (event.target.value.length > 4) {
		document.getElementById("data_found").classList.remove("hidden");
		this.get_data(event.target.value);
		} else if (event.target.value.length == 0) {
			document.getElementById("data_found").classList.add("hidden");
		} else {
			return null;
		}
	} 

hide_found_list = () => {
	if (document.getElementById("input_text").value.length != 0) {
	document.getElementById("data_found").classList.remove("hidden");
}
	}

	componentDidMount() {
		const { page } = this.props.match.params;
				console.log("page", page);
				console.log(this.props)
		 document.getElementById("input_text").onblur = this.hide_found_list;
	    fetch('https://nagrady-29748.firebaseio.com/names.json?orderBy="date"&limitToLast=10')
            .then(response => response.json())
            .then(data => this.setState({ names: data }));
		}

	render() {
		const { names } = this.state;
		return (
			<React.Fragment>
				<h1 className="page_title">Пошук узнагароджаных</h1>
				<input 
					type="text"
					placeholder="Па-беларуску альбо по-русски"
					id="input_text"
					onChange={ this.handle_input }
					 />
				<div id="data_found" className="hidden">
					{ this.output_data() }
				</div>
				<PersonTable data={names} />
			</React.Fragment>
		)
	}
}

export default Data;
