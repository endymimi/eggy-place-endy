import React from "react";
import CheckIcon from "../../assets/checkIcon.svg";
import { useAuth } from "../../context/AuthContext";

const MyModal = () => {
    const {logout} = useAuth()
  return (
    <>
      <button
        className="cursor-pointer ps-3"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Logout
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-[#100101] w-100 flex flex-col gap-5 items-center ">
            <img src={CheckIcon} alt="warning-img" />
         <h2 className="text-[#FFFFFF]">Log Out</h2>
         <p className="text-[#FFFFFF]">Are you sure you want to Log out?</p>
         <div className="flex gap-5">
           <h2 className="cursor-pointer" onClick={logout}>Logout</h2>
           <h2 className="cursor-pointer">Cancel</h2>
         </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default MyModal;