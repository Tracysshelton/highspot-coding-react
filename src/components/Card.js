import React from 'react';

//Rendering individual card and information
const Card = ({image, name, text, setName, type}) => {
	return (
		<div className="card-item">
			<div className="image-wrapper">
				<img className="image" src={image} alt={name} />
			</div>
			<p className="card-name">
				<strong>Name:</strong> {name}</p>
			<p className="card-text">
				<strong>Text:</strong> {text}</p>
			<p className="card-setName">
				<strong>Set Name:</strong> {setName}</p>
			<p className="card-type">
				<strong>Type:</strong> {type}</p>
		</div>
	);
};

export default Card;