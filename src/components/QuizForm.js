import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';



class QuizForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: null,
			step: 1,
			results: [],
			resultTitle: "",
			resultDescription: "",
			questionTitle: "",
			answerTitle: "",
			answerResult: "",
			answers: [],
			showModal: false,
			questions: []
		}
		this.renderFirstStep = this.renderFirstStep.bind(this);
		this.renderSecondStep = this.renderSecondStep.bind(this);
		this.renderThirdStep = this.renderThirdStep.bind(this);
		this.updateVariable = this.updateVariable.bind(this);
		this.addQuestionModal = this.addQuestionModal.bind(this);
	}

	updateVariable = (e, variable) => {
		var state = {};
		state[variable] = e.target.value;
		this.setState(state);
		console.log(e.target);
	}

	nextStep = () => {
		var step = this.state.step + 1
		this.setState({
			step: step
		})
	}

	addResult = () => {
		var title = this.state.resultTitle;
		var description = this.state.resultDescription;
		var result = {
			title: title,
			description: description
		}
		var results = this.state.results.slice();
		results.push(result)
		this.setState({
			resultTitle: "",
			resultDescription: "",
			results: results
		});
	}

	addAnswer = () => {
		var title = this.state.answerTitle;
		var result = this.state.answerResult;
		var answer = [title, result]
		var answers = this.state.answers.slice();
		answers.push(answer);
		this.setState({
			answerTitle: "",
			answerResult: "",
			answers: answers
		});
	}

	addQuestion = () => {
		var text = this.state.questionTitle;
		var answers = this.state.answers;
		var questions = this.state.questions.slice();
		var question = {
			"question": text,
			"answers": answers
		}
		questions.push(question);
		this.setState({
			showModal: false,
			questions: questions,
			questionTitle: "",
			answers: []
		});
	}

	deleteItem = (index) => {
		var results = this.state.results.slice();
		results.splice(index,1); //1 is for deleting one element
		this.setState({
			results: results
		});
	}

	deleteAnswer = (index) => {
		var answers = this.state.answers.slice();
		answers.splice(index,1); //1 is for deleting one element
		this.setState({
			answers: answers
		});
	}

	deleteQuestion = (index) => {
		var questions = this.state.questions.slice();
		questions.splice(index,1); //1 is for deleting one element
		this.setState({
			questions: questions
		});
	}

	handleClose = () => {
		this.setState({
			showModal: false
		})
	}

	addQuestionModal(){
		return(
			<Modal 
				show={this.state.showModal} 
				onHide={this.handleClose}
				backdrop="static"
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
      			centered
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add new question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Question</Form.Label>
						<Form.Control 
							type="text" 
							value={this.state.questionTitle}
							onChange={(e) => this.updateVariable(e, "questionTitle")}
							placeholder="Enter your question here" 
						/>
					</Form.Group>

					<Table striped bordered>
						<thead>
							<tr>
								<td>
									Answer
								</td>
								<td>
									Result associated (with the answer)
								</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{ 
							this.state.answers.length >= 1 &&
							this.state.answers.map((answer, index)=>{
								return (
									<tr key={index}>
										<td>
											{answer[0]}
										</td>
										<td>
											{this.state.results[answer[1]].title}
										</td>
										<td>
											<Button variant="danger" onClick={() => this.deleteAnswer(index)}>
												Delete answer
											</Button>
										</td>
									</tr>
								)
							})
							}
						
							<tr>
								<td>
									<Form.Group>
										<Form.Control 
											type="text" placeholder="Enter your answer here" 
											value={this.state.answerTitle}
											onChange={(e) => this.updateVariable(e, "answerTitle")}
										/>
									</Form.Group>
								</td>
								<td>
									<Form.Group>
										<Form.Control as="select"
											value={this.state.answerResult}
											onChange={(e) => this.updateVariable(e, "answerResult")}
										>
											<option value="">select result</option>
											{ this.state.results.map((result, index) => {
												return (<option key={index} value={index}>{result.title}</option>)
											})}
										</Form.Control>
									</Form.Group>
								</td>
								<td>
									<Button 
										variant={this.state.answerResult !== "" && this.state.answerTitle !== "" ? "primary": "secondary"}
										disabled={this.state.answerResult === "" || this.state.answerTitle === ""}
										onClick={this.addAnswer}
										>
										Add answer
									</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.handleClose}>
						Cancel
					</Button>
					<Button 
						variant={this.state.questionTitle !== "" && this.state.answers.length >= 1? "primary": "secondary"}
						disabled={this.state.questionTitle === "" || this.state.answers.length < 1}
						onClick={this.addQuestion}
					>
						Add question
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	renderThirdStep(){
		return(
			<>
				<div>
					<h3>Quiz Questions</h3>
					<Table striped bordered hover>
						<thead>
							<tr>
								<td>
									Question
								</td>
								<td>
								</td>
							</tr>
						</thead>
						<tbody>
							{this.state.questions.length >= 1 && this.state.questions.map((question, index)=>{
								return (
									<tr key={index}>
										<td>
											{question.question}
										</td>
										<td>
											<Button
												variant="danger"
												onClick={() => this.deleteQuestion(index)}
											>
											Delete question
											</Button>
										</td>
									</tr>
								)
							})}
							<tr>
								<td colspan="100%">
									<Button variant="primary" onClick={() => {this.setState({showModal:true})}}>
										Add question
									</Button>
								</td>
							</tr>
						</tbody>
					</Table>
					<Button 
						variant={this.state.questions.length >= 1? "primary": "secondary"}
						disabled={this.state.questions.length < 1} 
						onClick={() => {this.setState({showModal:true})}}
					>
						Save Quiz
					</Button>
				</div>
			</>
		);
	}

	renderSecondStep(){
		return(
			<>
				<div style={{textAlign:"center"}}>
					<h2>{this.state.title}</h2>
				</div>
				<div>
					<h3>Quiz Results</h3>
					<Table striped bordered hover>
						<thead>
							<tr>
								
								<td>
									Result
								</td>
								<td>
									Result description
								</td>
								{ this.state.step === 2 && (<td></td>)}
							</tr>
						</thead>
						<tbody>
						{
							this.state.results.length >= 1 &&
							this.state.results.map((result, index)=>{
								return (
									<tr key={index}>
										<td>
											{result.title}
										</td>
										<td>
											{result.description}
										</td>
										{ this.state.step === 2 && (
											<td>
												<Button variant="danger" onClick={() => this.deleteItem(index)}>
													Delete result
												</Button>
											</td>
										)}
									</tr>
								)
							})
						}{ this.state.step === 2 && (
							<tr>
								<td>
									<Form.Group>
										<Form.Control value={this.state.resultTitle} type="text" onChange={(e) => this.updateVariable(e, "resultTitle")} placeholder="Enter a title for the result" />
									</Form.Group>
								</td>
								<td>
									<Form.Group>
										<Form.Control value={this.state.resultDescription} as="textarea" onChange={(e) => this.updateVariable(e, "resultDescription")} placeholder="Enter a description for the result" rows="6" />
									</Form.Group>
								</td>
								<td>
									<Button 
										variant={this.state.resultTitle != "" && this.state.resultDescription != "" ? "primary" : "secondary"} 
										disabled={this.state.resultTitle === "" || this.state.resultDescription === ""} 
										onClick={this.addResult}
									>
										Add result
									</Button>
								</td>
							</tr>
						)}
						</tbody>
					</Table>
					{ this.state.step === 2 && (
						<Button 
							variant={this.state.results.length >= 1? "primary" : "secondary"} 
							disabled={this.state.results.length < 1} 
							onClick={this.nextStep}
						>
							Continue
						</Button>
					)}
				</div>
			</>
		)
	}

	renderFirstStep(){
		return (
			<div>
				<h3>Getting started</h3>
				<Form.Group>
					<Form.Label>Quiz title</Form.Label>
					<Form.Control type="text" onChange={(e) => this.updateVariable(e, "title")} placeholder="Enter a title for your quiz" />
				</Form.Group>
				<Form.Group>
					<Form.Label>Short description</Form.Label>
					<Form.Control as="textarea" onChange={(e) => this.updateVariable(e, "description")} placeholder="Enter a description for your quiz" rows="3" />
				</Form.Group>
				<Button 
					variant={this.state.title && this.state.description? "primary" : "secondary"} 
					disabled={this.state.title === "" || this.state.description === ""}
					onClick={this.nextStep}
				>
					Continue
				</Button>
			</div>
		)
	}

	renderQuizForm(){
		
		return(
			<Form>
				{(this.state.step === 1) && this.renderFirstStep()}
				{(this.state.step > 1) && this.renderSecondStep()}
				{(this.state.step > 2) && this.renderThirdStep()}
				{this.addQuestionModal()}
			</Form>
		)
	}


	render (){
		return (
			<div>
				<div style={{textAlign:"center"}}>
					<h1>
						<b>Create a Quiz</b>
					</h1>
				</div>
				{this.renderQuizForm()}
			</div>
		);
	}
}

export default QuizForm;



