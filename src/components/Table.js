import React from "react";
import { Link } from "react-router-dom";

class Table extends React.Component {
	render() {
		const { data } = this.props;
		const table_data = Object.keys(data).map(key => {
				return	{ "nid": key,
						  "title": data[key]["title"],
						  "count": data[key]["count"]}
				})
				.sort((a, b) => b.count - a.count);
		return (
			<table className="main_table">
				<tbody>
					{ table_data.map(item => 
						<tr key={item.nid} >
							<td><Link to={`/nagrada/${item.nid}`}>
								{ item["title"] }</Link>
							</td>
							<td>{ item["count"] }</td>
						</tr>
						 )
					}
				</tbody>
			</table>
		);
	}
}

export default Table;
