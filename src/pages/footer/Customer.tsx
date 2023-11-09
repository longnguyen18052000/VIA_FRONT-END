import React from "react";
import styles from "./customer.module.scss";
import tiktok from "../../asstes/images/tiktok.png";
import upos from "../../asstes/images/upos.png";
import shopee from "../../asstes/images/shopee.png";
import oppo from "../../asstes/images/oppo.png";
import thegioididong from "../../asstes/images/thegioididong.png";
import tiki from "../../asstes/images/tiki.png";
import nextSlide from "../../asstes/svg/next.svg";
import back from "../../asstes/svg/back.svg";

const Customer: React.FC = () => {
  return (
    <div className={styles.customer}>
      <div className={styles.title}>KHÁCH HÀNG TIÊU BIỂU</div>
      <div className="w-full flex mt-[24px] justify-between items-center gap-[54px]">
        <img src={back} alt=" button click back slide" />
        <img src={tiktok} alt="tiktok img" />
        <img src={upos} alt="upos img" />
        <img src={shopee} alt="shoppe img" />
        <img src={oppo} alt="oppo img" />
        <img src={tiki} alt="tiki img" />
        <img src={thegioididong} alt="thegioididong img" />
        <img src={nextSlide} alt=" button click next slide" />
      </div>
    </div>
  );
};

export default Customer;
