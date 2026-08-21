import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import { revokeAllTrustedDevices, revokeCurrentDevice } from '../api';
import { Link, useNavigate } from 'react-router-dom';

function SettingStaff(): React.JSX.Element {
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<'all' | 'current' | null>(null);

  const handleRevokeCurrent = async () => {
    setLoading('current');
    setMessage(null);
    setError(null);

    const response = await revokeCurrentDevice();

    if (response.success) {
      setMessage(response.message || 'This device will require a verification code next time.');
    } else {
      setError(response.message || 'Failed to update this device.');
    }
    setLoading(null);
  };

  const handleRevokeAll = async () => {
    const confirmed = window.confirm(
      'This will require a verification code on ALL your devices next login, including this one. Continue?'
    );
    if (!confirmed) return;

    setLoading('all');
    setMessage(null);
    setError(null);

    const response = await revokeAllTrustedDevices();

    if (response.success) {
      setMessage(response.message || 'All devices revoked. Redirecting to login...');
      setTimeout(() => {
        localStorage.removeItem('jwtToken');
        navigate('/stafflogin');
      }, 1500);
    } else {
      setError(response.message || 'Failed to revoke devices.');
    }
    setLoading(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/stafflogin');
  };

  return (
    <div className="container">
      <div className='navbar'>
        <img src={logo} alt='logo' />
        <div className='set'>
          <Link to="/staffdash" style={{ marginRight: '15px' }}>Back to dashboard</Link>
        </div>
      </div>

      <div className='dashboard'>
        <h1 className="head1">Settings</h1>

        {/* ============================== */}
        {/* SECURITY SECTION               */}
        {/* ============================== */}
        <section style={{ padding: '0 30px', marginTop: '20px', maxWidth: '600px' }}>
          <h2 style={{ marginBottom: '5px' }}>Security</h2>
          <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
            Manage which devices can skip the verification code when logging in.
          </p>

          {message && (
            <p style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>{message}</p>
          )}
          {error && (
            <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</p>
          )}

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleRevokeCurrent}
              disabled={loading !== null}
              style={{
                background: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginRight: '10px'
              }}
            >
              {loading === 'current' ? 'Working...' : 'Forget this device'}
            </button>
            <div style={{ fontSize: '13px', color: '#888', marginTop: '6px' }}>
              Requires a verification code the next time you log in from this browser.
            </div>
          </div>

          <div>
            <button
              onClick={handleRevokeAll}
              disabled={loading !== null}
              style={{
                background: '#ff4d4d',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading === 'all' ? 'Working...' : 'Log out all devices'}
            </button>
            <div style={{ fontSize: '13px', color: '#888', marginTop: '6px' }}>
              Use this if you suspect your account was accessed from somewhere unfamiliar.
            </div>
          </div>
        </section>

        {/* ============================== */}
        {/* ACCOUNT SECTION                */}
        {/* ============================== */}
        <section style={{ padding: '0 30px', marginTop: '30px', maxWidth: '600px' }}>
          <h2 style={{ marginBottom: '15px' }}>Account</h2>
          <button
            onClick={handleLogout}
            style={{
              background: '#ff4d4d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}

export default SettingStaff;