/* eslint-disable react/prop-types */
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import SGRQForm from "../SGRQForm/SGRQForm";

function QualityOfLife({ isOpen, toggleAccordion }) {
  return (
    <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          Quality of life
        </h4>
        <div
          className={` ${
            isOpen && "bg-primaryColor text-white border-none"
          } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
            {/*Input 1*/}
            <div>
              <SGRQForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QualityOfLife;
