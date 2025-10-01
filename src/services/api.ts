import axios, { AxiosError } from 'axios';
import { SiteContent } from '../types/content';

const API_BASE_URL = 'http://localhost:3001/api'; // Update with your backend URL

// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For sending cookies with requests
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API response type for content operations
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export const contentApi = {
  /**
   * Fetches the current site content
   * @returns Promise with the site content
   */
  getContent: async (): Promise<SiteContent> => {
    try {
      const response = await api.get<ApiResponse<SiteContent>>('/content');
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error('Error fetching content:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Failed to fetch content');
    }
  },

  /**
   * Updates the site content
   * @param data The updated content
   * @returns Promise with the updated content
   */
  updateContent: async (data: Partial<SiteContent>): Promise<SiteContent> => {
    try {
      const response = await api.put<ApiResponse<SiteContent>>('/content', data);
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error('Error updating content:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Failed to update content');
    }
  },

  /**
   * Uploads a file to the server
   * @param file The file to upload
   * @param type The type of file (image, document, etc.)
   * @returns Promise with the file URL
   */
  uploadFile: async (file: File, type: string = 'image'): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await api.post<ApiResponse<{ url: string }>>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error('Error uploading file:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Failed to upload file');
    }
  },
};

export default api;
