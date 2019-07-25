// Это будет обертка для всего приложения
// Внутри Provider в value извлекается все, что должно быть доступно во всем приложении - можно все state целиком 
import React from "react";

const Context = React.createContext();

export class Provider extends React.Component {
	state = {
			data: [],
			info: null,
			totals: {},
			names: {} // Важно задать тип будущего объекта
		};
	componentDidMount() {
        fetch("https://nagrady-29748.firebaseio.com/total_stats/totals.json")
			.then(response => response.json())
			.then(data => this.setState({ totals: data }));
	    fetch("https://nagrady-29748.firebaseio.com/nagrady_counts.json")
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
	    fetch("https://nagrady-29748.firebaseio.com/names.json?orderBy=%22date%22&limitToLast=10")
            .then(response => response.json())
            .then(data => this.setState({ names: data }));
    }
	render() {
		return (
			<Context.Provider value={this.state}>
				{ this.props.children }
			</Context.Provider>
		)
	}
}

export const Consumer = Context.Consumer;
