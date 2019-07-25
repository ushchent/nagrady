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

class Table extends React.Component {

	render() {
		const { data } = this.props;
	return (
		<table className="main_table">
			<tbody>
				{ data.map(item => 
					<tr key={item.id} >
						<td><Link to={`/nagrada/${item.id}`}>{ item["title"] }</Link></td>
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
