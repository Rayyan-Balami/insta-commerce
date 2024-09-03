import Logo from "@/components/nav/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminSchema } from "@/schemas/admin";
import AuthService from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.success) {
        // Clear local storage of products and timestamp
        localStorage.removeItem('products');
        localStorage.removeItem('products_timestamp');

        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(response.user));
        // Dispatch user data to Redux store
        dispatch(login(response.user));
        navigate("/");
        toast.success("Login successful");
      }else{
        form.setError("email", { message: response.message });
      }
    } catch (error) {
      form.setError("email", { message: response.message });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center min-h-[100dvh] p-6"
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <Logo />
            <CardTitle className="text-2xl pt-4">Admin Login</CardTitle>
            <CardDescription className="text-sm">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@balami.com" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="size-4 mr-2 animate-spin" />
              )}
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}