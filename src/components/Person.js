import React from "react";

class Person extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		person_id: props.location.pathname.split("/")[2],
		person: {}
		};

	this.table_headers_map = {
		"dolzhnost": "Пасада",
		"zachto": "Падстава",
		"nagrada": "Узнагарода",
		"date": "Дата",
	}

	this.month_map = {
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
	this.table_headers_order = ["dolzhnost", "nagrada", "zachto", "date"];
}

	parseDate(date_num) {
		let date = new Date(date_num);
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		return `${day} ${this.month_map[month]} ${year}`
	}

	componentDidMount() {
		fetch(`https://nagrady-29748.firebaseio.com/people/
							${this.state.person_id}.json`)
			.then(response => response.json())
			.then(data => this.setState({ person: data }))
		}
	render() {
		const headers_order = ["dolzhnost", "nagrada", "zachto", "date"];
		const { fio } = this.state.person;

// Готовим заголовки для таблицы
const person_data = this.state.person;

// По ключам получаем значения заголовков
const headers_texts = headers_order.filter(e => person_data[e] !== "")
			.map(e => this.table_headers_map[e]) // По ним строится шапка таблицы

// Получаем значения ячеек для тела таблицы.
const table_body_texts = headers_order.filter(e => person_data[e] !== "")
			.map(e => person_data[e])
table_body_texts[table_body_texts.length - 1] = this.parseDate(table_body_texts[table_body_texts.length - 1]);

		return (
			<div>
			<h2>{ fio }</h2>
			<table className="personal_data">
				<thead>
				<tr>
					{ headers_texts.map( (e, i) => <th key={`th_${i}`}>{ e }</th> ) }
				</tr>
				</thead>
				<tbody>
					<tr>
					{ table_body_texts.map( (e, i) => <td key={`td_${i}`}>{ e }</td> ) }
					</tr>
				</tbody>
			</table>
			</div>
			)
	}
}

export default Person;
