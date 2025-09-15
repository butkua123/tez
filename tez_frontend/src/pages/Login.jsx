import  { useState } from 'react';
import { loginUser } from '../services/UserService';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            // Save the user data in localStorage after successful login
            localStorage.setItem('user', JSON.stringify(response.data));
            setMessage(`Welcome, ${response.data.name}!`);
            console.log('User logged in:', response.data);
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Invalid credentials.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
