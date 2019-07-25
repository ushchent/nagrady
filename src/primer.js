class BarChart extends React.Component {
  render() {
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries
          data={[30, 10, 5, 8, 15, 10]}
          width={this.props.width}
          height={this.props.height}
          color="cornflowerblue"
        />
      </Chart>
    );
  }
}

class DataSeries extends React.Component {
  render() {
    const yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);
    
    const xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);
    
    const bars = this.props.data.map((point, i) => {
      return (
        <Bar
          height={yScale(point)}
          width={xScale.rangeBand()}
          offset={xScale(i)}
          availableHeight={this.props.height}
          color={this.props.color}
          key={i}
        />
      );
    });

    return <g>{bars}</g>
  }
}

DataSeries.defaultProps = {
  title: '',
  data: []
};

class Bar extends React.Component {
  render() {
    return (
      <rect
        fill={this.props.color}
        width={this.props.width}
        height={this.props.height}
        x={this.props.offset}
        y={this.props.availableHeight - this.props.height}
      />
    );
  }
}

Bar.defaultProps = {
  width: 0,
  height: 0,
  offset: 0
};

class Chart extends React.Component {
  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
}

class App extends React.Component {
  render() {
    return <BarChart width={600} height={300} />;
  }
}

React.render(<App />, document.getElementById('container'));
