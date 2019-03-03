import React  from  "react";
import ni from "./NewsItem.scss";
import URL from "url";
import Moment from "moment";
import ImageGrayArrow from "./grayarrow.gif";

export  default  class  NewsItem  extends  React.Component{

	getDomain(){
		return URL.parse(this.props.item.url).hostname;
	}

	getTitle() {
		return (
			<div className={ni.newsItem_title}>
			{this.getVote()}
				<a className={ni.newsItem_titleLink} href={this.props.item.url ? this.props.item.url : "https://news.ycombinator.com/item?id=" + this.props.item.id}>{this.props.item.title}</a>
				{
					this.props.item.url && <span className={ni.newsItem_domain}><a  href={"https://news.ycombinator.com/from?site=" + this.getDomain()}> ({this.getDomain()})</a></span>
				}
			</div>
		);
	}

	getCommentLink() {
		var commentText = "discuss";
		if(this.props.item.kids && this.props.item.kids.length) {
			commentText = this.props.item.kids.length + " comment";
		}
  
		return (
			<a href={"https://news.ycombinator.com/item?id=" + this.props.item.id}>{commentText}</a>
		);
	}

	
	getHideLink() {
		var hideText = "hide";
  
		return (
			<a href={"https://news.ycombinator.com/hide?id=" + this.props.item.id + "&goto=news"}>{hideText}</a>
		);
	}
  
	getSubtext() {
		return (
			<div className={ni.newsItem_subtext}>
				{this.props.item.score} points by <a href={"https://news.ycombinator.com/user?id=" + this.props.item.by}>{this.props.item.by}</a> {Moment.utc(this.props.item.time * 1000).fromNow()} | {this.getHideLink()} | {this.getCommentLink()}
			</div>
		);
	}
  
	getRank(){
		return (
			<div className={ni.newsItem_rank}>
				{this.props.rank}
			</div>
		);
	}
  
	getVote() {
		return (
			<span className={ni.newsItem_vote}>
				<a href={"https://news.ycombinator.com/vote?for="+ this.props.item.id + "&dir=up&goto=news"}>
					<img src={ImageGrayArrow} width="10" />
				</a>
			</span>
		);
	}
  

	render() {
		return (
			<li className={ni.newsItem}>
				<div className={ni.newsItem_itemText}>
					{this.getTitle()}
					{this.getSubtext()}
				</div>
			</li>
		);
	}


}