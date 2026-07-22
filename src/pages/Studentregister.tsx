import { registerStudent } from "../api";
import { useState } from "react";

function Studentregister() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        age: '',
        education_level: '',
        institution_name: '',
        password: '' // Added missing input state link
    });

    const [successId, setSuccessId] = useState(''); // Holds the ID on success

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessId(''); 

        const result = await registerStudent(formData);
        
        if (result.success && result.student_id) {
            setSuccessId(result.student_id);
            alert(`Registration successful! Your generated Student ID is: ${result.student_id}\nUse this ID to log in.`);
            
            // Optional: Reset form fields cleanly after registration
            setFormData({ name: '', gender: '', age: '', education_level: '', institution_name: '', password: '' });
        } else {
            alert(result.message || 'Something went wrong.');
        }
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
                        <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <select name="gender" className="form-input" value={formData.gender} onChange={handleChange} required>
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input type="number" name="age" className="form-input" value={formData.age} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Education level</label>
                        <select name="education_level" className="form-input" value={formData.education_level} onChange={handleChange} required>
                            <option value=""></option>
                            <option value="Junior school">Junior school</option>
                            <option value="Senior school">Senior school</option>
                            <option value="University">University</option>
                            <option value="College">College</option>
                            <option value="Working">Working</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">School/Institution name</label>
                        <input type="text" name="institution_name" className="form-input" value={formData.institution_name} onChange={handleChange} required />
                    </div>

                    {/* NEW INPUT: The student must type a password to complete registration */}
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} required placeholder="Create account password" />
                    </div>
                
                    {/* FIXED: Removed the <a> tag layout wrapper which interfered with type="submit" execution */}
                    <div className="button-container">
                        <button type="submit" className="submit-btn-style">Register</button>
                    </div>
                </form>
            </div>

            <span className="register-links">
                Already have an account? <a href="/studentlogin" className="link-blue">Login</a>
            </span>

            <footer className="portal-footer">
                mombasa county library &copy;2026
            </footer>
        </div>
    );
}

export default Studentregister;
