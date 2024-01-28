import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		const auth = getAuth();

		try {
			await signInWithEmailAndPassword(auth, email, password);
			setEmail('');
			setPassword('');
			setLoginError('');
			// Redirect to another page if needed
			// props.history.push('/');
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

				<button type="submit" className="btn btn-success mybtn2 px-4 py-2 bg-green-500 text-white">
					<Link to="/todo" >LOGIN</Link>
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
