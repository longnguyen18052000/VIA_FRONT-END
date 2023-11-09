import { Button, DialogContent } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import privacyPolicyIcon from "../../../asstes/svg/privacy-policy.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const PrivacyPolicy = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          border: "none",
          color: "#FDBA4D",
          fontWeight: "bold",
          "&:hover": {
            border: "none",
            background: "white",
          },
        }}
      >
        Chính sách bảo mật thông tin
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <Typography gutterBottom>
            <div className="flex flex-col items-center p-[24px]">
              <img src={privacyPolicyIcon} alt="privacyPolicyIcon" />
              <div className="text-[28px] font-bold text-[#10B981] py-[24px]">
                CHÍNH SÁCH ĐANG ĐƯỢC CẬP NHẬT
              </div>
              <div>Cảm ơn bạn đã sử dụng dịch vụ</div>

              <div className="text-[#F59E0B] py-[24px]">
                Vui lòng kiểm tra lại sau
              </div>
            </div>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default PrivacyPolicy;
