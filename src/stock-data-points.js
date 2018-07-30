'use strict';
class StockDataPoints extends React.Component {
	constructor(props){
		super(props)
	}

	onChangeHandler(e){
		this.props.onDataTypeChange(e.target.value)
	}

	getDayClassName(){
		var className = "btn btn-secondary "
		if(this.props.dataType=="day")
		{
			className += "active"
		}
		return className
	}

	getWeekClassName(){
		var className = "btn btn-secondary "
		if(this.props.dataType=="week")
		{
			className += "active"
		}
		return className
	}

	getMonthClassName(){
		var className = "btn btn-secondary "
		if(this.props.dataType=="month")
		{
			className += "active"
		}
		return className
	}

	render() {
		return (
<div className="singleLineDiv mx-3 btn-group btn-group-toggle">
	<label className={this.getDayClassName()}>
		<input type="radio" name="options" value="day" onChange={(e) => this.onChangeHandler(e)} autoComplete="off" checked={this.props.dataType==="day"} />
		Day
	</label>
	<label className={this.getWeekClassName()}>
		<input type="radio" name="options" value="week" onChange={(e) => this.onChangeHandler(e)} autoComplete="off" checked={this.props.dataType==="week"}></input>
		Week
	</label>
	<label className={this.getMonthClassName()}>
		<input type="radio" name="options" value="month" onChange={(e) => this.onChangeHandler(e)} autoComplete="off" checked={this.props.dataType==="month"}></input>
		Month
	</label>
</div>
		)
	}
}

export default StockDataPoints
