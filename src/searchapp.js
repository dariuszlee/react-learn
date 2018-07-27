'use strict';

import SearchArea from './SearchArea'
import Item from './stockitem'
import StockDataPoints from './stock-data-points'
import StockChart from './stock-chart'

class SearchApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items : props.data,
		}
		this.activate = this.activate.bind(this)
		this.deactivate = this.deactivate.bind(this)
	}

	activate(id, item) {
		console.log("Activating Id: " + id)
		const newState = this.state.items.map((item) => {
			if(item.id == id)
			{
				item.active = true;
				return item
			}
			else
			{
				return item;
			}
		});
		this.setState({ items : newState })
	}

	deactivate(id, item) {
		console.log("Deactivating Id: " + id)
		const newState = this.state.items.map((item) => {
			if(item.id == id)
			{
				item.active = false;
				return item
			}
			else
			{
				return item;
			}
		});
		this.setState({ items : newState })
	}

	generateChartData() {
		const dataObj = {
			labels : [1, 2, 3, 4, 5, 6],
			datasets : this.removeUndefined(this.state.items.map((item) => {
				if(item.active)
				{
					return {
						label : item.name,
						data : item.data,
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

	render() {
		return (
<div className="container mx-auto">
	<StockChart chartData={this.generateChartData()} chartOptions={{animation : false}}/>
	<div>
		<StockDataPoints />
		<SearchArea />
		<DataPointSlider />
	</div>
	<div className="row mb-2">
		<div className='col-4 mx-auto border selectionDiv'>
			{
				this.state.items.map((item) => { 
					if(item.active == false){ 
						return <Item clickCb={this.activate} id={item.id} name={item.name} />
					}
				})
			}
		</div>
		<div className='col-3 mx-auto border selectionDiv'>
			{
				this.state.items.map((item) => { 
					if(item.active == true){ 
						return <Item clickCb={this.deactivate} id={item.id} name={item.name} />
					}
				})
			}
		</div>
		<div className='col-4 mx-auto border selectionDiv'>
			{
				this.state.items.map((item) => { 
					if(item.active == true){ 
						return <Item clickCb={this.deactivate} id={item.id} name={item.name} />
					}
				})
			}
		</div>
	</div>
</div>
		)
	}
}

export default SearchApp
