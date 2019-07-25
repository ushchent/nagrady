import React from "react";
import Table from "./Table";
import { Consumer } from "./context";

class Nagrady extends React.Component {
    render() {
        return (
        	<Consumer>
				{value => {
					const { data } = value;
						return (
						<main>
							<Table data={data} />
						</main>
						)
					}}
			</Consumer>
        )
    }
}

export default Nagrady;
