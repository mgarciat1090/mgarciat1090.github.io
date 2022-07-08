import React from "react";
import './App.scss';
import Alert from 'react-bootstrap/Alert'
import {
  Container,
  Grid,
  Card,
  Button,
  Form,
  Avatar,
  Profile,
  Media,
  Comment,
} from "tabler-react";


const App = () => {
	let variant = 'primary';
	return (
		<div className="maindiv">
			{/*<Alert variant={variant}>
		      This is a {variant} alert—check it out!
		    </Alert>*/}
		    <Profile
		        name="Martín García"
		        backgroundURL="./assets/img/background.jpg"
		        avatarURL="./assets/img/profile.jpg"
		        twitterURL="test"
		        >
					Nomad, million dollar hustler. Sometimes i do music and generative art.
            </Profile>
		   

		</div>
	)

}

export default App;