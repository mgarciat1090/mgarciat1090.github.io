import React from "react";
import './App.scss';
import { Navbar, 
		Nav,  
		Alert, 
		Card,
		Container,
		Row,
		Col

	} from 'react-bootstrap'
	import cn from "classnames"


const App = () => {
	let variant = 'primary';
	const classes = cn("card-profile");
	let bio = "Nomad, Full-stack dev going entrepreneur. Sometimes i do music and generative art.";
	return (
		<div className="maindiv">
			{/*<Alert variant={variant}>
		      This is a {variant} alert—check it out!
		    </Alert>*/}
		    <Navbar>
			  <Container>
			    <Navbar.Brand href="#home">Martín García</Navbar.Brand>
			    <Nav.Link href="#home">Bio</Nav.Link>
			    <Nav.Link href="#home">Stack</Nav.Link>
			    <Navbar.Toggle />
			    <Navbar.Collapse className="justify-content-end">
			      <Navbar.Text>
			        Signed in as: <a href="#login">Mark Otto</a>
			      </Navbar.Text>
			    </Navbar.Collapse>
			  </Container>
			</Navbar>
            <div className="">
            	{/*<Profile
			        name="Martín García"
			        backgroundURL="./assets/img/background.jpg"
			        avatarURL="./assets/img/profile.jpg"
			        twitterURL="test"
			        >
						Nomad, Full-stack dev going entrepreneur. Sometimes i do music and generative art.
	            </Profile>*/}

	            <Card className={classes}>
			      <Card.Header backgroundURL={"./assets/img/background.jpg"} />
			      <Card.Body className="text-center">

			        <img className="card-profile-img" alt="Profile" src={"./assets/img/profile.jpg"} />;
			        
			        <h3>Martín García</h3>

			        <p className="mb-4">{bio || children}</p>
			        {/*<SocialNetworksList
			          itemsObjects={[{ name: "twitter", label: "Follow" }]}
			          prefix="fa"
			          asButtons
			        />*/}
			      </Card.Body>
			    </Card>

				<Container>
				  <Row>
					<Col lg={4}>					  
					  
					</Col>
					<Col lg={8}>


					</Col>
				  </Row>
				</Container>
			</div>
		   

		</div>
	)

}

export default App;