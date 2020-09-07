import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
	if(isSignedIn){
		return (
			<nav style = {{display : 'flex', justifyContent : 'flex-end'}}>
				<p onClick = {() => onRouteChange('signout')} className = 'f3 link dim white underline pa3 pointer'>
					Sign Out
				</p>
			</nav>
		);
	}
	else {
		return (
			<div className = {'navBG'}>
				<nav className={'flex justify-between bb b--white-100 shadow-5'}>
				  <p className= {'link white-80 hover-white no-underline flex items-center pa3'} >
				    <svg
				      className={'dib h1 w2 navClass'} dataIcon={'grid'} viewBox={'0 0 32 32'}>
				      <title>Super Normal Icon Mark</title>
				      <path d={'M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z'}/>
				    </svg>
				    <span className = {'mh2 pa2 ba b--white-80'}>SmartBrain | Face Detection Service</span>
				  </p>
				  <div className={'flex-grow pa3 flex items-center'}>
				    <p className={'f5 link dib white pointer dim mr3 mr4-ns'} onClick = {() => onRouteChange('signin')}>About</p>
				    <p className={'f5 link dib white pointer dim mr3 mr4-ns'} onClick = {() => onRouteChange('signin')}>Sign In</p>
				    <p className={'f5 dib white bg-animate hover-bg-white pointer hover-black no-underline pv2 ph4 br-pill ba b--white-100'} onClick = {() => onRouteChange('register')}>Sign Up</p>
				  </div>
				</nav>
			</div>
		);
	}
}

export default Navigation;




// <nav style = {{display : 'flex', justifyContent : 'flex-end'}}>
// 				<p onClick = {() => onRouteChange('signin')} className = 'f3 link dim near-white underline pa3 pointer'>
// 					Sign In
// 				</p>
// 				<p onClick = {() => onRouteChange('register')} className = 'f3 link dim near-white underline pa3 pointer'>
// 					Register
// 				</p>
// 			</nav>