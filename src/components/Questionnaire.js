import React from 'react';
import Button from 'react-bootstrap/Button';

// my components
import Question from './Question';
import Result from './Result';

import questions_data from '../data/questions';

class Questionnaire extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			questions: [],
			results: null,
			selectedOptions: [],
			result_index: null,
			show_result: false,
			id: props.id
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
		this.renderSubmitButton = this.renderSubmitButton.bind(this)
		this.submitQuestionnaire = this.submitQuestionnaire.bind(this)
	}

	handleOptionChange(changeEvent, i) {
		var selectedOptions = this.state.selectedOptions.slice()
		selectedOptions[i] = changeEvent.target.value
		this.setState({
			selectedOptions: selectedOptions
		});
	}

	componentDidMount(){
		// does this when component mounts, perfect for API calls! :)
		var data = questions_data;
		
		data.map((questionnaire)=>{
			if (parseInt(questionnaire.id) === parseInt(this.props.id)){
				this.setState({
					title: questionnaire.title,
					results: questionnaire.results,
					img: questionnaire.img,
					questions: questionnaire.questions,
					selectedOptions: Array(questionnaire.questions.length).fill(null),
					count: Array(questionnaire.results.length).fill(0)
				});
				return ;
			}
		});
	}

	submitQuestionnaire() {
		var selectedOptions = this.state.selectedOptions;

		// to track if all questions were answered
		var complete = true;

		// we do not want to change the state, 
		// we want a copy of it so use slice()
		var count = this.state.count.slice();

		selectedOptions.map((option)=>{
			if (option === null) {
				complete = false;
			} else {
				count[option] += 1
			}
		});

		if (complete) {
			var result_index = indexOfMax(count);
			this.setState({
				result_index: result_index,
				show_result: true
			});
		}
	}

	renderSubmitButton() {
		return (
			<Button 
				variant="danger" 
				className="btn-primary"
				onClick={ this.submitQuestionnaire }
				size="lg"
			> 
				See answer
			</Button>
		);
	}

	renderResult() {
		return <Result content={this.state.results[this.state.result_index]} />
	}

	renderQuestions(){
		return (

		<div className="form-group">
		<img className="card-img-top card-img" src={this.state.img} alt="Card cap" />
			{ this.state.questions.map( (question, index) => {
				return (
					<div className="my-5">
						<Question question={question.question} />
						
						{question.answers.map((answer)=>{
							return(
								<div className="form-check answer-check">
								<label class="form-check-label">
									<input	
										className="form-check-input"
										type="radio" 
										value={answer[1]} 
										checked={this.state.selectedOptions[index] === answer[1]}
										onChange={(e) => this.handleOptionChange(e, index)}
									/>
										{answer[0]}
									</label>
								</div>
							);
						})}
					</div>
				)
			})}
		</div>
		
		);
	}

	render (){
		return (
			<div>
				<div style={{textAlign:"center"}}>
					<h1>
						<b>{this.state.title}</b>
					</h1>
				</div>
				{!this.state.show_result && this.renderQuestions()}
				{!this.state.show_result && this.renderSubmitButton()}
				<div style={{textAlign:"center"}}>
					{this.state.show_result && this.renderResult()}
				</div>
			</div>
		);
	}
}

export default Questionnaire;

// ============================== HELPER FUNCTIONS ==============================

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


