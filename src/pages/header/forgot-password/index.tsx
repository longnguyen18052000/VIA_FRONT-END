import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import InsertCodeOtpModal from "../../../compoments/insert-code-otp";
import axios from "axios";
import { useStateValue } from "../../../use-context";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ForgotPassword = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const { setOpenOtp, openOtp, setType } = useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const sendRequireClick = async () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phonePattern = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
      userName
    );

    if (!userName) {
      setUserNameError("Email, phone is required");
      return;
    }

    if (!emailPattern.test(userName) && !phonePattern) {
      setUserNameError("Email hoặc phone không đúng định dạng");
      return;
    } else {
      setUserNameError("");
    }

    axios
      .get(
        `https://dev-fe-exam.viajsc.com/ExamUser/get-otp-change-password?userName=${userName}`
      )
      .then((response) => {
        console.log(response.data);
        handleClose();
        setOpenOtp(true);
        setType("forgot-password");
        callOtpApi(userName);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <React.Fragment>
      <Button
        variant="outlined"
        className="text-white p-[24px]"
        onClick={handleClickOpen}
        sx={{
          border: "none",
          color: "white",
          "&:hover": {
            border: "none",
          },
        }}
      >
        Quên mật khẩu
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Yêu cầu thay đổi mật khẩu
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <div className="text-base">Email/Số điện thoại</div>
            <TextField
              placeholder="Nhập số điện thoại hoặc email..."
              className="w-[512px]"
              InputProps={{ disableUnderline: true }}
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {userNameError && (
              <div className="text-red-500">{userNameError}</div>
            )}
            <div className="text-center w-full mt-[24px]">
              Bạn vui lòng kiểm tra hòm thư đến hoặc mục tin nhắn <br /> trên
              điện thoại để lấy mã OTP
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <div className="w-full text-center mb-[24px]">
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
              autoFocus
              onClick={sendRequireClick}
            >
              Gửi yêu cầu
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>

      {openOtp && <InsertCodeOtpModal />}
    </React.Fragment>
  );
};

export default ForgotPassword;
