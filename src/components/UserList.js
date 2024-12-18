import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getUsers} from '../services/api';

function UsersList({token,onLogout}) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUsers(token);
                setUsers(data);
            } catch (error) {
                console.error(error);
                alert('No se pudo obtener la lista de usuarios. Quizás el token expiró.');
            }
        }

        fetchData();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="card">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="title">Lista de Usuarios</h2>
                    <div className="space-x-2">
                        <button
                            onClick={() => navigate('/create-user')}
                            className="btn-primary"
                        >
                            Crear Usuario
                        </button>
                        <button
                            onClick={() => { onLogout(); navigate('/login'); }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-btn shadow"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <ul className="divide-y divide-gray-300">
                    {users.map(user => (
                        <li key={user.email} className="flex justify-between items-center py-2">
                            <span className="text-gray-700">
                                {user.name} - <span className="text-gray-500">{user.email}</span>
                            </span>
                            <button
                                onClick={() => navigate('/edit-user', { state: user })}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UsersList;