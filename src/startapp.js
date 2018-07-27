'use strict';
import SearchApp from './searchapp'
import StockGenerator from './stock-data-generator'
// import CreateChart from './stock-chart.js'
// import Chart from 'react-chartjs'
// const LineChart = Chart.line

const data = { data : StockGenerator.generate(12, 6) }

const domContainer = document.querySelector('#search_widget');
ReactDOM.render(React.createElement(SearchApp, data), domContainer);

// const chartDiv = document.getElementById('myChart')
// const myChartInstance = new Chart(chartDiv , {
// 	type: 'line',
// 	data: {
// 		labels: [1, 2, 3, 4, 5, 6],
// 		datasets: [{
// 			label: '# of Votes',
// 			data: [12, 19, 3, 5, 2, 3],
// 			backgroundColor: [
// 				'rgba(0, 0, 0, 0)'
// 			],
// 			borderColor: [
// 				'rgba(255,99,132,1)'
// 			],
// 			borderWidth: 1
// 		},
// 		{
// 			label: 'Data 2',
// 			data: [10, 11, 12, 13, 12, 11],
// 			backgroundColor: [
// 				'rgba(0, 0, 0, 0)'
// 			],
// 			borderColor: [
// 				'rgba(255,30,340,1)'
// 			],
// 			borderWidth: 1
// 		}	]
// 	},
// 	options: {
// 	}
// });
