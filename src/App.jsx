import React from "react";
import './assets/css/style.scss';
import { Navbar, 
		Nav,  
		Alert, 
		Card,
		Container,
		Row,
		Col

	} from 'react-bootstrap'
	import cn from "classnames"


const Bio = ({ children }) => {
	return (
		<div className="bio">
			<p>Nomad, Full-stack dev going entrepreneur. Sometimes i do music and generative art.</p>
			<p>I'm Martín García, a creative software engineer specializing in <b class="blue">integration and full-stack development.</b></p>
			<p>Focused to add value on each delivery by implementing high-end technologies like front-end and back-end frameworks in <b>languages like Python, JavaScript, Ruby, and Java</b>, building <b>CI/CD Pipelines, and implementing SaaS and PaaS</b> best practices and patterns to help integrate and iterate, I thrive on solving complex problems and delivering high-quality software products. My expertise lies in seeing the bigger picture and providing all the patterns, infrastructure, ideas, and code necessary to start or evolve any digital product.</p>
			<p>Explore my portfolio and learn more about my skills and experience in software engineering.</p>
		</div>
	)
}
const App = () => {
	let variant = 'primary';
	const classes = cn("card-profile");

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

			        <img className="card-profile-img" alt="Profile" src={"./img/profile.jpg"} />;
			        
			        <h3>I'am <b className="color">Martín García</b></h3>

			        <p className="mb-4"><Bio></Bio></p>

							<a href="https://github.com/mgarciat1090" className="link to Github">
								<img className="img-logo" src="img/github.png" width={"40px"} alt="Github" />
							</a>
							<a href="https://www.behance.net/psysonik" className="link to Behance">
								<img className="img-logo" src="img/behance.png" width={"40px"} alt="behance" />
							</a>
							<a href="https://www.instagram.com/mgarciat1090/" className="link to Instagram">
								<img className="img-logo" src="img/instagram.png" width={"40px"} alt="instagram"/>
							</a>
							<a href="https://www.linkedin.com/in/mart%C3%ADn-garc%C3%ADa-4163097a/" className="link to Linkedin">
								<img className="img-logo" src="img/linkedin.png" width={"40px"} alt="Linkedin" />
							</a>
							<a href="https://open.spotify.com/user/1277285087" className="link to Spotify">
								<img className="img-logo" src="img/spotify.png" width={"40px"} alt="Spotify" />
							</a>
							<a href="https://soundcloud.com/aexmachinum" className="link to SoundCloud">
							<img className="img-logo" src="img/soundcloud-logo.png" width={"40px"} alt="SoundCloud" />
							</a>

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