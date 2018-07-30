'use strict';

class DataPointSlider extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value : this.props.current
		}
	}

	onChange(e) {
		this.props.onChange(e.target.value)
	}

			// <div className="row col-4 mx-auto">
	render() {
		return (
			<div className="row sliderDiv mx-3">
				<span>Num. Data Points: </span>
				<span className="sliderSpan">{this.props.min}</span>
				<input type="range" id="rangeInput" onChange={(e) => this.onChange(e)} step="1" min={this.props.min} max={this.props.max} list="ticks" value={this.props.current}></input>
				<span className="col-1 sliderSpan">{this.props.max}</span>
			</div>
		)
	}
}

export default DataPointSlider
