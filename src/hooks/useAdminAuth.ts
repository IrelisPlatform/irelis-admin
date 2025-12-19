// // src/hooks/useAdminAuth.ts
// // BUT : Gérer l’authentification admin de façon sécurisée et réactive
// // POURQUOI : Séparer la logique d’auth de l’UI, gérer loading/error, éviter les fuites de token
//
// 'use client'; // Obligatoire pour utiliser useState/useEffect dans Next.js App Router
//
// import {useState} from 'react';
//
// // 1. Importe la fonction centralisée
// import {apiRequest} from '@/lib/api/client';
//
// // 2. Définis les types attendus (d’après Swagger)
// type AdminLoginPayload = {
//   email: string;
//   password: string;
// };
//
// type AdminLoginResponse = {
//   accessToken: string;
//   tokenType: string;
// };
//
// export function useAdminAuth() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   const login = async (credentials: AdminLoginPayload) => {
//     setLoading(true);
//     setError(null);
//     try {
//         // localStorage.setItem("adminEmail", credentials.email);
//       // localStorage.setItem('accessToken', data.accessToken);
//       // localStorage.setItem('auth_role', ADMIN_ROLE);
//
//       return await apiRequest<AdminLoginResponse>('/admin/auth/login', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//       });
//     } catch (err: any) {
//       setError(err.message || 'Échec de la connexion');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('auth_role');
//   };
//
//   const getAuthToken = () => {
//     if (typeof window === 'undefined') return null;
//     return localStorage.getItem('accessToken');
//   };
//
//
//   return {
//     login,
//     logout,
//     getAuthToken,
//     loading,
//     error,
//   };
// }