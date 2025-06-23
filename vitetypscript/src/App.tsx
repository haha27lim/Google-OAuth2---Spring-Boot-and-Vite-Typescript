import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Header } from './components/Layout/Header';
import { AuthProvider } from './contexts/AuthContext';
import OAuth2RedirectHandler from './Auth/OAuth2RedirectHandler';
import { AuthGuard } from './components/Auth.Guard';
import Profile from './components/Profile';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/profile" element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            } />
          </Routes>
        </div>
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
