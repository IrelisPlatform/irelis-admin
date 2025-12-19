
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import {useRouter} from "next/navigation";
import api from "@/services/axiosClient";
import Cookies from "js-cookie";



interface User{
    email: string;
    role: string;
}

export default function AdminUserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user,setUser] = useState<User|null>(null)
    const router = useRouter();
    const token = Cookies.get("access_token");

    // const fetchUser = async () => {
    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/otp/user`, {
    //             method: "GET",
    //             credentials: "include",
    //         });
    //
    //         if (!response.ok) throw new Error("Erreur récupération utilisateur");
    //
    //         const data = await response.json();
    //         setUser(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const fetchUser = async () => {
    //     try {
    //         const { data } = await api.get("/auth/otp/user");
    //         setUser(data);
    //     } catch (err) {
    //         console.error("Erreur lors de la récupération de l'utilisateur :", err);
    //     }
    // };
    const fetchUser = async () => {
        try {
            const { data } = await api.get("/auth/otp/user",{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUser(data);
        } catch (err) {
            console.error("Erreur lors de la récupération de l'utilisateur :", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // const logout = async () => {
    //     try {
    //         await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/otp/logout`, {
    //             method: "POST",
    //             credentials: "include"
    //         });
    //     } catch (err) {
    //         console.error("Erreur lors de la déconnexion", err);
    //     }
    //     setUser(null);
    //     router.push("/admin/login");
    // };

    const logout = () => {

        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_email");
            localStorage.removeItem("auth_role");
            localStorage.removeItem("auth_returnTo");
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            Cookies.remove("admin_session");
        }
        setUser(null);
        router.push("/admin/login");
    };




    return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="rounded-full"
      >
        <User className="h-5 w-5" />
      </Button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
          <div className="p-4 border-b">
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}