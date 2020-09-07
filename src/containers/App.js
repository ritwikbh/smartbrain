import React from 'react';
import './App.css';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import Rank from '../components/rank/Rank';
import ImageLinkForm from '../components/imageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/faceRecognition/FaceRecognition';
import SignIn from '../components/signIn/SignIn';
import Register from '../components/register/Register';
import Particles from 'react-particles-js';



// Particle.js json config
const particlesOptions = {
		"particles": {
				"number": {
						"value": 60,
						"density": {
								"enable": true,
								"value_area": 800
						}
				},
				"color": {
					"value": "#7bed9f"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#000000"
				},
				"polygon": {
				"nb_sides": 5
				},
				"image": {
				"src": "img/github.svg",
				"width": 100,
				"height": 100
				}
		},
		"opacity": {
			"value": 0.9,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			}
		},
		"size": {
			"value": 4,
			"random": true,
			"anim": {
				"enable": false,
				"speed": 40,
				"size_min": 0.1,
				"sync": false
			}
		},
		"line_linked": {
			"enable": true,
			"distance": 150,
			"color": "#ffffff",
			"opacity": 0.4,
			"width": 1
		},
		"move": {
			"enable": true,
			"speed": 5,
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": false,
				"rotateX": 600,
				"rotateY": 1200
			}
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": true,
				"mode": "repulse"
			},
			"onclick": {
				"enable": true,
				"mode": "push"
			},
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 400,
				"line_linked": {
					"opacity": 1
				}
			},
			"bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
			},
			"repulse": {
				"distance": 200,
				"duration": 0.4
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
		}
	},
		"retina_detect": true
}
// route is used to see where exactly we are in the page. default is signin, meaning the signin component must be loaded first
// After signing in, we'll change this state.

const initialState = {
	input : '',
	imageUrl: '',
	box : {},
	route : 'signin',
	isSignedIn : false,
	user : {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			input : '',
			imageUrl: '',
			box : {},
			route : 'signin',
			isSignedIn : false,
			user : {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}
	}
	// No need to store the password of the user here.
	// refer to Register component. This updates the user's properties on successful registration
	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}});
	};

	// the box state defines the boundary coordinates where we need to draw the box around face detected tbat the url input the state here.
	calculateFaceLocation = (data) => {
			// reading response json for coordinates (these are represented in percentages wrt to the image's dimesnions)
			const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
			// DOM manipulation
			const image = document.getElementById('inputImage');
			const width = Number(image.width);
			const height = Number(image.height);
			return {
					// left_col is a property of the response object. look at the json body.
					// percentage * total width gives location of first vertex (top left vertex)
					leftCol : clarifaiFace.left_col * width,
					topRow : clarifaiFace.top_row * height,
					rightCol : width - (clarifaiFace.right_col * width),
					bottomRow : height - (clarifaiFace.bottom_row * height)
			}
	};

	displayFaceBox = (box) => {
			// update state.
			this.setState({box : box});
	};

	onInputChange = (event) => {
			// input changed. ie, url changed. so update the url
		this.setState({input : event.target.value});
	};
	// clarify API call on button click after pasting image url. First update the state (imageUrl) too
	onButtonSubmit = () => {
			this.setState({imageUrl : this.state.input});
			fetch('http://localhost:3000/imageurl', {
				method : 'post',
				headers : {'Content-Type' : 'application/json'},
				body: JSON.stringify({
					input : this.state.input
				})
			})
			.then(response => response.json())
			.then(response => {
				if(response) {
					fetch('http://localhost:3000/image', {
						method : 'put',
						headers : {'Content-Type' : 'application/json'},
						body: JSON.stringify({
							id : this.state.user.id
						})
					})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, {entries: count}));
					})
					.catch(console.log);
				}
				// what is the above code doing? Updating the image search count of a user when he/she search for an image by clicking
				// the button. http://localhost:3000/image endpoint only requires id as the input and returns the count as output.
				// Notice the this.setState(Object.assign(this.state.user, {entries: count}))
				// We only want to update a certain property (entry count) of the current loaded user object so we use Object.assign
				// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err));
	};
	// In the above function : 
	// somehow, passing imageUrl as second parameter won't work in react
	// in place of this.state.input due to te way setState works.
	// this is basically the response json format (figured out using chrome console and analysing the response)
	// which gives us the coordinates of the boundary box that we need to generate to mark the face. We pass this response to our calculateFaceLocation funtion.

	// we should change the route state once we have signed in so that we don't land up on the sign in page again.
	onRouteChange = (route) => {
		if(route === 'signout'){
			this.setState(initialState);
		} else if (route === 'home'){
			this.setState({isSignedIn: true});
		}
		this.setState({route : route});
	};
	render(){
		const {isSignedIn, imageUrl, route, box} = this.state;
	return (
		<div className="App">
			<Particles className = 'particles' params= {particlesOptions}/>
			<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
			{
				route === 'home' ?
				<div>
					<Logo/>
					<Rank name={this.state.user.name} entries={this.state.user.entries}/>
					<ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
					<FaceRecognition box = {box} imageUrl = {imageUrl}/>
				</div>
				: (
					route === 'signin'
					? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
					: <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
				)
			}
		</div>
	)};
};
export default App;
