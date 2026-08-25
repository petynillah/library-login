import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.jpg";
import { getStudentById } from '../api'; 
import { Link, useNavigate } from 'react-router-dom'; 
//import { APP_URLS } from '../Appurl';

interface DecodedTokenUser {
  id: string | number;         
  student_id: string | number; 
  role: string;
  is2FAVerified: boolean;
  name: string;
  gender: string;
  paymentStatus: string;
  borrowedCount: number;
}

const getStudentInfoFromToken = (): DecodedTokenUser | null => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;
  try {
    // Strips out any accidental repetitive Bearer strings safely
    const pureToken = token.replace(/^(Bearer\s+)+/i, '').trim();
    const tokenParts = pureToken.split('.');
    if (tokenParts.length < 2) return null;
    
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
      id: decoded.id || "",
      student_id: decoded.student_id || "STU-XXXX", 
      role: decoded.role || "student",
      is2FAVerified: !!decoded.is2FAVerified,
      name: decoded.name || "Student Profile", 
      gender: decoded.gender || "N/A",
      paymentStatus: decoded.paymentStatus || "Checking...",
      borrowedCount: decoded.borrowedCount ?? 0
    };
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};

function Studentdash(): React.JSX.Element {
  const navigate = useNavigate(); // Hook for smooth non-reloading redirects
  
  const [currentStudent, setCurrentStudent] = useState<DecodedTokenUser>(() => {
    const tokenBackup = getStudentInfoFromToken();
    return tokenBackup || {
      id: "",
      student_id: "000000",
      name: "Guest Student",
      gender: "N/A",
      role: "student",
      is2FAVerified: false,
      paymentStatus: "N/A",
      borrowedCount: 0
    };
  });

  
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    const syncStudentDatabaseData = async () => {
      const cachedTokenInfo = getStudentInfoFromToken();
      if (!cachedTokenInfo || !cachedTokenInfo.id) {
        setSessionError("Session expired. Please sign in.");
        navigate('/studentlogin');
        return;
      }

      try {
        const response = await getStudentById(cachedTokenInfo.id);

        if (response.success && response.data) {
          const dbData: any = response.data;
          
          setCurrentStudent(prevState => ({
            ...prevState,
            name: dbData.name || prevState.name,
            student_id: dbData.student_id || prevState.student_id,
            gender: dbData.gender || prevState.gender,
            role: dbData.role || prevState.role,
            paymentStatus: dbData.paymentStatus || "Unpaid", 
            borrowedCount: dbData.borrowedCount ?? 0 
          }));
        } else {
          throw new Error(response.message || "Failed to load database content");
        }
      } catch (error) {
        console.warn("Database sync offline. Maintaining token cache UI configuration.", error);
      }
    };

    syncStudentDatabaseData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/studentlogin'); 
  };
  const activeToken = localStorage.getItem('jwtToken') || '';
const tokenParam = `?token=${encodeURIComponent(activeToken)}`;

const cleanBaseRoute = "https://vercel.app";

  return (
    <div className="container">
      {/* Navigation Bar Header */}
      <div className='navbar'>
        <img src={logo} alt='logo' />
        <div className='list'>
          <ul>
            <li><span>{currentStudent.name}</span></li>
            <li><span>{currentStudent.student_id}</span></li> 
            <li><span>{currentStudent.gender}</span></li>
            <li><span style={{ textTransform: 'capitalize' }}>{currentStudent.role}</span></li>
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
        <h1 className="head1">Student Dashboard</h1>
        {sessionError && (
          <p style={{ color: 'red', paddingLeft: '30px' }}>
            ⚠️ Session Issue: {sessionError}
          </p>
        )}
        <p style={{ fontSize: '20px', color: 'black', textAlign: 'justify', paddingLeft: '30px' }}>
          <b>Welcome</b> <i>{currentStudent.name}</i>
        </p>
        
           <div className="cards">
    {/* This generates: https://vercel.app/availablebk?token=... */}
    
    <a href={`${cleanBaseRoute}/availablebk${tokenParam}`} style={{ width:'50%' }}>
      check if a book exists
    </a>
    
    <a href={`${cleanBaseRoute}/allbooks${tokenParam}`}>
      All books
    </a>
    
    <a href={`${cleanBaseRoute}/borrowedbk${tokenParam}`}> 
      borrowed ({currentStudent.borrowedCount}) 
    </a>
    
    <a href={`${cleanBaseRoute}/allbooks${tokenParam}`}>
      read status
    </a>
    
    <a href={`${cleanBaseRoute}/payments${tokenParam}`}> 
      payment: <span style={{ textTransform: 'uppercase' }}>{currentStudent.paymentStatus}</span> 
    </a>
  </div>
      </div>
    </div>
  );
}

export default Studentdash;
