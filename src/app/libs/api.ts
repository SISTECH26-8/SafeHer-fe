const API_URL = "https://safeher-be.onrender.com/api/v1";

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response.json();
};

export const login = async (data: LoginRequest) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};

export const getCurrentUser = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user");
  }

  return response.json();
};