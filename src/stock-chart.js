'use strict'
import Chart from 'chart.js'

class StockChart extends React.Component {
	constructor(props){
		super(props)
	}

	componentDidMount() {
		this.chartElement = document.querySelector("#myChart")
		if(this.chartElement == null)
		{
			console.error("Chart not found.")
		}
		else {
			this.chart = new Chart(this.chartElement, {
				type : 'line',
				data : this.props.chartData,
				options : this.props.chartOptions
			});
		}
	}

	componentDidUpdate(prevProps) {
		this.chart.options = this.props.chartOptions
		this.chart.data.labels = this.props.chartData.labels
		this.chart.data.datasets = this.props.chartData.datasets
		this.chart.update()
	}

	render() {
		return (
			<div className="chartDiv mx-auto mb-3">
				<canvas id="myChart" data={this.props.chartData} options={this.props.chartOptions} width="600" height="300">
				</canvas>
			</div>
		)
	}
}

export default StockChart
