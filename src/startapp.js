'use strict';
import SearchApp from './searchapp'
import StockGenerator from './stock-data-generator'

const numOfStocks = 12;
const pointsOfData = 62;
const minPoints = 2;
const data = { 
	data : StockGenerator.generate(numOfStocks, pointsOfData),
	numOfData : pointsOfData,
	maxData : pointsOfData,
	minData : minPoints,
	currData : pointsOfData,
	dataType : 'day'
}
console.log(data)

const domContainer = document.querySelector('#search_widget');
ReactDOM.render(React.createElement(SearchApp, data), domContainer);
