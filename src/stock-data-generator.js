function generateStocks(num, pointsOfDat) {
	const stocks = []
	for(var i = 0; i < num; i++)
	{
		stocks.push({
			id : i,
			name : generateStockName(),
			data : generateStockData(pointsOfDat),
			active : true,
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
export default { generate : generateStocks }
