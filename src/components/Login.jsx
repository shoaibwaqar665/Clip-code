import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const navigate = useNavigate(); 

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setEmail('');
			setPassword('');
			setLoginError('');
			navigate('/todo');
		} catch (error) {
			setLoginError(error.message);
		}
	};

	return (
		<div className="container mx-auto my-8 p-4 max-w-md bg-white shadow-md">
			<h2 className="text-2xl font-semibold mb-4">LOGIN HERE</h2>
			<form autoComplete="off" className="form-group" onSubmit={handleLogin}>
				<label className="block mb-2 text-gray-600">Enter Email</label>
				<input
					type="email"
					className="form-control mb-2 p-2 border rounded"
					required
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>

				<label className="block mb-2 text-gray-600">Enter Password</label>
				<input
					type="password"
					className="form-control mb-4 p-2 border rounded"
					required
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<br />
				<button type="submit" className="btn btn-success mybtn2 px-4 py-2 bg-green-500 text-white rounded-sm">
					Login
				</button>
			</form>
			{loginError && <div className="error-msg mt-4 text-red-500">{loginError}</div>}

			<span className="mt-4 block text-gray-600">
				Don't have an account? Register <Link to="/signup" className="text-blue-500">here</Link>
			</span>
		</div>
	);
};

export default Login;
