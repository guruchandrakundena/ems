/**
 * API Client for HR Management System
 * Provides methods to interact with the FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Token management
let authToken: string | null = null;

if (typeof window !== "undefined") {
  authToken = localStorage.getItem("authToken");
}

export function setAuthToken(token: string | null) {
  authToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }
}

export function getAuthToken(): string | null {
  return authToken;
}

// Base fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: "An error occurred",
    }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

// Authentication API
export const authApi = {
  async login(email: string, password: string) {
    const response = await apiFetch<{ access_token: string; token_type: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
    setAuthToken(response.access_token);
    return response;
  },

  async register(data: {
    email: string;
    password: string;
    full_name?: string;
  }) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout() {
    setAuthToken(null);
  },
};

// Employee API
export const employeeApi = {
  async getAll() {
    return apiFetch<any[]>("/employees");
  },

  async getById(id: number) {
    return apiFetch<any>(`/employees/${id}`);
  },

  async create(data: any) {
    return apiFetch("/employees", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: any) {
    return apiFetch(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: number) {
    return apiFetch(`/employees/${id}`, {
      method: "DELETE",
    });
  },
};

// Client API
export const clientApi = {
  async getAll() {
    return apiFetch<any[]>("/clients");
  },

  async getById(id: number) {
    return apiFetch<any>(`/clients/${id}`);
  },

  async create(data: any) {
    return apiFetch("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: any) {
    return apiFetch(`/clients/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: number) {
    return apiFetch(`/clients/${id}`, {
      method: "DELETE",
    });
  },
};

// Project API
export const projectApi = {
  async getAll() {
    return apiFetch<any[]>("/projects");
  },

  async getById(id: number) {
    return apiFetch<any>(`/projects/${id}`);
  },

  async create(data: any) {
    return apiFetch("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: any) {
    return apiFetch(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: number) {
    return apiFetch(`/projects/${id}`, {
      method: "DELETE",
    });
  },
};

// Onboarding API
export const onboardingApi = {
  async getAll() {
    return apiFetch<any[]>("/onboarding");
  },

  async getById(id: number) {
    return apiFetch<any>(`/onboarding/${id}`);
  },

  async create(data: any) {
    return apiFetch("/onboarding", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: any) {
    return apiFetch(`/onboarding/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: number) {
    return apiFetch(`/onboarding/${id}`, {
      method: "DELETE",
    });
  },
};

// User API
export const userApi = {
  async getCurrentUser() {
    return apiFetch<any>("/users/me");
  },

  async getAll() {
    return apiFetch<any[]>("/users");
  },

  async getById(id: number) {
    return apiFetch<any>(`/users/${id}`);
  },

  async update(id: number, data: any) {
    return apiFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: number) {
    return apiFetch(`/users/${id}`, {
      method: "DELETE",
    });
  },
};
