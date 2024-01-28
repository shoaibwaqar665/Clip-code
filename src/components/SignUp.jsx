import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const Signup = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
	});
	const [registrationError, setRegistrationError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
			const user = userCredential.user;

			// Store additional user information in the Firestore database
			const usersCollection = collection(db, 'user');
			await addDoc(usersCollection, {
				Name: formData.fullName,
				Email: formData.email,
				// Do not store the password in the database for security reasons
			});

			// Clear input fields and errors after successful registration
			setFormData({ fullName: '', email: '', password: '' });
			setRegistrationError('');
			setIsLoading(false);
			// Redirect to another page if needed
			// props.history.push('/login');
		} catch (error) {
			setRegistrationError(error.message);
			setIsLoading(false);
		}
	};

	return (
		<div className='container'>
			<br />
			<br />
			<h2>REGISTER HERE</h2>
			<br />
			<form autoComplete="off" className='form-group' onSubmit={handleRegister}>
				<label>Enter Full Name</label>
				<input
					type="text"
					className='form-control'
					name="fullName"
					required
					onChange={handleInputChange}
					value={formData.fullName}
				/>
				<br />
				<label>Enter Email</label>
				<input
					type="email"
					className='form-control'
					name="email"
					required
					onChange={handleInputChange}
					value={formData.email}
				/>
				<br />
				<label>Enter Password</label>
				<input
					type="password"
					className='form-control'
					name="password"
					required
					onChange={handleInputChange}
					value={formData.password}
				/>
				<br />
				<button type="submit" className='btn btn-success mybtn2' disabled={isLoading}>
					{isLoading ? 'REGISTERING...' : 'REGISTER'}
				</button>
			</form>
			{registrationError && <div className='error-msg'>{registrationError}</div>}

			<span>
				Already have an account? Login
				<Link to="/login"> here</Link>
			</span>
		</div>
	);
};

export default Signup;
