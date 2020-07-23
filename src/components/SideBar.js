import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const SocialButtonsPage = () => {
  return (
  	<>
	  	<a className="social" type="button" role="button"  href="/home">
			<i className="fa fa-twitter"></i>
		</a>
		<a className="social" type="button" role="button"  href="/home">
			<i className="fa fa-facebook"></i>
		</a>
		<a className="social" type="button" role="button"  href="/home">
			<i className="fa fa-instagram"></i>
		</a>
	</>
  );
}

//<Button variant="light">Create Quiz!</Button>
class SideBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render (){
		return (
			<Col sm={3} className="Side-bar" >
				<div className="Side-bar-content">
					
					<div className="margin">
						Build your own quiz and share it with your friends! <br/>
					</div>
					{this.props.quiz === false ? (
						<Button variant="danger" size="lg" href="/new">
							Create Quiz!
						</Button>
						) : (
						<Button variant="danger" size="lg">
							Create Quiz!
						</Button>
						)
					}
				
					<div className="margin">
						Build your own quiz and share it with your friends! <br/>
					</div>
					<SocialButtonsPage />
				</div>
			</Col>
		);
	}
}

export default SideBar;
