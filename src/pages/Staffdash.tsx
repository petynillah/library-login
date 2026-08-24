import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.jpg";
import { getStaffById } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { APP_URLS } from '../Appurl';

// Explicit TypeScript Interface for the decoded payload structure
interface DecodedTokenUser {
  id: string | number;
  name: string;
  staff_id: string | number; 
  gender: string;
  role: string;
  is2FAVerified: boolean;
}

/**
 * Extracts and decodes the JWT token payload from LocalStorage safely.
 * Matches backend middleware authentication expectations.
 */
const getStaffInfoFromToken = (): DecodedTokenUser | null => {
  const token = localStorage.getItem('jwtToken'); 
  if (!token) return null;

  try {
    const pureToken = token.replace(/^(Bearer\s+)+/i, '').trim();
    const tokenParts = pureToken.split('.');
    if (tokenParts.length < 2) {
      console.warn("Token structure is not a valid 3-part JWT.");
      return null;
    }
    
    const base64Url = tokenParts[1]; 
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) { base64 += '='; }
    
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const decoded = JSON.parse(jsonPayload);

    return {
      id: decoded.id || decoded.staff_id || "",
      name: decoded.name || "Unknown User", 
      staff_id: decoded.staff_id || decoded.id || "N/A", 
      gender: decoded.gender || "N/A", 
      role: decoded.role || "user",         
      is2FAVerified: !!decoded.is2FAVerified 
    };
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

function Staffdash(): React.JSX.Element {
  const navigate = useNavigate(); // Hook for seamless SPA redirection
  
  const [currentStaff, setCurrentStaff] = useState<DecodedTokenUser>(() => {
    const tokenBackup = getStaffInfoFromToken();
    return tokenBackup || {
      id: "",
      name: "Guest User",
      staff_id: "000000",
      gender: "N/A",
      role: "Unauthorized",
      is2FAVerified: false
    };
  });
  
  const [sessionError, setSessionError] = useState<string | null>(null);

  // 🔄 BACKGROUND RE-SYNC: Pull absolute live metrics using centralized CRUD engine
  useEffect(() => {
    const syncStaffDatabaseData = async () => {
      const cachedTokenInfo = getStaffInfoFromToken();
      
      if (!cachedTokenInfo || !cachedTokenInfo.id) {
        setSessionError("Session expired. Please sign in.");
        navigate('/stafflogin');
        return;
      }

      try {
        const response = await getStaffById(cachedTokenInfo.id);
      
        if (response.success && response.data) {
          const dbData: any = response.data;
          
          setCurrentStaff(prevState => ({
            ...prevState,
            name: dbData.name || prevState.name,
            staff_id: dbData.staff_id || prevState.staff_id,
            gender: dbData.gender || prevState.gender,
            role: dbData.role || prevState.role
          }));
        } else {
          throw new Error(response.message || "Failed to load database content");
        }
      } catch (error) {
        console.warn("Database sync offline. Maintaining token cache UI configuration.", error);
      }
    };
      
    syncStaffDatabaseData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/stafflogin'); 
  };

  return (
    <div className="container">
      {/* Navigation Bar Header */}
      <div className='navbar'>
        <img src={logo} alt='logo' />
        <div className='list'>
          <ul>
            <li><span>{currentStaff.name}</span></li>
            <li><span>ID: {currentStaff.staff_id}</span></li>
            <li><span>{currentStaff.gender}</span></li>
            <li><span style={{ textTransform: 'capitalize' }}>{currentStaff.role}</span></li>
          </ul>
        </div>
        
        <div className='set'>
          <Link to="/settings" style={{ marginRight: '15px' }}>Settings</Link>
          <button onClick={handleLogout} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Panels */}
      <div className='dashboard'>
        <h1 className="head1">Staff Dashboard</h1>
        {sessionError && (
          <p style={{ color: 'red', paddingLeft: '30px' }}>
            ⚠️ Session Issue: {sessionError}
          </p>
        )}
        <p style={{ fontSize: '20px', color: 'black', textAlign: 'justify', paddingLeft: '30px' }}>
          <b>Welcome</b> <i>{currentStaff.name}</i>
        </p>
        
        <div className="cards">
          <a href={`${APP_URLS.staffDashboard}/dashboard/bookdash`}>books</a>
          <a href={`${APP_URLS.staffDashboard}/dashboard/addcategory`}>categories</a>
          <a href={`${APP_URLS.staffDashboard}/dashboard/borrowbook`}>borrow</a>
          <a href={`${APP_URLS.staffDashboard}/dashboard/addshelf`}>shelving</a>
          <a href={`${APP_URLS.staffDashboard}/dashboard/studentdash`}>students</a>
        </div>
      </div>
    </div>
  );
}

export default Staffdash;
