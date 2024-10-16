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
import { Badge } from "../ui/badge";
import { login } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function GoogleLogin() {
  const [loading, setLoading] = useState(false);

  const handleOAuthLogin = async () => {
    setLoading(true); // Set loading to true when login starts
    try {
      const { success } = await AuthService.oAuthLogin();
      if (success) {
        console.log("Redirecting for OAuth...");
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full md:bg-secondary md:text-secondary-foreground md:hover:bg-secondary/80 md:px-3  md:justify-start md:w-fit md:gap-2"
      onClick={handleOAuthLogin}
      disabled={loading}
    >
      {/* //google svg  */}
      <svg
        viewBox="-0.5 0 48 48"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="#000000"
        className={`size-5 shrink-0 ${loading ? "animate-pulse" : ""}`}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <title>Google-color</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Color-" transform="translate(-401.000000, -860.000000)">
              <g id="Google" transform="translate(401.000000, 860.000000)">
                <path
                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  id="Fill-1"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  id="Fill-2"
                  fill="#EB4335"
                ></path>
                <path
                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  id="Fill-3"
                  fill="#34A853"
                ></path>
                <path
                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  id="Fill-4"
                  fill="#4285F4"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <span className="max-md:sr-only">Google Login</span>
    </Button>
  );
}

function UserMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await AuthService.logout();
      if (response.success) {
        // Clear local storage
        localStorage.removeItem("user");
        localStorage.removeItem("products");
        localStorage.removeItem("products_timestamp");

        // Dispatch the logout action
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed. Try again later.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
        >
          <div className="rounded-full size-9 flex items-center justify-center bg-secondary">
            {imageError ? (
              <span className="text-xl font-bold">{user.name.charAt(0)}</span>
            ) : (
              <img
                src={user.profile.picture}
                className="rounded-full h-full w-full object-cover object-center"
                alt={user.name}
                onError={() => setImageError(true)}
              />
            )}
          </div>
          {user.labels.includes("admin") ? (
            <Badge className="absolute -top-1 -right-2 p-0.5 text-[0.6rem] size-5 justify-center">
              AD
            </Badge>
          ) : (
            ""
          )}
          <span className="sr-only">User Menu</span>
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
            disabled={loading}
            triggerLabel="Logout"
            className="w-full h-full border-none justify-start ring-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function LoginAndMenu() {
  const user = useSelector((state) => state.auth.user);

  return <>{user ? <UserMenu user={user} /> : <GoogleLogin />}</>;
}
