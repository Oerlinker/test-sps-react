import React, {useState} from 'react';
import {createUser} from '../services/api';
import {useNavigate} from 'react-router-dom';

function UserForm({token, onSuccess}) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('user');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(token, {name, email, type, password});
            onSuccess();
        } catch (error) {
            alert('Error al crear el usuario');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded"
            >
                Atrás
            </button>
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Crear Usuario</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded shadow"
                    >
                        Crear
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;