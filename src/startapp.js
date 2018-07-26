'use strict';
import SearchApp from './searchapp'

const dataObj = {
	arr : [
	{ active : false, id : 1, name : "data1" },
	{ active : false, id : 2, name : "data2" },
	{ active : false, id : 3, name : "data3" },
	{ active : false, id : 4, name : "data4" },
	{ active : false, id : 5, name : "data5" },
	{ active : false, id : 6, name : "data6" }]
}



const domContainer = document.querySelector('#search_widget');
ReactDOM.render(React.createElement(SearchApp, dataObj), domContainer);
