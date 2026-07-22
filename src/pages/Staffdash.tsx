import React from 'react';
import logo from "../assets/logo.jpg";

interface DecodedTokenUser {
    name: string;
    staff_Id: string | number;
    gender: string;
    role: string;
}

const getStaffInfoFromToken = (): DecodedTokenUser | null => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const decoded = JSON.parse(jsonPayload);
        // Inside Staffdash.tsx, this helper maps directly to your signed token:
        return {
            name: decoded.name,     // Displays real staff name instead of "Anna"
            staff_Id: decoded.id,    // Displays "STF-2026-X" instead of "345678"
            gender: decoded.gender,  // Displays real gender instead of "Female"
            role: decoded.role       // Displays "staff" instead of hardcoded "librarian"
        };

    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
    }
};

function Staffdash(): React.JSX.Element {
    const staff = getStaffInfoFromToken();
    const token = localStorage.getItem('jwtToken') || '';

    const currentStaff: DecodedTokenUser = staff || {
        name: "Guest User",
        staff_Id: "000000",
        gender: "N/A",
        role: "Unauthorized"
    };

    // Appending the token to the URL so the receiving port can grab it
    const buildSecureUrl = (baseUrl: string): string => {
        if (!token) return baseUrl;
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}token=${encodeURIComponent(token)}`;
    };

    return (
        <>
            <div className="container">
                <div className='navbar'>
                    <img src={logo} alt='logo' />
                    <div className='list'>
                        <ul>
                            <li><span>{currentStaff.name}</span></li>
                            <li><span>{currentStaff.staff_Id}</span></li>
                            <li><span>{currentStaff.gender}</span></li>
                            <li><span style={{ textTransform: 'capitalize' }}>{currentStaff.role}</span></li>                           
                        </ul>
                    </div>
                    <div className='set'>
                        {/* Assuming Settings stays on the same port app */}
                        <a href="/settings">Settings</a>
                    </div>
                </div>

                <div className='dashboard'>
                    <h1 className="head1">Staff Dashboard</h1>
                    <p style={{ fontSize: '20px', color: 'black', textAlign: 'justify', paddingLeft: '30px' }}>
                        <b>Welcome</b> <i>{currentStaff.name}</i>
                    </p>
                    <div className="cards">
                        {/* Append tokens dynamically to cross-port URLs */}
                        <a href={buildSecureUrl('https://library-dashboard-zeta.vercel.app/bookdash')}>books</a>
                        <a href={buildSecureUrl('https://library-dashboard-zeta.vercel.app/addcategory')}>categories</a>
                        <a href={buildSecureUrl('https://library-dashboard-zeta.vercel.app/borrowbook')}>borrow</a>
                        <a href={buildSecureUrl('https://library-dashboard-zeta.vercel.app/addshelf')}>shelving</a>
                        <a href={buildSecureUrl('https://library-dashboard-zeta.vercel.app/studentdash')}>students</a>
                    
                    </div>
                </div>
            </div>
        </>
    );
}

export default Staffdash;
