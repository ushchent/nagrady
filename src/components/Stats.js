// Предусмотреть null в распределении по полу, https://nagrady-29748.firebaseio.com/total_stats/434.json и https://nagrady.by/nagrada/434

import React from 'react'
import * as d3 from "d3";

class BarChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			by_sex: null,
			by_year: null
			};
		}

	componentDidMount() {
		const { nagrada_id } = this.props;
		const data_link = nagrada_id == null ? "https://nagrady-29748.firebaseio.com/total_stats.json" : `https://nagrady-29748.firebaseio.com/stats/${nagrada_id}.json`;
		fetch(data_link)
			.then(response => response.json())
			.then(data => this.setState({ by_sex: data.by_sex, by_year: data.by_year }))
			.catch(err => console.log('Error loading or parsing data.'));
   }

	componentDidUpdate() {
		  this.createBarChart();
		  this.createPieChart();
   }

createBarChart = () => {
	if (this.state.by_year != null) {
	d3.select(this.node).select(".no_data").remove();
	const column_area = d3.select(this.node).select(".barchart");
	// Получаем данные из состояния
	const { by_year} = this.state;
    const dataMax = d3.max(Object.values(by_year));
    const yScale = d3.scaleLinear()
         .domain([0, dataMax])
         .range([280, 0])
    var xScale = d3.scaleBand()
                    .domain(Object.entries(by_year).map(d => d[0]))
                    .range([0, 650])
                    //.paddingInner(0.05);
                    
    var xAxis = d3.axisBottom()
                .scale(xScale);
    var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(5);
    
    column_area.select(".xAxis").call(xAxis);
    column_area.select(".yAxis").call(yAxis);
        
    column_area.select(".bars")
		.selectAll("rect")
        .data(Object.entries(by_year))
        .enter()
        .append("rect")
        .attr("x", (d) => (xScale(d[0]) + xScale.bandwidth() / 2 - 10 ))
        .attr("y", (d) => yScale(d[1]))
        .attr("width", 20)
        .attr("height", d => 280 - yScale(d[1]))
	}
}

clean_pie_data = (pie_data) => {
	delete pie_data[2];
	Object.keys(pie_data).forEach(d => pie_data[d] == null ? delete pie_data[d] : null);
	return pie_data;
	}

createPieChart() {
	if (this.state.by_sex != null) {
			const sex_map = {0: "ж", 1: "м", 2: "у"};
		const pie_area = d3.select(this.node).select(".pie");
		const pie_data = this.clean_pie_data(this.state.by_sex);
        var color = d3.scaleOrdinal()
                    .domain(Object.keys(pie_data)) 
                    .range(["#43A738", "#B81007"]);

        var wedges = d3.pie()(Object.values(pie_data));

        var arcGenerator = d3.arc()
                            .innerRadius(0)
                            .outerRadius(100)
                            .startAngle(function(d) { return d.startAngle; })
                            .endAngle(function(d) { return d.endAngle; });

        pie_area.selectAll("path")
            .data(wedges)
            .enter()
            .append("path")
            .attr("d", arcGenerator)
            .attr("fill", function(d, i) { return color(i); })
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .attr("title", function(d) { return d.data; });
       
        var legend = d3.select(".pie_legend");
        legend.selectAll("circle")
            .data(Object.keys(pie_data))
            .enter()
            .append("circle")
            .attr("cx", 125)
            .attr("cy", function(d, i) { return i * 20; })
            .attr("r", 6)
            .attr("fill", function(d, i) { return color(i); });
        legend.selectAll("text")
            .data(Object.keys(pie_data))
            .enter()
            .append("text")
            .text(d => sex_map[d] )
            .attr("x", 135)
            .attr("y",function(d, i) { return (i * 20) + 4; });
	}
}

render() {
	if (this.state.by_year == null) {
		return (<div className="stats">
							<h2>Статыстыка ўзнагароджанняў</h2>
					<p>Чакаем дадзеныя...</p>
			</div>);
	} else {
		return (
			<div className="stats">
				<h2>Статыстыка ўзнагароджанняў</h2>
				<svg ref={node => this.node = node}
					viewBox="0 0 1000 310"
					preserveAspectRatio="xMidYMid meet"
					width={"100%"} height={310}>
					<g className="barchart" width={700} height={310}>
					<g className="xAxis" transform="translate(40, 290)"></g>
					<g className="yAxis" transform="translate(40, 10)"></g>
					<g className="bars" transform="translate(40, 10)"></g>
					</g>
					<g className="piechart" width={300} height={300} transform="translate(700,0)">
					<g className="pie" transform="translate(150, 150)"></g><g className="pie_legend" transform="translate(125, 60)"></g>
					</g>
				</svg>
			</div>
			)
		}
	}
}

export default BarChart;
