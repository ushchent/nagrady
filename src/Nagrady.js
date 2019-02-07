import React from "react";

class Nagrady extends React.Component {
    //constructor(props) {
        //super(props);
        //this.state = {
            //data: null
        //}
    //}
    state = {
            data: []
        }
    componentDidMount() {
        fetch("https://nagrady-29748.firebaseio.com/nagrady_counts.json")
            .then(response => response.json())
            .then(data => this.setState({ data }))
            
    }
    render() {
        return (
            <React.Fragment>
        <h1 className="page_title">Узнагароды па колькасці ўручэнняў</h1>
        <table>
			<thead>
				<tr>
					<th>Узнагарода</th><th>Колькасць</th>
				</tr>
			</thead>
			<tbody>
				{this.state.data.map(item => <tr><td>{item["title"]}</td>
												<td>{item["count"]}</td></tr>)}
			</tbody>
        </table>
            </React.Fragment>
        )
    }
}

export default Nagrady;
