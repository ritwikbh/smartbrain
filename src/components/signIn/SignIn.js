import React from 'react';

// Update: 28-8-2020
// Since we're integrating our backend to our frontend now. Therefore, we'll make the signin component as in independent smart component that
// has the states username and password. 

class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	// listen for change in email input and use this as callback function to update the state (Email and Password entered)
	onEmailChange = (event) => {
		this.setState({signInEmail : event.target.value});
	}
	// update state password when user inputs password
	onPasswordChange = (event) => {
		this.setState({signInPassword : event.target.value});
	}

	// when user clicks submit, call this
	onSubmitSignIn = () => {
		// call corresponding server endpoint to sign the user in. But fetch by default is GET. we wanna send POST
		// second argument is the request
		fetch('http://localhost:3000/signin', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				email : this.state.signInEmail,
				password : this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				// let the parent (App.js) know that route has changed. We're in home know and have signed in successfully
				// now load the current user who is logged in by calling the loadUser callback method since then we can add functionality
				// to update this user's data in App.js (like we update his/her seach Count)
				// Same load of user must be done on registering as well.
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}

	render() {
		const {onRouteChange} = this.props;
		// tachyons sign in form
		return (
			<article className="br3 ba white b--white-80 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 white-80">
				    <div className="measure">
				    	<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				     	<legend className="f1 fw6 ph0 mh0">Sign In</legend>
				     	<div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent white hover-bg-navy hover-white w-100"
					        		type="email" 
					        		name="email-address" 
					        		id="email-address" 
					        		onChange = {this.onEmailChange}/>
				    	</div>
				    	<div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent white hover-bg-navy hover-white w-100"
					        		type="password" 
					        		name="password"  
					        		id="password"
					        		onChange = {this.onPasswordChange}/>
				    	</div>
				    	</fieldset>
				    	<div className="">
				    		<input onClick = {this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
				    	</div>
				    	<div className="lh-copy mt3">
				    		<p onClick = {() => onRouteChange('register')} href="#0" className="f6 link dim white db pointer">New User? Register</p>
				    	</div>
					</div>
				</main>
			</article>
		);
	}
}

export default SignIn;