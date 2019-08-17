import React from "react";
import { Link } from "react-router-dom";

class PersonTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			people: props
		}
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
	}

	parseDate(date_num) {
		let date = new Date(date_num);
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		return `${day} ${this.month_map[month]} ${year}`
	}
	componentDidMount() {
		this.setState({people: this.props.data})
	}
	render() {
		const { data } = this.props;
		const table_data = data != null ? (
			<table>
				<tbody>
					{ Object.entries(data).map(item => 
						<tr key={item[0]}>
							<td><Link to={`/persona/${item[0]}`}>
								{ item[1]["fio"] }</Link></td>
							<td>{ this.parseDate(item[1]["date"]) }</td>
						</tr>
						 )
					}
				</tbody>
			</table>
		) : (<p>Няма дадзеных</p>)
	return (
		<div className="last_honoured">
			<h2>Апошнія ўзнагароджанні</h2>
			{ table_data }
        </div>
		);
	}
}

export default PersonTable;
