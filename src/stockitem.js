'use strict';

class Item extends React.Component {
	constructor(props) {
		super(props)
	}

	handleClick(ev){
		this.props.clickCb(this.props.id, ev.ctrlKey)
	}

	render() {
		return (
			<div className="border round stockItemDiv" onClick={(e) => {this.handleClick(e)}}>{this.props.name}</div>
		)
	}
}

export default Item
