import React from "react";
import { Link } from "react-router-dom";

class Paginator extends React.Component {
	wrap_pagination = (data) => {
		return (
				<div className="paginator">
					{ data }
				</div>
	)}

	create_jsx_array = data => {
		return data.map( e => isNaN(e) ? e : 
							<Link key={ e }
								to={ `/data/${e}` }
								data-page_id={ e }
								onClick={ this.props.handle_click }
								className={
									this.props.current_page === e ?
									"page_num active" :	"page_num"
								}>{e}</Link>
						)
	}

generate_page_array = current_page => {
	var min, max, arr = [];
	switch (true) {
		// Случай < 2 не указывается, возвращает null через default
		case (this.props.page_count > 1 && this.props.page_count < 9):
				return (
					this.create_jsx_array([1, 2, 3, 4, 5, 6, 7, 8, 9])
				);
		case this.props.page_count > 9:
			switch (true) {
				case current_page <= 5:
					min = 1;
					max = 9;
					for (let i=min; i<=max; i++) { arr.push(i); }
					//arr.unshift(1)
					arr.push("...")
					arr.push(this.props.page_count)
					return this.create_jsx_array(arr);
				case current_page >= this.props.page_count - 3:
					min = this.props.page_count - 7;
					max = this.props.page_count;
					for (let i=min; i<=max; i++) { arr.push(i); }
					arr.unshift(1)
					arr.splice(1, 0, "...")
					return this.create_jsx_array(arr);
				case current_page >= 5 && current_page < this.props.page_count - 4:
					min = current_page - 3;
					max = current_page + 3;
					for (let i=min; i<=max; i++) { arr.push(i); }
					arr.unshift(1)
					arr.splice(1, 0, "...")
					arr.push("...")
					arr.push(this.props.page_count)
					return this.create_jsx_array(arr);
				default:
					return null
			}
		default:
			return null;
	}
}

	// Вывод пагинации в функции render() 
	generate_output = (page_count, current_page) => {
		return this.generate_page_array(current_page);
	}

	render() {
		console.log("Paginator props...", this.props)
		return (
			this.wrap_pagination(
			this.generate_output(this.props.page_count,
				this.props.current_page
				)
			)
		)
	}
}

export default Paginator;
