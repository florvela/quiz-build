import React from 'react';

function Result(props) {
	return (
		<>
			<div>
				<h1>{props.content.title}</h1>
			</div>
			{props.content.info.split('\n').map((paragraph, i)=>{
				return (
					<p key={i}>
						{paragraph}
					</p>
				);
			})}
		</>
	);
}

export default Result;