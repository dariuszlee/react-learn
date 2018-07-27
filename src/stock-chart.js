'use strict'
import Chart from 'chart.js'

class StockChart extends React.Component {
	constructor(props){
		super(props)
		console.log(this.props)
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
		console.log("Updating chart")
		console.log(this.props.chartData)
		const prevPropsCount = prevProps.chartData.datasets.reduce((acc, current) => {
			if(current != undefined) { 
				return acc + 1 
			}
			else {
				return acc
			}
		}, 0)
		const currPropsCount = this.props.chartData.datasets.reduce((acc, current) => {
			if(current != undefined) { 
				return acc + 1 
			}
			else {
				return acc
			}
		}, 0)

		if(currPropsCount > prevPropsCount) {

		}
		else {

		}
		this.chart.data.datasets = this.props.chartData.datasets
		this.chart.update()
		// this.chart.data.datasets.forEach((dataset) => {
		// 	if(this.props.chartData.find((element) => {
		// 		return 
		// 	}) == undefined){
		// 	}
		// }
	}

	render() {
		return (
			<div className="chartDiv mx-auto mb-3">
				<canvas id="myChart" data={this.props.chartData} options={this.props.chartOptions} width="420" height="140">
				</canvas>
			</div>
		)
	}
}

export default StockChart
