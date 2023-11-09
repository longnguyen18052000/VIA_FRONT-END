import {
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import OurServices from "../../compoments/our-services";
import PrivacyPolicy from "./privacy-policy";
// import privacyPolicyIcon from "../../asstes/svg/privacy-policy.svg";
import axios from "axios";
import InsertCodeOtpModal from "../../compoments/insert-code-otp";
import { useStateValue } from "../../use-context";

const RegisterUser = () => {
  const [userName, setUserName] = useState<string>("");
  const [shopName, setShopName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [wards, setWards] = useState("");
  const [district, setDistrict] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [acceptTerm, setAcceptTerm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validateEror, setValidateError] = useState<string>("");
  const { setOpenOtp, openOtp, setType } = useStateValue();

  const handleCheckboxChange = () => {
    setAcceptTerm(!acceptTerm);
  };

  const handleRegisterUserClick = async () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phonePattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
      phoneNumber
    );

    if (!shopName) {
      setValidateError("shopName error");
      return;
    }

    if (!phonePattern) {
      setValidateError("phoneNumber error");
      return;
    }

    if (!email) {
      setValidateError("email error");
      return;
    }

    if (!emailPattern.test(email)) {
      setValidateError("email error");
      return;
    }

    if (!userName) {
      setValidateError("userName error");
      return;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{9,}$/;

    if (!password) {
      setValidateError("password error");
      return;
    }

    if (!passwordRegex.test(password)) {
      setValidateError("Password is not in correct format");
      return;
    }

    if (password !== confirmPassword) {
      setValidateError("confirmPassword error");
      return;
    }

    if (!acceptTerm) {
      setValidateError("acceptTerm error");
      return;
    }

    try {
      const response = await callLoginAPI(
        userName,
        shopName,
        password,
        phoneNumber,
        confirmPassword,
        email,
        address,
        wards,
        district,
        province,
        acceptTerm
      );
      if (response.success) {
        setOpenOtp(true);
        setType("register-user");
        console.log(response);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const callLoginAPI = async (
    userName: string,
    shopName: string,
    password: string,
    phoneNumber: string,
    confirmPassword: string,
    email: string,
    address: string,
    wards: string,
    district: string,
    province: string,
    acceptTerm: boolean
  ) => {
    try {
      const response = await axios.post(
        "https://dev-fe-exam.viajsc.com/ExamUser/register-user",
        {
          userName,
          shopName,
          password,
          phoneNumber,
          confirmPassword,
          email,
          address,
          wards,
          district,
          province,
          acceptTerm,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      callOtpApi(userName);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const callOtpApi = async (userName: any) => {
    try {
      const response = await axios.get(
        `https://dev-fe-exam.viajsc.com/OtpViewerConntroller/get-otp?username=${userName}`
      );
      const data = await response.data;
      console.log(response);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="px-[80px] py-[64px] flex gap-[130px]">
      <div className="w-2/3">
        <div className="text-center text-[25px] font-bold text-[#DCA245] mb-[27px]">
          Đăng ký tài khoản
        </div>
        {validateEror && (
          <div className="text-red-500 text-center">{validateEror} </div>
        )}
        <div className="flex gap-[24px] mb-[27px]">
          <div className="grow">
            <div>
              Tên cửa hàng <span className="text-red-500">*</span>
            </div>
            <TextField
              fullWidth
              placeholder="Nhập tên cửa hàng..."
              InputProps={{ disableUnderline: true }}
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>

          <div className="grow">
            <div>
              Số điện thoại <span className="text-red-500">*</span>
            </div>
            <TextField
              fullWidth
              placeholder="Nhập số điện thoạt..."
              InputProps={{ disableUnderline: true }}
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="grow">
            <div>
              Emai <span className="text-red-500">*</span>
            </div>
            <TextField
              fullWidth
              placeholder="Nhập email..."
              InputProps={{ disableUnderline: true }}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-[24px] mb-[27px]">
          <div className="grow">
            <div>
              Username <span className="text-red-500">*</span>
              <span className="text-[12px]"> swagger cần post username</span>
            </div>
            <TextField
              fullWidth
              placeholder="Nhập tên của bạn..."
              InputProps={{ disableUnderline: true }}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="grow">
            <div>
              Mật khẩu <span className="text-red-500">*</span>{" "}
            </div>
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
          </div>

          <div className="grow">
            <div>
              Xác nhận Mật khẩu <span className="text-red-500">*</span>{" "}
            </div>
            <div className="relative">
              <TextField
                type={showPassword ? "text" : "password"}
                InputProps={{ disableUnderline: true }}
                placeholder="Xác nhận mật khẩu..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/4"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-[27px]">
          <div>Địa chỉ</div>
          <TextField
            fullWidth
            placeholder="Nhập số nhà, toà nhà, tên đường..."
            InputProps={{ disableUnderline: true }}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex gap-[24px] mb-[27px]">
          <div className="grow">
            <div>Phường/xã</div>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={wards}
                onChange={(e) => setWards(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Chọn phường/xã
                </MenuItem>
                <MenuItem value="thuy_ninh">Thụy Ninh</MenuItem>
                <MenuItem value="thuy_chinh">Thụy Chính</MenuItem>
                <MenuItem value="thuy_dan">Thụy Dân</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grow">
            <div>Quận huyện</div>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Chọn quận/huyện
                </MenuItem>
                <MenuItem value="thai_thuy">Thái Thụy</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grow">
            <div>Thành phố</div>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Chọn thành phố
                </MenuItem>
                <MenuItem value="thuy_ninh">Thái Bình</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerm}
                  onChange={handleCheckboxChange}
                />
              }
              label=""
            />
            <span>Tôi đã đọc và đồng ý với</span>
            <PrivacyPolicy />
          </div>

          <Button
            sx={{
              border: "none",
              color: "white",
              backgroundColor: "var(--primary-500, #fdba4d)",
              fontWeight: "bold",
              "&:hover": {
                border: "none",
                backgroundColor: "var(--primary-500, #fdba4d)",
              },
            }}
            variant="contained"
            onClick={handleRegisterUserClick}
          >
            Đăng ký ngay
          </Button>
        </div>
      </div>

      <OurServices />
      {openOtp && <InsertCodeOtpModal />}
    </div>
  );
};

export default RegisterUser;
