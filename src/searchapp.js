'use strict';

import SearchArea from './SearchArea'
import Item from './stockitem'

class SearchApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items : props.arr,
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

	injectRandom() {
		return <p> rand </p>
	}

	render() {
		return (
<div>
	<h5>Search Me</h5>
	<SearchArea />
	<div className="row">
		<div className='col-6'>
			<h5>Inactive</h5>
			{
				this.state.items.map((item) => { 
					if(item.active == false){ 
						return <Item clickCb={this.activate} id={item.id} name={item.name} />
					}
				})
			}
		</div>
		<div className='col-6'>
			<h5>Active</h5>
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
