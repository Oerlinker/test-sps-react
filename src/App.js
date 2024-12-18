import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UsersList from './components/UserList';
import UserForm from './components/UserForm';
import EditUserForm from "./components/EditUserForm";
import React, {useState} from 'react';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const isLoggedIn = !!token;

    const handleLoginSuccess = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
    };
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess}/> : <Navigate to="/users"/>}
                />
                <Route
                    path="/users"
                    element={isLoggedIn ? <UsersList token={token} onLogout={handleLogout}/> : <Navigate to="/login"/>}
                />
                <Route
                    path="/create-user"
                    element={isLoggedIn ? <UserForm token={token} onSuccess={() => window.location.href = '/users'}/> :
                        <Navigate to="/login"/>}
                />
                <Route
                    path="/edit-user"
                    element={isLoggedIn ?
                        <EditUserForm token={token} onSuccess={() => window.location.href = '/users'}/> :
                        <Navigate to="/login"/>}
                />
                <Route path="*" element={<Navigate to="/users"/>}/>
            </Routes>
        </Router>
    );
}

export default App;
