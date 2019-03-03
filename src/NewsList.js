import  React  from  "react";
import  NewsHeader  from  "./NewsHeader.js";
import  NewsItem  from  "./NewsItem.js";
import  nh from "./NewsHeader.scss";
import {ToastContainer, ToastStore} from 'react-toasts';



export  default  class  NewsList  extends  React . Component {
	render() {
		
	
	const alertWord = 'Reloaded';

		console.log(this.props.renderCount + alertWord);

		ToastStore.success(alertWord);
	
		return (
		<div className={nh.newsList}>
		<ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_LEFT} lightBackground />
			<NewsHeader />
				<ol className={nh.newsList_newsItem}>
					{
						(this.props.items).map(function(item, index) {
                
							const dataItem = item.data;
							return (
								<NewsItem key={dataItem.id} item={dataItem} rank={index+1} />
							);
						})
					}
				</ol>
			</div>
		);
	}
}