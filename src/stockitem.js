'use strict';

class Item extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="border round stockItemDiv" onClick={(e) => this.props.clickCb(this.props.id, e)}>{this.props.name}</div>
		)
	}
}

export default Item
