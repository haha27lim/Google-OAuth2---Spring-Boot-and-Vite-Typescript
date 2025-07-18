import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import '../styles/components/Login.css';


const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { setCurrentUser, setShowAdminBoard } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get('returnUrl') || '/profile';

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      navigate(returnUrl);
    }
  }, [returnUrl]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      (user) => {
        setCurrentUser(user);
        if (user.roles) {
          setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
        navigate(returnUrl);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="login-container">
      <div className="auth-card">
        <div className="card card-container">
          <Link to="/" className="back-link">
            <ArrowLeft className="back-icon" />
            Back to Home
          </Link>
          <h2 className="login-title">Login to JourneyBloom</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google-login-button"
                >
                  <img
                    src="/google-icon.svg"
                    alt="Google"
                    className="google-icon"
                  />
                  Sign in with Google
                </button>
              </div>

              <div className="or-login-with">Or login with</div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                  />
                  <button
                    type="button"
                    className="show-password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <Link
                to="/forgot-password"
                className="forgot-password-button"
              >
                Forgot your password?
              </Link>

              <div className="form-group">
                <button
                  type="submit"
                  className="login"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <LogIn className="button-icon" />
                  Login
                </button>
                <div className="signup-link-container">
                  Don't have an account?{' '}
                  <Link to="/register" className="signup-link">
                    Sign up
                  </Link>
                </div>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;