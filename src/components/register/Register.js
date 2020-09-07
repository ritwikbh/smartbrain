import React from 'react';
// similar to sign in. Refer that for comments
class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name : ''
		}
	}
	onNameChange = (event) => {
		this.setState({name : event.target.value});
	}
	onEmailChange = (event) => {
		this.setState({email : event.target.value});
	};
	onPasswordChange = (event) => {
		this.setState({password : event.target.value});
	};

	// when user clicks submit, call this
	onSubmitRegister = () => {
		// call corresponding server endpoint to sign the user in. But fetch by default is GET. we wanna send POST
		// second argument is the request
		fetch('http://localhost:3000/register', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				email : this.state.email,
				password : this.state.password,
				name : this.state.name
			})
		})
		.then(response => response.json())
		// check our backend. On registering we return the user object
		.then(user => {
			// let the parent (App.js) know that route has changed. We're in home know and have registered.
			// Also, since backend returns the newly created user, we should update the user profile in the front end (see the App constructor)
			// Since the whole app might need user, we have created the user object there itself and not in here. So we've created a loadUser
			// method too in the App container that can update this newly generated user that was returned by the backend.
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	};
	render () {
		return (
			<article className="br3 ba white b--white-50 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
			<main className="pa4 white-80">
			    <div className="measure">
			    	<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			     	<legend className="f1 fw6 ph0 mh0">Register</legend>
			     	<div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
						        type="text" 
						        name="name"  
						        id="name"
						        onChange = {this.onNameChange}/>
			    	</div>
			     	<div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
						        type="email" 
						        name="email-address"  
						        id="email-address"
						        onChange = {this.onEmailChange}/>
			    	</div>
			    	<div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
						        type="password" 
						        name="password"  
						        id="password"
						        onChange = {this.onPasswordChange}/>
			    	</div>
			    	</fieldset>
			    	<div className="">
			    		<input onClick = {this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" type="submit" value="Sign Up"/>
			    	</div>
				</div>
			</main>
		</article>
		);
	}
}

export default Register;