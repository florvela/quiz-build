import React from 'react';
import {Button} from 'react-bootstrap';


function QuizCard(props){
	return (
		<div className="card text-white bg-dark">
			<img className="card-img-top card-img" src={props.quiz.img} alt="Card cap" />
			<div className="card-body">
				<Button 
					variant="primary" 
					className="btn-primary"
					href={"/quiz/"+props.quiz.id}
				> 
					{props.quiz.title}
				</Button>
				<p className="card-text">
					{props.quiz.description}
				</p>
			</div>
		</div>
	);
}

export default QuizCard;