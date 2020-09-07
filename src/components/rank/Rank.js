import React from 'react';
const Rank = ({name, entries}) => {
	return (
		<div>
			<div className = 'white f3'>
				{`Hi ${name}!, the number of times you've submitted images on our website is `}
			</div>
			<div className = 'white f1'>
				{entries}
			</div>
		</div>
	);
}

export default Rank;