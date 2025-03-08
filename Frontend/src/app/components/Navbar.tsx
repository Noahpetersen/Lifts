import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const [isHomePage, setIsHomePage] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location]);

  const handleBack = () => {
    navigate(-1); // Navigate to previous page
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky bg-[var(--background)] top-0 z-50shadow-md p-4 flex justify-between items-center border-b-1 z-100">
      {!isHomePage && <Button variant="outline" onClick={handleBack} className="cursor-pointer">Back</Button>}
      
      <div className="flex-grow"></div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.png" alt="User" className="cursor-pointer"/>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex flex-col items-center gap-2">
            <NavLink to={"/create"} className="cursor-pointer">
                Create Session
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="flex flex-col items-center gap-2 border-t-1">
            <p className="cursor-pointer ">
                Logout
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </nav>
  );
};

export default Navbar;
