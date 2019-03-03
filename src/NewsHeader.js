import React from "react";
import imageLogo from "./y18.gif";
import nh from"./NewsHeader.scss";

export  default  class  NewsHeader  extends  React.Component {
	getLogo () {
		return (
			<div className= {nh.newsHeader_logo}> 
				<a href = " https://news.ycombinator.com/ " >< img src= {imageLogo}  /></a> 
			</div>
		);
	}

	getTitle(){
		return (
			<div className= {nh.newsHeader_title}> 
				<a className= {nh.newsHeader_textLink} href = "https://news.ycombinator.com/ " > Hacker News </a> 
			</div>
		);
	}

	getNav () {
		var navLinks = [
			{
				name:"new",
				url:"newest"
			},
			{
				name:"comments",
				url:"newcomments"
			},
			{
				name:"show",
				url:"show "
			},
			{
				name:"ask",
				url:"ask"
			},
			{
				name:"jobs",
				url:"jobs"
			},
			{
				name:"submit",
				url:"submit"
			}
		];
     

		return(
			<div className={nh.newsHeader_nav}>
				{
					navLinks.map (function(navLink) {
						return (
							<a key={navLink.url} className={nh.newsHeader_navLink +" "+ nh.newsHeader_textLink} href={"https://news.ycombinator.com/"+navLink.url} > 
								{navLink.name} 
							</a>
						);
					})
				}
			</div>
		);
	}

	getLogin () {
		return (
			<div className={nh.newsHeader_login}> 
				<a className={nh.newsHeader_textLink}  href ="https://news.ycombinator.com/login?goto=news"> login </a> 
			</div>
		);
	}


	render () {
		return (
			<div className ={nh.newsHeader}> 
				{this.getLogo()}
				{this.getTitle()}
				{this.getNav()}
				{this.getLogin()}
			</div>
		);
	}
}