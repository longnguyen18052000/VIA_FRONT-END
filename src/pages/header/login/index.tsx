import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./login.module.scss";
import ForgotPassword from "../forgot-password";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginClick = async () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phonePattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
      userName
    );
    if (!userName) {
      setPhoneError("Email, phone is required");
      return;
    }

    if (!emailPattern.test(userName) && !phonePattern) {
      setPhoneError("Email hoặc phone không đúng định dạng");
      return;
    } else {
      setPhoneError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await callLoginAPI(userName, password);
      if (response.success) {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const callLoginAPI = async (userName: any, password: any) => {
    try {
      const response = await axios.post(
        "https://dev-fe-exam.viajsc.com/ExamUser/login",
        { userName, password },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="mt-[78px]">
        <p className="text-white text-lg font-bold mb-[16px]">
          Đăng nhập ngay!
        </p>
        <div className={styles["login"]}>
          <div>
            <div>Số điện thoại hoặc email</div>
            <TextField
              fullWidth
              placeholder="Nhập số điện thoại hoặc email..."
              InputProps={{ disableUnderline: true }}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {phoneError && <div className="text-red-500">{phoneError}</div>}
          </div>

          <div>
            <div>Mật khẩu</div>
            <div className="relative">
              <TextField
                type={showPassword ? "text" : "password"}
                InputProps={{ disableUnderline: true }}
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/4"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
            {passwordError && (
              <div className="text-red-500">{passwordError}</div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center mt-[20px]">
            <Button
              sx={{
                border: "none",
                color: "white",
                backgroundColor: "var(--primary-500, #fdba4d)",
                "&:hover": {
                  border: "none",
                  backgroundColor: "var(--primary-500, #fdba4d)",
                },
              }}
              variant="contained"
              onClick={handleLoginClick}
            >
              Đăng nhập
            </Button>
          </div>
        </div>

        <div className="text-white">
          <ForgotPassword />
        </div>
      </div>
    </>
  );
};

export default Login;
