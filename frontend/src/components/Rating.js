import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ val, txt, color }) => {
	return (
		<div className='rating'>
			<span>
				<i
					style={{ color }}
					className={
						val >= 1
							? 'fas fa-star'
							: val >= 0.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						val >= 2
							? 'fas fa-star'
							: val >= 1.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						val >= 3
							? 'fas fa-star'
							: val >= 2.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						val >= 4
							? 'fas fa-star'
							: val >= 3.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						val >= 5
							? 'fas fa-star'
							: val >= 4.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>{txt && txt}</span>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e835',
};

Rating.propTypes = {
	txt: PropTypes.string.isRequired,
	color: PropTypes.string,
};

export default Rating;

// val: PropTypes.number.isRequired,
