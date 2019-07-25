import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Stats = (props) => {
		return (
			<div className="stats">
				<BarChart props={props.by_year} />
				{/* <PieChart props={this.state.stats.by_sex} /> */}
			</div>
			)
}

export default Stats;
