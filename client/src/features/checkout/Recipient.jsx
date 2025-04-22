import React from 'react';
import Input from '../../components/Input';
import MyButton from '../../components/MyButton';

const Recipient = ({recipientInfo,handleFormActivity,handleSubmit,handleChange,setRecipientInfo,savedInfo}) => {
    
  return (
    <>
    <div className="bg-[#252422] py-3  px-3 rounded-lg  ">
            <div className="text-[#FFFFFF] border-b-1  border-[#FBFBFB] pb-3 flex justify-between">
              <h1 className="text-[18px] md:text-[24px] font-[500]">
                Recipient Information
              </h1>
              <button
                className="cursor-pointer text-[#B67B0F] text-[20px] md:text-[18px] font-[400]  "
                onClick={handleFormActivity}
              >
                 {savedInfo ? "Edit" : "Add"}

              </button>
              <dialog id="my_modal_1" className="modal ">
                <div className="modal-box bg-[#100101]  ">
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                      document.getElementById("my_modal_1").close();
                    }}
                  >
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>

                    <h3 className="font-bold text-lg">Add Contact Info</h3>
                    <p className="py-4">
                      Who do you want your order to be delivered to?
                    </p>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="">Full Name *</label>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        required
                        value={recipientInfo.fullName}
                        onChange={handleChange}
                        name="fullName"
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">Phone Number *</label>
                      <Input
                        type="text"
                        required
                        maxLength="11"
                        minLength="11"
                        pattern="^0[789][01]\d{8}$"
                        placeholder="e.g 0700000000"
                        value={recipientInfo.phoneNumber}
                        onChange={handleChange}
                        name="phoneNumber"
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">Email *</label>
                      <Input
                        placeholder="Email address"
                        type="email"
                        required
                        value={recipientInfo.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>
                    <div>
                      <MyButton
                        text="Add Contact Info"
                        className="w-full h-[45px] font-[500] text-[20px]"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
            <div>
              {savedInfo && (
                <div className="flex  flex-col gap-3 py-3">
                  <p className="font-[500] text-[white] text-[18px]">
                    {savedInfo.fullName}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedInfo.phoneNumber}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedInfo.email}
                  </p>
                </div>
              )}
            </div>
          </div>
    </>
  )
}

export default Recipient