const API_URL = 'http://localhost:3000/api';

export async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        throw new Error('Credenciales inválidas');
    }
    const data = await res.json();
    return data.token;
}

export async function getUsers(token) {
    const res = await fetch(`${API_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error('No autorizado o error en la petición');
    }
    return await res.json();
}

export async function updateUser(token, email, newData) {
    const res = await fetch(`${API_URL}/users/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newData)
    });
    if (!res.ok) {
        throw new Error('No se pudo actualizar el usuario');
    }
    return await res.json();
}

export async function createUser(token, userData) {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
    if (!res.ok) {
        throw new Error('Error al crear el usuario');
    }
    return await res.json();
}