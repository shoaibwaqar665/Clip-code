import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
	return (
		<div>
			<Link to="/signup">
				<button>
					SignUp
				</button>
			</Link>
		</div>
	)
}

export default Login
