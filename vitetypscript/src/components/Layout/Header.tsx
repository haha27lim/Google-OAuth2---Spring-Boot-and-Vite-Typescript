import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useEffect } from "react";
import EventBus from "../../common/EventBus";
import { useAuth } from "../../contexts/AuthContext";

export const Header: React.FC = () => {
        
    const { currentUser, setCurrentUser } = useAuth();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          setCurrentUser(user);
        }
    
        EventBus.on("logout", logOut);
    
        return () => {
          EventBus.remove("logout", logOut);
        };
      }, []);


    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };


    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    My Application
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                </div>

                {currentUser ? (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        </div>
    );
};