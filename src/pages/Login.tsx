
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-card rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`flex h-10 w-full rounded-md border ${
                  errors.email ? "border-destructive" : "border-input"
                } bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                className={`flex h-10 w-full rounded-md border ${
                  errors.password ? "border-destructive" : "border-input"
                } bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <button className="font-medium text-primary underline-offset-4 hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
