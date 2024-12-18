import React, {useState} from 'react';
import {login} from '../services/api';

function Login({onLoginSuccess}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            onLoginSuccess(token);
        } catch (error) {
            console.error(error);
            alert('Credenciales inválidas');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">Iniciar Sesión</h2>
                <p className="text-sm text-center text-gray-500 mb-6">Accede a tu cuenta</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="tucorreo@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Contraseña</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold shadow"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="text-center mt-4 text-sm text-gray-500">
                    <p>
                        ¿Olvidaste tu contraseña?{' '}
                        <a href="#" className="text-blue-500 hover:text-blue-600">
                            Recupérala aquí
                        </a>
                    </p>
                    <p>
                        ¿No tienes una cuenta?{' '}
                        <a href="#" className="text-blue-500 hover:text-blue-600">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}



export default Login;