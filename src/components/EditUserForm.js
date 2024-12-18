import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { updateUser } from '../services/api';

function EditUserForm({ token, onSuccess }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state;

    const [name, setName] = useState(user.name);
    const [type, setType] = useState(user.type);
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(token, user.email, { name, type, password: password || undefined });
            alert('Usuario actualizado con éxito');
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el usuario');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-btn shadow"
            >
                Atrás
            </button>
            <div className="card">
                <h2 className="title">Editando a: {user.email}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="input-class"
                    />
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="input-class bg-white"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input
                        type="password"
                        placeholder="Nueva contraseña (opcional)"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="input-class"
                    />
                    <button type="submit" className="btn-primary">
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditUserForm;