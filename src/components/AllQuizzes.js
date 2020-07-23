import React from 'react';
import {Button, Row, Col} from 'react-bootstrap';


import QuizCard from './QuizCard';

import all from '../data/all.json';


class AllQuizzes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			all_quizzes: [],
			search: null,
			itemCount: 3,
			itemsPerRow: 3
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.searchSpace = this.searchSpace.bind(this);
		this.showMore = this.showMore.bind(this);
	}

	componentDidMount(){
		this.setState({
			all_quizzes: all
		});
		return;
	}

	searchSpace(event) {
	    let keyword = event.target.value;
	    this.setState({search:keyword})
	}

	showMore(){
		var items = this.state.itemCount + this.state.itemsPerRow;
		this.setState({
			itemCount: items
		})
	}

	renderQuizzes(){
		return(
			<>
				<Row>
		        	{ this.state.all_quizzes.filter((data)=>{
						if(this.state.search == null){
							return data
						}
						else if(data.title.toLowerCase().includes(this.state.search.toLowerCase()) || data.description.toLowerCase().includes(this.state.search.toLowerCase())){
							return data
						}
					}).slice(0,this.state.itemCount).map( (quiz, index)=> 
						{return (<Col key={index} sm={4} style={{marginBottom:20}}>
							<QuizCard quiz={quiz} index={index}/> 
						</Col>)}
					)}
				</Row>
				{
					this.state.itemCount <= this.state.all_quizzes.length ?(
						<>
							<Button 
								variant="danger" 
								className="btn-primary"
								onClick={ this.showMore }
								size="lg"
							> 
								Show More
							</Button>
						</>
					):""
				}
			</>
		);
	}

	render() {
		return (
			<>
				{this.state.all_quizzes.length >= 1 && (
					<div>
						<h2><b>All Quizzes:</b></h2>
						<div className="p-2 bg-light rounded rounded-pill shadow mb-5 no-outline">
				            <div className="input-group no-outline">
				            	<input 
				            		type="text" 
				            		placeholder="What're you searching for?"
				            		className="form-control border-0 bg-light no-outline"
				            		onChange={(e)=>this.searchSpace(e)}
				            	/>
				            	<div className="input-group-append">
				                	<button className="btn btn-link text-primary no-outline">
			                			<i className="fa fa-search"></i>
				                	</button>
				              	</div>
				            </div>
				        </div>
						{this.renderQuizzes()}
					</div>
				)}
			</>
		);
	}
}

export default AllQuizzes;