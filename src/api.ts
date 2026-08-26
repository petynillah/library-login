
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ==========================================
// 1. DATA TYPES & BLUEPRINTS (EXPORTED)
// ==========================================
export interface AuthResponse {
  success: boolean;
  token?: string;
  role?: string;
  message?: string;
  student_id?: string;
  staff_id?: string;
  missingFields?: string[];
  requires2FA?: boolean;   // <-- ADD THIS
}

export interface StaffVerify2FAData {   // <-- ADD THIS
  otp: string;
}

export interface StudentLoginData {
  student_id: string;
  password: string;
}

export interface StaffLoginData {
  staff_id: string;
  password: string;
}

export interface StudentRegisterData {
  name: string;
  gender: string;
  age: string | number;
  education_level: string;
  institution_name: string;
  password?: string; 
}

export interface StaffRegisterData {
  name: string;
  gender: string;
  age: string | number;
  id_number: string | number;
  occupation: string;
  password?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// ==========================================
// 2. AUTHENTICATED FETCH WRAPPER ENGINE
// ==========================================
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('jwtToken'); 

  let cleanToken = token ? token.trim() : '';
  if (cleanToken.toLowerCase().startsWith('bearer ')) {
    cleanToken = cleanToken.substring(7).trim();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(cleanToken ? { 'Authorization': `Bearer ${cleanToken}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers, credentials: 'include' });

    if (response.status === 401 || response.status === 403) {
      const clonedResponse = response.clone();
      try {
        const data = await clonedResponse.json();
        if (data.code === 'TOKEN_EXPIRED') {
          localStorage.removeItem('jwtToken');
          window.location.href = '/login/studentlogin';
        }
      } catch (e) {
        console.warn("Failed to parse error intercept body structural payload", e);
      }
    }
    return response;
  } catch (error) {
    console.error('Network Error:', error);
    throw error;
  }
};

// ==========================================
// 3. STUDENT NETWORK API REQUESTS
// ==========================================
export const loginStudent = async (data: StudentLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Student API Connection Error:', error);
    return { success: false, message: 'Could not connect to the server.' };
  }
};

export const registerStudent = async (data: StudentRegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Student Registration API Error:', error);
    return { success: false, message: 'Could not connect to the server.' };
  }
};

// ==========================================
// 4. STAFF NETWORK API REQUESTS
// ==========================================

export const registerStaff = async (data: StaffRegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Staff Registration API Error:', error);
    return { success: false, message: 'Could not connect to the server.' };
  }
};

export const loginStaff = async (data: StaffLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/login`, {
      method: 'POST',
      credentials: 'include', // ADD THIS
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Staff API Connection Error:', error);
    return { success: false, message: 'Could not connect to the server.' };
  }
};

export const verifyStaff2FA = async (tempToken: string, data: StaffVerify2FAData): Promise<AuthResponse> => {
  // 💡 THE FIX: Safely parse and strip any pre-existing Bearer tags sent by the frontend
  let cleanToken = tempToken ? tempToken.trim() : '';
  if (cleanToken.toLowerCase().startsWith('bearer ')) {
    cleanToken = cleanToken.substring(7).trim();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/staff/verify-2fa`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken}`, // Now perfectly formatted with exactly ONE Bearer!
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Staff 2FA Verification Error:', error);
    return { success: false, message: 'Could not connect to the server.' };
  }
};


export const revokeAllTrustedDevices = async (): Promise<AuthResponse> => {
  try {
    const response = await fetchWithAuth('/staff/revoke-all-devices', {
      method: 'POST',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Revoke All Devices Error:', error);
    return { success: false, message: 'Failed to revoke devices.' };
  }
};

export const revokeCurrentDevice = async (): Promise<AuthResponse> => {
  try {
    const response = await fetchWithAuth('/staff/revoke-current-device', {
      method: 'POST',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Revoke Current Device Error:', error);
    return { success: false, message: 'Failed to revoke this device.' };
  }
};
// ==========================================
// 5. STUDENT CRUD ENDPOINTS
// ==========================================

// FIX: Added /all path parameter suffix to match updated backend routes
export const getAllStudents = async (): Promise<ApiResponse<StudentRegisterData[]>> => {
  try {
    const response = await fetchWithAuth('/student/all');
    return await response.json();
  } catch (error) {
    console.error('Fetch All Students Error:', error);
    return { success: false, message: 'Failed to fetch student directories.' };
  }
};

export const getStudentById = async (id: string | number): Promise<ApiResponse<StudentRegisterData>> => {
  try {
    const response = await fetchWithAuth(`/student/${id}`);
    
    if (!response.ok) {
      const errData = await response.json();
      return { success: false, message: errData.message || 'Server error occurred.' };
    }

    return await response.json(); 
  } catch (error) {
    console.error('Fetch Student By ID Error:', error);
    return { success: false, message: 'Failed to find student profile records.' };
  }
};

export const updateStudent = async (id: string | number, data: Partial<StudentRegisterData>): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchWithAuth(`/student/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Update Student Profile Error:', error);
    return { success: false, message: 'Failed to execute profile edits.' };
  }
};

export const deleteStudent = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchWithAuth(`/student/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Delete Student Profile Error:', error);
    return { success: false, message: 'Failed to remove student record profile.' };
  }
};

// ==========================================
// 6. STAFF CRUD ENDPOINTS
// ==========================================

// FIX: Added /all path parameter suffix to match updated backend routes
export const getAllStaff = async (): Promise<ApiResponse<StaffRegisterData[]>> => {
  try {
    const response = await fetchWithAuth('/staff/all');
    return await response.json();
  } catch (error) {
    console.error('Fetch All Staff Error:', error);
    return { success: false, message: 'Failed to load staff list listings.' };
  }
};

export const getStaffById = async (id: string | number): Promise<ApiResponse<StaffRegisterData>> => {
  try {
    const response = await fetchWithAuth(`/staff/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch Staff By ID Error:', error);
    return { success: false, message: 'Failed to extract specific staff entry profile.' };
  }
};

// FIX: Completed cut-off method layout block cleanly
export const updateStaff = async (id: string | number, data: Partial<StaffRegisterData>): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchWithAuth(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Update Staff Profile Error:', error);
    return { success: false, message: 'Failed to execute staff profile updates.' };
  }
};

// FIX: Added missing deleteStaff declaration block to complement routes
export const deleteStaff = async (id: string | number): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchWithAuth(`/staff/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Delete Staff Profile Error:', error);
    return { success: false, message: 'Failed to remove staff record profile securely.' };
  }
};
