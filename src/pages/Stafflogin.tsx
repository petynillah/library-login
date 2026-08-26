import React, { useState } from "react";
import { loginStaff, verifyStaff2FA } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Stafflogin() {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [stage, setStage] = useState<'credentials' | 'otp'>('credentials');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

   const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!otp) {
      setErrorMessage('Please enter the verification code');
      return;
    }

    // 💡 THE FIX: Remove "Bearer " if it exists in the token string before sending it
    const cleanToken = tempToken.replace(/^(Bearer\s+)+/i, '').trim();

    // Pass the clean token here instead of tempToken
    const response = await verifyStaff2FA(cleanToken, { otp });

    if (response.success && response.token) {
      localStorage.setItem('jwtToken', response.token);
      navigate('/staffdash');
    } else {
      setErrorMessage(response.message || 'Verification failed');
    }
  };


  if (stage === 'otp') {
    return (
      <div className="portal-container">
        <h1 className="portal-title">Staff Login Portal</h1>

        <form onSubmit={handleVerifyOtp} className="login-box">
          {errorMessage && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
              {errorMessage}
            </p>
          )}

          <div className="form-group">
            <label className="form-label">verification code</label>
            <input
              type="text"
              className="form-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>

          <div className="button-container">
            <button type="submit" className="login-btn" >
              verify
            </button>
          </div>
        </form>

        <div className="portal-links">
          
           <a href="#back"
            className="link-blue"
            onClick={(e) => { e.preventDefault(); setStage('credentials'); setErrorMessage(''); }}
          >
            Back to Login
          </a>
        </div>

        <footer className="portal-footer">
          mombasa county library &copy;2026
        </footer>
      </div>
    );
  }

  return (
    <div className="portal-container">
      <h1 className="portal-title">Staff Login Portal</h1>

      <form onSubmit={handleLogin} className="login-box">
        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
            {errorMessage}
          </p>
        )}

        <div className="form-group">
          <label className="form-label">staff id</label>
          <input
            type="text"
            className="form-input"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button type="submit" className="login-btn" >
            login
          </button>
        </div>
      </form>

      <div className="portal-links">
        <a href="#forgot" className="link-blue">forgot password?</a>
        <span className="text-gray">
          First time login? <Link to="/staffregister" className="link-blue" target="_blank">Register</Link>
        </span>
      </div>

      <footer className="portal-footer">
        mombasa county library &copy;2026
      </footer>
    </div>
  );
}

export default Stafflogin;