import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png';
// a new npm package that we installed. see the documentation on its npm page.

import './Logo.css';
const Logo = () => {
	return (
		<div className = 'ma2 mt2'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner"> <img src= {brain} alt="logo"/> </div>
			</Tilt>
		</div>
	);
}

export default Logo;