import React from 'react';
import Questionnaire from './components/Questionnaire';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Trending from './components/Trending';
import AllQuizzes from './components/AllQuizzes';
import QuizForm from './components/QuizForm';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

//import questions from './data/questions';

function HomePage(props) {
  return (
    <>
      <Row>
        <SideBar quiz={false}/>
        <Col sm={9} className="p-5">
          <div className="mx-5" style={{textAlign:"center"}}>
            <h1> <b>We got all the quizzes you love!</b></h1>
          </div>
          <Trending />
          <AllQuizzes />
        </Col>
      </Row>
    </>
  );
}

function QuizPage(props) {
  return (
    <Row>
      <SideBar quiz={false}/>
      <Col sm={9} className="p-5">
        <div>
          <Questionnaire id={props.match.params.id}/>
        </div>
      </Col>
    </Row>
  );
}

function NewQuizPage(props) {
  return (
    <Row>
      <SideBar quiz={true}/>
      <Col sm={9} className="p-5">
        <div>
          <QuizForm/>
        </div>
      </Col>
    </Row>
  );
}


//<Questionnaire id={questions[0].id}/>

function App() {
  return (
    <>
      <NavBar/>
      <Container fluid>
        <Router>
          <Switch>
            <Route path="/quiz/:id" component={QuizPage} />
            <Route path="/new" component={NewQuizPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
