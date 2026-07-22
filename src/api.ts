const API_BASE_URL = 'http://localhost:8080';

// ==========================================
// 1. DATA TYPES & BLUEPRINTS (EXPORTED)
// ==========================================

export interface AuthResponse {
  success: boolean;
  token?: string;
  role?: string;
  message?: string;
  student_id?: string;    // Safely captures system-generated ID for students
  staff_id?: string;      // FIXED: Safely captures system-generated ID for staff
  missingFields?: string[]; // FIXED: Allows frontend to capture the array of missing fields for red borders
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
  password: string; 
}

// FIXED: Remapped fields to perfectly match your staff registration form data inputs
export interface StaffRegisterData {
  name: string;
  gender: string;
  age: string | number;
  id_number: string | number;
  occupation: string;
  password: string;
}

// ==========================================
// 2. STUDENT NETWORK API REQUESTS
// ==========================================

export const loginStudent = async (data: StudentLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/student/login`, {
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
    const response = await fetch(`${API_BASE_URL}/api/student/register`, {
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
// 3. STAFF NETWORK API REQUESTS
// ==========================================

export const loginStaff = async (data: StaffLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/staff/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Staff API Connection Error:', error);
    return { success: false, message: 'Could not connect to the server.' };
  }
};

export const registerStaff = async (data: StaffRegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/staff/register`, {
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
