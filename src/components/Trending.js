import React from 'react';

import QuizCard from './QuizCard';

import trending from '../data/trending';


class Trending extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trending: []
		};
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount(){
		this.setState({
			trending: trending
		});
	}

	renderQuizes(){
		return(
			<div className="">
			    <div id="TrendingCarousel" className="carousel slide" data-ride="carousel" data-interval="3000">
			        <ol className="carousel-indicators">
			        	{ this.state.trending.map( (quiz, index)=>
			        		<li key={index} className={(index === 0)? "active": ""} data-target="#TrendingCarousel" data-slide-to={index}></li>
			        	)}
			        </ol>
			        <div className="carousel-inner">
			        	
			        	{ this.state.trending.map( (quiz, index)=> 
			        		<div key={index} className={(index === 0) ? 'carousel-item active' : 'carousel-item '}>
					        	<QuizCard quiz={quiz}  index={index}/> 
						    </div>
			        	)}
					        
			        </div>
			        <a className="carousel-control-prev" href="#TrendingCarousel" data-slide="prev">
			            <span className="carousel-control-prev-icon"></span>
			        </a>
			        <a className="carousel-control-next" href="#TrendingCarousel" data-slide="next">
			            <span className="carousel-control-next-icon"></span>
			        </a>
			    </div>
			</div>
		);
	}

	render() {
		return (
			<>
				{this.state.trending.length >= 1 && (
					<div>
						<h2> <b>Trending Quizzes:</b></h2>
					</div>
				)}
				{this.renderQuizes()}
			</>
		);
	}
}

export default Trending;