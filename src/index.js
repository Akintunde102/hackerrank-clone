import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import style from "./index.scss";
import  NewsList  from  "./NewsList.js";


class App extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			storyItem: [],
			loaded: false
		};
		this.loadtime = 1000*60;
		this.counter = 0;
	}

getApiData1(){
	return new Promise(function (resolve){
		 resolve(axios.get("https://hacker-news.firebaseio.com/v0/topstories.json"));
	})
}

getApiData2(){
	return this.getApiData1()
	.then(response => {
		return Promise.all(response.data.slice(0,30).map(itemId => axios.get("https://hacker-news.firebaseio.com/v0/item/" + itemId + ".json")));
    });
}

	setNewState(name,value){
		const newState = Object.assign({}, this.state, {
			[name]: value,
			loaded: true
		});

		this.setState(newState);
	}

    smartStateReload(name){
		 var self = this;
		 console.log(self.loadtime);
		 self.getApiData2()
		 .then(value =>{
			var now = new Date();
           console.log(now.toString());
			this.setNewState(name,value);
		 });

		}

	componentDidMount(){
		var self = this;
		self.smartStateReload("storyItem");
		this.interval = setInterval(function(){self.smartStateReload("storyItem");}, self.loadtime);
		
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	  }

	 isEmpty(obj) {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return false;
		}
		return true;
	}

	render(){
	  if (this.state.loaded){  this.counter++; return <NewsList items={this.state.storyItem} renderCount={this.counter} />;}
	  else {return <div> I am loading</div>; }
	}

}


ReactDOM.render(<App />, document.getElementById("content"));