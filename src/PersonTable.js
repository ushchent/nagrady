// Используется на главной, на странице Награды и на странице Награжденные.
// Свойства на каждой странице разные, но таблица всегда состоит из двух
// столбцов и разного числа строк.
// На стр. Награжденные count заменить на date, а title на fio.
import React from "react";
import { Link } from "react-router-dom";

//const Table = (props) => {
	//const { data } = props;
	//return (
		//<table>
			//<tbody>
				//{ data.map(item => 
					//<tr key={item.id} >
						//<td><Link to={`/nagrada/${item.id}`}>{ item["title"] }</Link></td>
                        //<td>{ item["count"] }</td>
                    //</tr>
                     //)
                //}
            //</tbody>
        //</table>
	//);
//}

// Классовый вариант

class PersonTable extends React.Component {

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

	render() {
		const { data } = this.props;
		const table_data = data != null ? (
			<table>
				<tbody>
					{ Object.entries(data).map(item => 
						<tr key={item[0]} >
							<td><Link to={`/persona/${item[0]}`}>{ item[1]["fio"] }</Link></td>
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
