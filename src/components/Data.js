import React from "react";
import { Link } from "react-router-dom";
import PersonTable from "./PersonTable";
import Paginator from "./Paginator";

class Data extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		table_data: {},
		data_found: null,
		total_awards: null,
		current_page: props.location.pathname.split("/")[2] ? parseInt(props.location.pathname.split("/")[2]) : 1,
		page_count: null
		};
	}
get_data = (text) => fetch(`https://nagrady-29748.firebaseio.com/names.json?orderBy="fio"&startAt="${text}"&endAt="${text}\uf8ff"&limitToFirst=10`)
            .then(response => response.json())
            .then(data => this.setState({ data_found: data }));

fetch_table_data = start_at => 
	fetch(`https://nagrady-29748.firebaseio.com/names.json?orderBy="$key"&startAt="${ start_at }"&limitToFirst=10`)
		.then(response => response.json())
		.then(data => this.setState({ table_data: data }));

handle_page_click = event => {
	const current_page = event.currentTarget.getAttribute("data-page_id");
	this.setState({ current_page: parseInt(current_page) })
	const start_at = this.state.total_awards - current_page * 10 + 1;
	this.fetch_table_data(start_at)
	document.querySelectorAll(".page_num")
	.forEach(e => e.classList.remove("active"));
	// Потом добавляем активный класс к нажатой кнопке
	document.querySelector(`[data-page_id="${current_page}"]`)
		.classList.add("active");
} 

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
				 return (<ul>
					{Object.entries(this.state.data_found).map(
						d => <li key={`id_${d[0]}`}>
							<Link to={`/persona/${d[0]}`}>{ d[1]["fio"] }</Link>,
							&nbsp;
							<span className="date">
						{this.parseDate(d[1]["date"])}
							</span>
							</li>
					)}
						</ul>)
				}
		}

	handle_input = (event) => {
		if (event.target.value.length > 4) {
			document.getElementById("data_found").classList.remove("hidden");
			this.get_data(event.target.value);
		} else if (event.target.value.length === 0) {
			document.getElementById("data_found").classList.add("hidden");
		} else {
			return null;
		}
	} 

	hide_found_list = () => {
		if (document.getElementById("input_text").value.length !== 0) {
			document.getElementById("data_found").classList.remove("hidden");
		}
	}

	componentDidMount() {
		document.getElementById("input_text").onblur = this.hide_found_list;
		// Сбор имен для таблицы награденных
		fetch("https://nagrady-29748.firebaseio.com/total_stats.json")
			.then(response => response.json())
			.then(data => {
				// Расчет общего количества награждений.
				const total_awards = Object.values(data.by_year)
					.reduce((ac, cv) => ac + cv, 0);
				const page_count = Math.ceil(total_awards / 10);
				this.setState({ total_awards: total_awards, page_count: page_count });
				const start_at = total_awards - this.state.current_page * 10 + 1;
				fetch(`
					https://nagrady-29748.firebaseio.com/names.json?orderBy="$key"&startAt="${ start_at }"&limitToFirst=10`)
					.then(response => response.json())
					.then(data => this.setState({ table_data: data })
				);
			}
		)
	}

	render() {
		const { table_data } = this.state;
		return (
			<main>
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
				<PersonTable data={ table_data } />
				<Paginator
					current_page={this.state.current_page}
					page_count={this.state.page_count}
					handle_click={this.handle_page_click}
				/>
			</main>
			)
		}
}

export default Data;
