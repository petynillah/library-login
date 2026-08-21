import React, { useState } from "react"; // Fixed: Added explicit React import for TS validation
import { registerStudent } from "../api";
import { Link, useNavigate } from "react-router-dom";

function Studentregister() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    education_level: '',
    institution_name: '',
    password: '' 
  });
  
  const navigate = useNavigate();
  const [successId, setSuccessId] = useState(''); // Holds the ID on success
  const [errors, setErrors] = useState<string[]>([]); // Added: Tracks missing fields for red highlights

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear red highlights dynamically as the student types
    if (errors.includes(name)) {
      setErrors(errors.filter(field => field !== name));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessId('');
    setErrors([]);

    const result = await registerStudent(formData);

    if (result.success && result.student_id) {
      setSuccessId(result.student_id);
      
      // 1. Alert user of their automatic account creation details
      alert(`Registration successful!\nYour generated Student ID is: ${result.student_id}\n\nClick OK to go to the Login Page.`);
      
      // 2. Redirect immediately to the student login route handled by Nginx
      navigate('/studentlogin');
    } else {
      // Catch backend's dynamic field checklist validation
      if (result.missingFields) {
        setErrors(result.missingFields);
      }
      alert(result.message || 'Something went wrong.');
    }
  };

  // Style injector for validation alerts
  const getInputStyle = (fieldName: string) => {
    return errors.includes(fieldName) ? { border: '1px solid #ef4444', backgroundColor: '#fef2f2' } : {};
  };

  return (
    <div className="portal-container">
      <h1 className="register-title">Student registration portal</h1>
      
      {/* Visual notification box for the new ID */}
      {successId && (
        <div style={{ background: '#d1fae5', color: '#065f46', padding: '15px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>
          Registration Complete! Your Login ID is: {successId}
        </div>
      )}

      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-input" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={getInputStyle('name')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select 
              name="gender" 
              className="form-input" 
              value={formData.gender} 
              onChange={handleChange} 
              required
              style={getInputStyle('gender')}
            >
              <option value="" disabled></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input 
              type="number" 
              name="age" 
              className="form-input" 
              value={formData.age} 
              onChange={handleChange} 
              required 
              style={getInputStyle('age')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Education level</label>
            <select 
              name="education_level" 
              className="form-input" 
              value={formData.education_level} 
              onChange={handleChange} 
              required
              style={getInputStyle('education_level')}
            >
              <option value="" disabled></option>
              <option value="Junior school">Junior school</option>
              <option value="Senior school">Senior school</option>
              <option value="University">University</option>
              <option value="College">College</option>
              <option value="Working">Working</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">School/Institution name</label>
            <input 
              type="text" 
              name="institution_name" 
              className="form-input" 
              value={formData.institution_name} 
              onChange={handleChange} 
              autoComplete="off"    
              required 
              style={getInputStyle('institution_name')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-input" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="Create account password" 
              autoComplete="New password"    
              style={getInputStyle('password')}
            />
          </div>

          <div className="button-container">
            <button type="submit" className="login-btn" >
              Register
            </button>
          </div>
        </form>
      </div>

      <span className="register-links">
        Already have an account? <Link to="/studentlogin" className="link-blue">Login</Link>
      </span>

      <footer className="portal-footer">
        mombasa county library &copy;2026
      </footer>
    </div>
  );
}

export default Studentregister;
