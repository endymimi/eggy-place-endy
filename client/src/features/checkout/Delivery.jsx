import React from 'react';
import Input from '../../components/Input';
import MyButton from '../../components/MyButton';

const Delivery = ({handleFormActivity2,savedAddress,deliveryAddress,handleAddress,handleSubmitAddress}) => {
  return (
    <>
    <div className="bg-[#252422] py-10 px-3 rounded-lg  ">
            <div className="text-[#FFFFFF] border-b-1 border-[#FBFBFB] pb-3 flex justify-between">
              <h1 className="text-[18px] md:text-[24px] font-[500]">
                Delivery Address
              </h1>
              <button
                className="cursor-pointer text-[#B67B0F] text-[20px] md:text-[18px] font-[400]  "
                onClick={handleFormActivity2}
              >
                {savedAddress ? "Edit" : "Add"}

              </button>
              <dialog id="my_modal_02" className="modal ">
                <div className="modal-box bg-[#100101]">
                  <form
                    method="dialog"
                    onSubmit={(e) => {
                      handleSubmitAddress(e);
                      document.getElementById("my_modal_02").close();
                    }}
                  >
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>

                    <h3 className="font-bold text-lg">Add Address</h3>
                    <p className="py-4">
                      Where do you want your order to be delivered to?
                    </p>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="">Address *</label>
                      <Input
                        placeholder="Address"
                        type="text"
                        required
                        name="address"
                        value={deliveryAddress.address}
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">State *</label>
                      <Input
                        placeholder="state"
                        type="text"
                        required
                        name="state"
                        value={deliveryAddress.state}
                        onChange={handleAddress}
                      />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                      <label htmlFor="">City *</label>
                      <Input
                        placeholder="city"
                        type="text"
                        required
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleAddress}
                      />
                    </div>
                    <div>
                      <MyButton
                        text="Add Address"
                        className="w-full h-[45px] font-[500] text-[20px]"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
            <div>
              {savedAddress && (
                <div className="flex   gap-3 py-3 items-center">
                  <p className="font-[500] text-[white] text-[18px]">
                    {savedAddress.address}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedAddress.state}
                  </p>
                  <p className="font-[400] text-[12px] text-[#FBFBFB] ">
                    {savedAddress.city}
                  </p>
                </div>
              )}
            </div>
          </div>
    </>
  )
}

export default Delivery