import { loginStudent } from "../api";
import { useState } from "react";

function Studentlogin(){

  // Create boxes to hold typing information
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // This function runs when the student clicks the login button
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the webpage from refreshing automatically
    setErrorMessage(''); // Reset any old errors

    // Simple check to make sure they didn't leave inputs blank
    if (!studentId || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Call the network function from api.ts
    const response = await loginStudent({ student_id: studentId, password });

    if (response.success && response.token) {
      // Save the secret authorization token in the browser storage
      localStorage.setItem('token', response.token);
      
      // Redirect the user to their student dashboard
      window.location.href = '/studentdash';
    } else {
      // If the backend says no, show the error message on screen
      setErrorMessage(response.message || 'Login failed');
    }
  };

    return(
        
    <div className="portal-container">
      {/* Title */}
      <h1 className="portal-title">Student Login Portal</h1>

      {/* Main Login Box */}
      <form onSubmit={handleLogin} className="login-box">
             {/* Error Notification Alert */}
        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
            {errorMessage}
          </p>
        )}
         
          {/* Student ID Row */}
          <div className="form-group">
            <label className="form-label">student id</label>
            <input 
                type="text" 
                className="form-input" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)} // Update value as they type
          />
          </div>

          {/* Password Row */}
          <div className="form-group">
            <label className="form-label">password</label>
            <input 
                type="password" 
                className="form-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update value as they type
          />
          </div>

          {/* Login Button */}
          <div className="button-container">
          <button type="submit" className="login-btn" 
                  style={{ width: '100%', cursor: 'pointer' }}>
                  login
          </button>

        </div>
      </form>

      {/* Action Links */}
      <div className="portal-links">
        <a href="#forgot" className="link-blue">forgot password?</a>
        <span className="text-gray">
          first time login? <a href="/studentregister" className="link-blue" target="_blank">register</a>
        </span>
      </div>

      {/* Footer Area */}
      <footer className="portal-footer">
        mombasa county library &copy;2026
      </footer>
    </div>
    )
}
export default Studentlogin