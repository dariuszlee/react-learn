'use strict';

class Item extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<div onClick={(e) => this.props.clickCb(this.props.id, e)}>{this.props.name} Click to add me</div>
			</div>
		)
	}
}

export default Item
