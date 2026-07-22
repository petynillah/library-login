import { registerStaff } from "../api";
import { useState } from "react";

function Staffregister() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        age: '',
        id_number: '',
        occupation: '',
        password: '' // Required for backend security hashing
    });

    const [successId, setSuccessId] = useState(''); // Holds generated staff_id on success
    const [errors, setErrors] = useState<string[]>([]); // Tracks missing fields for red highlights

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear red highlights dynamically as the user types
        if (errors.includes(name)) {
            setErrors(errors.filter(field => field !== name));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessId(''); 
        setErrors([]);

        const result = await registerStaff(formData);
        
        if (result.success && result.staff_id) {
            setSuccessId(result.staff_id);
            alert(`Registration successful! Your generated Staff ID is: ${result.staff_id}\nUse this ID to log in.`);
            
            // Clear fields cleanly after a successful save
            setFormData({ name: '', gender: '', age: '', id_number: '', occupation: '', password: '' });
        } else {
            // Pick up backend's dynamic field missing array checklist
            if (result.missingFields) {
                setErrors(result.missingFields);
            }
            alert(result.message || 'Something went wrong.');
        }
    };

    // Style injector for validation alerts
    const getInputStyle = (fieldName: string) => {
        return errors.includes(fieldName) 
            ? { border: '1px solid #ef4444', backgroundColor: '#fef2f2' } 
            : {};
    };

    return (
        <div className="portal-container">
            <h1 className="register-title">Staff registration portal</h1>
            
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
                        <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required style={getInputStyle('name')} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <select name="gender" className="form-input" value={formData.gender} onChange={handleChange} required style={getInputStyle('gender')}>
                            <option value="" disabled className="hidden-placeholder"></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input type="number" name="age" inputMode="numeric" pattern="[0-9]" className="form-input" value={formData.age} onChange={handleChange} required style={getInputStyle('age')} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">ID number</label>
                        <input type="number" name="id_number" inputMode="numeric" pattern="[0-9]" className="form-input" value={formData.id_number} onChange={handleChange} required style={getInputStyle('id_number')} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Occupation</label>
                        <input type="text" name="occupation" className="form-input" value={formData.occupation} onChange={handleChange} required style={getInputStyle('occupation')} />
                    </div>

                    {/* NEW INPUT: Added to supply your staffController password hashing dependency */}
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-input" placeholder="Create account password" value={formData.password} onChange={handleChange} required style={getInputStyle('password')} />
                    </div>

                    {/* FIXED: Swapped <a> tag to button element to properly fire onSubmit validation */}
                    <div className="button-container">
                        <button type="submit" className="login-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', width: '100%' }}>Register</button>
                    </div>
                </form>
            </div>

            <span className="register-links">
                Already have an account?<a href="/stafflogin" className="link-blue" target="_blank">Login</a>
            </span>

            <footer className="portal-footer">
                mombasa county library &copy;2026
            </footer>
        </div>
    )
}

export default Staffregister;
