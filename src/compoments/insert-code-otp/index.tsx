import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Button, TextField } from "@mui/material";
import { useStateValue } from "../../use-context";

interface InsertCodeOtpModalProps {}

const InsertCodeOtpModal: React.FC<InsertCodeOtpModalProps> = () => {
  const { openOtp, setOpenOtp, type } = useStateValue();
  const [inputValues, setInputValues] = useState(Array(6).fill(""));

  const handleInputChange = (index: any, value: any) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  const initialTime = 180;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        alert("Hết thời gian!");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openOtp}
        onClose={() => setOpenOtp(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            textColor="inherit"
            mb={1}
          >
            <p className="text-[19px] font-bold">NHẬP MÃ OTP</p>
            <div className="text-center w-[512px]">
              <p className="py-[32px] text-[#10B981] text-[16px] font-bold">
                MÃ OTP ĐÃ ĐƯỢC GỬI TỚI SỐ ĐIỆN THOẠI/ EMAIL
              </p>
              <div className="text-[18px] text-[#ECAD48]">
                Thời gian còn lại: {minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </div>
              <div className="mt-[32px] flex gap-[16px]">
                {inputValues.map((value: any, index: any) => {
                  return (
                    <TextField
                      sx={{
                        width: "60px",
                        backgroundColor: "white",
                        fontWeight: "bold",
                        fontSize: "28px",
                        color: "#059669",
                        borderRadius: "4px",
                        border: "2px solid var(--neutral-100, #E7EAEE)",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                        value: { value },
                      }}
                      key={index}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    ></TextField>
                  );
                })}
              </div>
              <div className="py-[32px]">
                <span>Không nhận đựợc mã otp. </span>
                <span className="text-[#0079ED]">Gửi lại mã</span>
              </div>
            </div>
            <div className="flex gap-[24px] justify-center items-center">
              <Button
                sx={{
                  backgroundColor: "#E7EAEE",
                  padding: "12px 18px",
                  fontWeight: "bold",
                  color: "black",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "#E7EAEE",
                  },
                }}
              >
                Trở về
              </Button>

              {type === "forgot-password" && (
                <Button
                  sx={{
                    backgroundColor: "#FDBA4D",
                    padding: "12px 18px",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": {
                      border: "none",
                      backgroundColor: "#FDBA4D",
                    },
                  }}
                >
                  Thay đổi mật khẩu
                </Button>
              )}

              {type === "register-user" && (
                <Button
                  sx={{
                    backgroundColor: "#FDBA4D",
                    padding: "12px 18px",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": {
                      border: "none",
                      backgroundColor: "#FDBA4D",
                    },
                  }}
                >
                  Hoàn tất đăng ký tài khoản
                </Button>
              )}
            </div>
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default InsertCodeOtpModal;
