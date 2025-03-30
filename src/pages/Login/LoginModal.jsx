import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import UseLogin from "../../hooks/useLogin";
import { Xmark, EyeSolid, EyeClosed } from "iconoir-react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const { success, error, isLoading, handleLogin } = UseLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);
  return (
    <Dialog size="sm" open={true} handler={onClose}>
      <Dialog.Overlay onClick={onClose}>
        <Dialog.Content onClick={(e) => e.stopPropagation()}>
          <Dialog.DismissTrigger
            as={IconButton}
            size="sm"
            variant="ghost"
            color="secondary"
            className="absolute right-2 top-2"
            isCircular
            onClick={onClose}
          >
            <Xmark className="h-5 w-5" />
          </Dialog.DismissTrigger>
          <Typography type="h6" className="mb-1">
            Sign In
          </Typography>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success</strong>
              <span className="block sm:inline">Regiter Success</span>
            </div>
          )}
          <Typography className="text-foreground">
            Enter your email and password to Sign In.
          </Typography>
          <form action="#" className="mt-6" onSubmit={handleLogin}>
            <div className="mb-4 mt-2 space-y-1.5">
              <Typography
                as="label"
                htmlFor="email"
                type="small"
                color="default"
                className="font-semibold"
              >
                Email
              </Typography>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="someone@example.com"
              />
            </div>
            <div className="mb-4 space-y-1.5">
              <Typography
                as="label"
                htmlFor="password"
                type="small"
                color="default"
                className="font-semibold"
              >
                Password
              </Typography>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  className="pr-10" // Tambahkan padding kanan untuk ikon
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSolid className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeClosed className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-2"></div>
            <Button isFullWidth disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <Typography
            type="small"
            className="mb-2 mt-3 flex items-center justify-center gap-1 text-foreground"
          >
            Don't have an account?
            <Typography
              type="small"
              color="primary"
              as="a"
              href="#"
              className="font-semibold"
              onClick={() => navigate("/register")}
            >
              Sign up
            </Typography>
          </Typography>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default LoginModal;
