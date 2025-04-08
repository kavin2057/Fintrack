// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        setError('');
        setIsLoading(true);
        
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);

            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong! Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.card}>
                <div style={styles.logoContainer}>
                    <div style={styles.logo}>
                        <i className="fas fa-briefcase" style={styles.logoIcon}></i>
                    </div>
                    <h1 style={styles.appName}>Fin Track</h1>
                </div>
                
                <h2 style={styles.title}>Create Account</h2>
                
                {error && (
                    <div style={styles.errorContainer}>
                        <i className="fas fa-exclamation-circle" style={styles.errorIcon}></i>
                        <p style={styles.error}>{error}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <i className="fas fa-user" style={styles.inputIcon}></i>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                style={styles.input}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <i className="fas fa-lock" style={styles.inputIcon}></i>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                style={styles.input}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <div style={styles.inputWrapper}>
                            <i className="fas fa-lock" style={styles.inputIcon}></i>
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                style={styles.input}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div style={styles.termsContainer}>
                        <input 
                            type="checkbox" 
                            id="terms" 
                            required 
                            style={styles.checkbox}
                        />
                        <label htmlFor="terms" style={styles.termsText}>
                            I agree to the <a href="#" style={styles.termsLink}>Terms of Service</a> and <a href="#" style={styles.termsLink}>Privacy Policy</a>
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        style={{
                            ...styles.button,
                            ...(isLoading ? styles.buttonDisabled : {})
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span style={styles.loadingContainer}>
                                <i className="fas fa-circle-notch fa-spin" style={styles.loadingIcon}></i>
                                Creating Account...
                            </span>
                        ) : 'Sign Up'}
                    </button>
                </form>
                
                <div style={styles.divider}>
                    <span style={styles.dividerLine}></span>
                    <span style={styles.dividerText}>or</span>
                    <span style={styles.dividerLine}></span>
                </div>
                
                
                
                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Already have an account? 
                        <Link to="/login" style={styles.loginLink}>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        fontFamily: "'Poppins', sans-serif",
        padding: '20px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px',
    },
    logo: {
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '15px',
    },
    logoIcon: {
        color: 'white',
        fontSize: '24px',
    },
    appName: {
        margin: 0,
        fontSize: '24px',
        fontWeight: '700',
        color: '#2c3e50',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
    },
    inputIcon: {
        position: 'absolute',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#4ca1af',
        fontSize: '18px',
    },
    input: {
        width: '100%',
        padding: '15px 15px 15px 50px',
        borderRadius: '8px',
        border: '1px solid #e1e5eb',
        fontSize: '16px',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxSizing: 'border-box',
    },
    termsContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        marginTop: '5px',
    },
    checkbox: {
        marginTop: '3px',
    },
    termsText: {
        fontSize: '14px',
        color: '#636e72',
        lineHeight: '1.5',
    },
    termsLink: {
        color: '#4ca1af',
        textDecoration: 'none',
        fontWeight: '500',
    },
    button: {
        padding: '15px',
        background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
    },
    buttonDisabled: {
        opacity: '0.7',
        cursor: 'not-allowed',
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    loadingIcon: {
        fontSize: '18px',
    },
    errorContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#ffe8e8',
        padding: '12px 15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ffcdd2',
    },
    errorIcon: {
        color: '#e53935',
        fontSize: '18px',
    },
    error: {
        color: '#e53935',
        fontSize: '14px',
        margin: 0,
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '30px 0',
    },
    dividerLine: {
        flex: '1',
        height: '1px',
        backgroundColor: '#e1e5eb',
    },
    dividerText: {
        padding: '0 15px',
        color: '#a0a0a0',
        fontSize: '14px',
    },
    socialLogin: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    socialButton: {
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s ease',
    },
    googleButton: {
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #e1e5eb',
    },
    socialIcon: {
        fontSize: '18px',
    },
    footer: {
        marginTop: '30px',
        textAlign: 'center',
    },
    footerText: {
        color: '#636e72',
        fontSize: '14px',
    },
    loginLink: {
        color: '#4ca1af',
        textDecoration: 'none',
        fontWeight: '600',
        marginLeft: '5px',
    },
};

export default Register;
