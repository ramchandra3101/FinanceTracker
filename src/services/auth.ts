// services/auth.ts
export const fetchUser = () => {
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) return null;
      
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };