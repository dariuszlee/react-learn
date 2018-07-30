'use strict';

import SearchArea from './SearchArea'
import Item from './stockitem'
import StockDataPoints from './stock-data-points'
import StockChart from './stock-chart'
import DataPointSlider from './data-point-slider'
import Generator from './stock-data-generator'

class SearchApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items : props.data,
			aggregates : [],
			maxData : props.maxData,
			minData : props.minData,
			currData : props.currData,
			dataType : props.dataType
		}
		this.activate = this.activate.bind(this)
		this.aggregateOrDeactivate = this.aggregateOrDeactivate.bind(this)
		this.deaggregate = this.deaggregate.bind(this)
		this.changeNumData = this.changeNumData.bind(this)
		this.onDataTypeChange = this.onDataTypeChange.bind(this)
	}

	changeNumData(newValue){
		this.setState({currData : newValue})
	}

	onDataTypeChange(changeTo) {
		this.setState({
			dataType : changeTo,
			maxData : this.getDataByVal(this.props.numOfData, changeTo),
			minData : this.getMinData(changeTo),
			currData : this.getCurrData(changeTo, this.state.dataType, this.state.currData)
		})
	}

	getCurrData(dataTypeTo, from, prevData) {
		console.log(prevData)
		switch(from){
			case 'day':
				return this.getDataByVal(prevData, dataTypeTo)
			case 'week':
				if(dataTypeTo === "day")
					return (prevData - 1) * 7 + 1
				else
					return this.getDataByVal((prevData -1) * 7 + 1, dataTypeTo)
			case 'month':
				if(dataTypeTo === "day")
					return (prevData - 1) * 30 + 1
				else
					return (prevData - 1) * 4 + 1
			default:
				console.error("Not a valid data type")
				break;
		}
	}

	getDataByVal(val, dataType) {
		switch(dataType){
			case 'day':
				return val
			case 'week':
				if(Math.ceil(val / 7) + 1 > Math.ceil(this.props.numOfData / 7)){
					return Math.ceil(this.props.numOfData / 7)
				}
				return Math.ceil(val / 7) + 1
			case 'month':
				if(Math.ceil(val / 30) + 1 > Math.ceil(this.props.numOfData / 30)){
					return Math.ceil(this.props.numOfData / 30)
				}
				return Math.ceil(val / 30) + 1
			default:
				console.error("Not a valid data type")
				break;
		}
	}

	getMinData(dataType) {
		return 2
	}

	activate(id, item) {
		const newState = this.state.items.map((item) => {
			if(item.id == id)
			{
				item.active = 'v';
				return item
			}
			else
			{
				return item;
			}
		});
		this.setState({ items : newState })
	}

	aggregateOrDeactivate(id, item) {
		if(item) {
			this.aggregate()
		}
		else {
			this.deactivate(id)
		}
	}

	aggregate() {
		var ret = []
		const newState = this.state.items.map(function(i){
			if(i.active === 'v') {
				i.active = 'a'
				ret.push(i)
				return i
			}
			else {
				return i
			}
		})
		this.setState({ items : newState })
		this.addAggregate(ret)
	}

	addAggregate(ret){
		var nextId = 100
		if(this.state.aggregates.length != 0){
			nextId = this.state.aggregates[this.state.aggregates.length - 1].id + 1
		}
		var aggName = ret.map((cur) => cur.name).join('+')
		var aggday = []
		var aggweek = []
		var aggmonth = []
		for(var j = 0; j < ret[0].data.day.length; j++) {
			var dayValue = 0
			for(var i = 0; i < ret.length; i++)
			{
				dayValue += ret[i].data.day[j]
			}
			aggday.push(dayValue)
		}
		for(var j = 0; j < ret[0].data.week.length; j++) {
			var weekValue = 0
			for(var i = 0; i < ret.length; i++)
			{
				weekValue += ret[i].data.week[j]
			}
			aggweek.push(weekValue)
		}
		for(var j = 0; j < ret[0].data.month.length; j++) {
			var monthValue = 0
			for(var i = 0; i < ret.length; i++)
			{
				monthValue += ret[i].data.month[j]
			}
			aggmonth.push(monthValue)
		}
		const retValue = {
			name : aggName,
			id : nextId,
			active : 'v',
			color : Generator.generateColor(),
			data : {
				day : aggday,
				week : aggweek,
				month : aggmonth
			},
			ids : ret.map(e => e.id)
		}
		var newAggregates = this.state.aggregates.slice(0)
		newAggregates.push(retValue)
		this.setState({aggregates : newAggregates})
	}

	deaggregate(id){
		const item = this.state.aggregates.find((e) => e.id == id)
		item.ids.forEach((e) => this.activate(e, false))
		const index = this.state.aggregates.indexOf(item)
		var newAggregates = this.state.aggregates.slice(0)
		newAggregates.splice(index, 1)
		this.setState({aggregates : newAggregates})
	}

	deactivate(id) {
		const newState = this.state.items.map((i) => {
			if(i.id == id)
			{
				i.active = 'h';
				return i
			}
			else
			{
				return i;
			}
		});
		this.setState({ items : newState })
	}

	generateChartLabels(numOfPoints) {
		var ret = []
		for(var i = numOfPoints - 1; i > 0; i--)
		{
			ret.push(i)
		}
		ret.push("Now")
		return ret
	}

	generateChartData() {
		const allData = this.state.items.concat(this.state.aggregates)
		const dataObj = {
			labels : this.generateChartLabels(this.state.currData),
			datasets : this.removeUndefined(allData.map((item) => {
				if(item.active === 'v')
				{
					return {
						label : item.name,
						data : item.data[this.state.dataType].slice(item.data[this.state.dataType].length - this.state.currData),
						backgroundColor : [
							'rgba(0, 0, 0, 0)'
						],
						borderColor : [ item.color ],
						borderWidth : 1
					}
				}
			}))
		}
		return dataObj
	}

	removeUndefined(dataObj) {
		var ret = []
		dataObj.forEach((e) => {
			if(e != undefined){
				ret.push(e)
			}
		})
		return ret
	}

	generateChartOptions() {
		const xLabel = String('Number of ' + this.state.dataType + 's before now')
		var opts = {
			animation : false,
			scales: {
				yAxes: [{
					display : true,
					scaleLabel: {
						display : true,
						labelString : 'Price'
					},
					ticks: {
						callback: function(value, index, values) {
							return '$' + value;
						}
					}
				}],
				xAxes: [{
					display : true,
					scaleLabel: {
						display : true,
						labelString : xLabel
					}
				}]
			}
		}
		return opts
	}

	render() {
		return (
<div className="container mx-auto">
	<StockChart chartData={this.generateChartData()} chartOptions={this.generateChartOptions()}/>
	<div className="row mb-2">
		<StockDataPoints onDataTypeChange={this.onDataTypeChange} dataType={this.state.dataType}/>
		<SearchArea />
		<DataPointSlider min={this.state.minData} onChange={this.changeNumData} max={this.state.maxData} current={this.state.currData} />
	</div>
	<div className="row mb-2">
		<div className='col-4 mx-auto border selectionDiv'>
			{
				this.state.items.map((item) => { 
					if(item.active == 'h'){ 
						return <Item clickCb={this.activate} id={item.id} name={item.name} />
					}
				})
			}
		</div>
		<div className='col-3 mx-auto border selectionDiv'>
			{
				this.state.items.map((item) => { 
					if(item.active == 'v'){ 
						return <Item clickCb={this.aggregateOrDeactivate} id={item.id} name={item.name} />
					}
				})
			}
		</div>
		<div className='col-4 mx-auto border selectionDiv'>
			{
				this.state.aggregates.map((item) => { 
					return <Item clickCb={this.deaggregate} id={item.id} name={item.name} />
				})
			}
		</div>
	</div>
</div>
		)
	}
}

export default SearchApp
