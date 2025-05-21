import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Mail, Lock } from "lucide-react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";
import { validateLoginForm } from "../utils/validation";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (loginError) setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/dashboard");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary-100">
              <Package className="h-10 w-10 text-primary-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            DH Express
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        {loginError && (
          <div className="bg-error-50 text-error-800 p-3 rounded-md text-sm">
            {loginError}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@dhexpress.com"
              error={errors.email}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full justify-center"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Email: admin@dhexpress.com</p>
            <p>Password: password123</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
