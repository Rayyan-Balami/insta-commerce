import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "@/appwrite/auth";
import { logout } from "@/store/authSlice";
import AlertDialog from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function UserMenu() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      const response = await AuthService.logout();
      if (response.success) {
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('products');
        localStorage.removeItem('products_timestamp');
        
        // Dispatch the logout action
        dispatch(logout());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0">
          <User className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/setting">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <AlertDialog
            title="Logout Confirmation"
            description="This action will log you out of the application. Are you sure you want to proceed?"
            size="sm"
            acceptLabel="Logout"
            onAccept={handleLogout}
            triggerLabel="Logout"
            className="w-full h-full border-none justify-start ring-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;