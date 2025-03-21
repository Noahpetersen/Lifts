import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
    user: string | null;
    isLoading: boolean;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function checkSession() {
    try {
        const res = await fetch("/api/check-session", {
            method: "GET",
            credentials: "include", // ✅ Ensures cookies are sent
        });

        if (!res.ok) throw new Error("Failed to fetch session");

        const data = await res.json();
        return data.user || null;  // ✅ Return user properly
    } catch (error) {
        return null; // ✅ Return null only in case of an error
    }
}

const AuthProvider = ({children} : {children: ReactNode}) => {
    const [user, setUser] = useState<string | null>( null)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSession = async () => {
            const user = await checkSession();
            setUser(user); 
            setIsLoading(false);
        };

        fetchSession();
    }, []);

    const login = (username: string) => {
        setUser(username)
    };

    const logout = async () => {
        const response = await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            setUser(null);
        } else {
            toast("Logout went wrong, try again.");
        }
    };
    

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}   
    </AuthContext.Provider> 
  )
}

export default AuthProvider;

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}