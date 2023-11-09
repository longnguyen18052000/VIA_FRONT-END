import via_express from "../../asstes/svg/via-express.svg";
import via_fast from "../../asstes/svg/via-fast.svg";
import via_super from "../../asstes/svg/via-super.svg";
import via_fresh from "../../asstes/svg/via-fresh.svg";

const OurServices = () => {
  return (
    <div className="bg-[#F7F8F9] grow p-[24px]">
      <p className="text-[19px] font-bold text-center">Dịch vụ của chúng tôi</p>
      <div className="flex gap-[24px] py-[24px]">
        <div className="flex flex-col justify-center items-center grow bg-white px-[8px] py-[16px]">
          <img src={via_express} alt="via_express" />
          <div className="font-bold mt-[8px]">VIA EXPRESS</div>
        </div>
        <div className="flex flex-col justify-center items-center grow bg-white px-[8px] py-[16px]">
          <img src={via_fast} alt="via_fast" />
          <div className="font-bold mt-[8px]">VIA FAST</div>
        </div>
      </div>
      <div className="flex gap-[24px]">
        <div className="flex flex-col justify-center items-center grow bg-white px-[8px] py-[16px]">
          <img src={via_super} alt="via_express" />
          <div className="font-bold mt-[8px]">VIA SUPER</div>
        </div>
        <div className="flex flex-col justify-center items-center grow bg-white px-[8px] py-[16px]">
          <img src={via_fresh} alt="via_fast" />
          <div className="font-bold mt-[8px]">VIA FRESH</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center grow bg-white px-[8px] py-[16px] mt-[24px]">
        <img src={via_fast} alt="via_fast" />
        <div className="font-bold mt-[8px]">VIA INTERNATIONAL</div>
      </div>
    </div>
  );
};

export default OurServices;
