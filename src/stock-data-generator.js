function generateStocks(num, pointsOfDat) {
	const stocks = []
	for(var i = 0; i < num; i++)
	{
		stocks.push({
			id : i,
			name : generateStockName(),
			data : generateDayWeekMonthAggregate(generateStockData(pointsOfDat)),
			active : 'h',
			color : generateStockColor()
		})
	}
	return stocks
}

function generateStockColor(){
	var rgbaString = 'rgba('
	rgbaString += Math.floor(Math.random() * 255) + ', '
	rgbaString += Math.floor(Math.random() * 255) + ', '
	rgbaString += Math.floor(Math.random() * 255) + ', '
	rgbaString += '1)'
	return rgbaString
}

function generateDayWeekMonthAggregate(data){
	const weekData = aggregateDataByVal(data, 7)
	const monthData = aggregateDataByVal(data, 30)
	return {
		day : data,
		week : weekData,
		month : monthData
	}
}

function aggregateDataByVal(data, val) {
	var ret = []
	const numOfPeriods = Math.ceil(data.length / val)
	for(var i = 0; i < numOfPeriods; i++) {
		ret.push(data.slice(i * val + 1, i * val + (val - 1)).reduce((acc, cur) => acc + cur) / val)
	}
	ret.push(data[data.length-1])
	return ret
}

function generateStockData(pointsOfData) {
	const initialPriceData = Math.floor(Math.random() * 100) + 1
	const stockData = [ initialPriceData ]
	for(var i = 0; i < pointsOfData - 1; i++)
	{
		const nextPoint = stockData[stockData.length - 1] + (Math.random() * 20 - 10)
		if(nextPoint < 0) {
			stockData.push(0)
		}
		else {
			stockData.push(nextPoint)
		}
	}
	return stockData
}

function generateStockName(){
	var stockName = ""
	var numOfCharacters = Math.floor(Math.random() * 3) + 3
	for(var i = 0; i < numOfCharacters; i++){
		stockName += String.fromCharCode(65 + Math.floor(Math.random() * 26))
	}
	return stockName
}

// console.log(generateStockColor())
export default { generate : generateStocks , generateColor : generateStockColor}
