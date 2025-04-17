import React, { useContext } from 'react';
import { menuItems } from '../db';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import rateIcon from "../assets/rating-icon.svg";
import MyButton from './MyButton';
import { toast } from "sonner";


const SimilarProducts = () => {
  const {handleAddToCart,cart} = useContext(CartContext)

  const threeRandomItems = menuItems
  .filter(() => Math.random() < 0.5)
  .slice(0, 3); 
    return (
    <>
    <main className='wrapper bg-[#2F2F2F] text-white'>
      <div>
        {cart.length > 0 && (
          <>
          
        <h1>Similar Products You Might Like</h1>
        <div className='flex justify-between flex-wrap gap-y-5 lg:gap-y-8 mb-6'>
          {threeRandomItems.map((randomItx)=>{
            const {_id,title,image,description,price,rating,duration} = randomItx
            return(
              <div
              key={_id}
              className="card bg-[#252422] w-100 md:w-90 lg:w-118 xl:w-110 p-[16px] my-1 md:my-0 shadow-sm"
            >
              <Link >
              
              <figure>
                <img
                  src={image}
                  alt="Shoes"
                  className="w-full h-auto object-cover "
                />
              </figure>
              </Link>
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <h2 className="card-title font-[500] text-[20px] text-[#FBFBFB] ">
                    {title}{" "}
                  </h2>
                  <div className="flex gap-x-2 border border-[#B67B0F] py-[6px] px-[4px] rounded-[2px] ">
                    <img src={rateIcon} alt="rate-icon" />
                    <p className="text-[#FBFBFB] font-[400] text-[14px]">
                      {rating}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#B67B0F]  py-5 ">
                    <span className="font-[200] text-[23px]">
                      &#8358;
                    </span>
                    <span className="font-[500] text-[31px]">{price}</span>{" "}
                  </p>
                  <p className="text-[#FBFBFB]"> {duration} </p>
                </div>
                <div className="card-actions justify-center ">
                  <MyButton
                    text="Add to cart"
                    className="w-full h-[56px]"
                    onClick={()=> {handleAddToCart(randomItx) ,  toast.success('Item added')  } }
                  />
                </div>
              </div>
            </div>
            )
          })}
        </div>
          </>
        )}
      </div>
    </main>
    </>
  )
}

export default SimilarProducts