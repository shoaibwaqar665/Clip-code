import React from 'react';

const TitleDisplay = ({ enteredTitle, handleTitleClick }) => {
	return (
		<div className="mt-4" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
			Entered Title: {enteredTitle}
		</div>
	);
};

export default TitleDisplay;
