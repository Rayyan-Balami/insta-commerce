import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { toast } from "sonner";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import { Loader, House, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OAuthCheckPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthFailed, setIsAuthFailed] = useState(false);

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        const { success, user, session } = await AuthService.getCurrentUser();
        if (success) {
          const googleProfile = await fetchGoogleUserProfile(
            session.providerAccessToken
          );
          user.profile = googleProfile;
          dispatch(login(user));
          localStorage.setItem("user", JSON.stringify(user));
          toast.success(`Welcome back, ${user.name}`);
          navigate("/");
        } else {
          setIsAuthFailed(true);
        }
      } catch (error) {
        console.error("Failed to get current user", error);
        setIsAuthFailed(true);
      }
    };

    handleOAuthSuccess();
  }, [navigate, dispatch]);

  return (
    <div className="min-h-[100dvh] flex flex-col p-4 lg:p-6">
      {isAuthFailed ? (
        <NoDataPlaceholder
          header="Oops 🙈, Login Failed"
          body="Something went wrong while logging you in. Please try again."
        >
          <Button variant="outline" size="sm" className="h-8" asChild>
          <Link to="/" className="flex items-center gap-1">
            Go Home
            <MoveRight className="h-3.5 w-3.5" />
            <House className="h-3.5 w-3.5" />
          </Link>
        </Button>
        </NoDataPlaceholder>
      ) : (
        <NoDataPlaceholder
          header="Yo 🎉, Logging you in"
          body="Hold up, we're getting you in!"
        >
          <Loader className="size-6 animate-spin" />
        </NoDataPlaceholder>
      )}
    </div>
  );
};

const fetchGoogleUserProfile = async (accessToken) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok)
      throw new Error("Failed to fetch user profile from Google");

    return await response.json();
  } catch (error) {
    console.error("Error fetching Google user profile:", error);
    return null;
  }
};

export default OAuthCheckPage;
