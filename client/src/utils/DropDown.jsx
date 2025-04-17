import arrowDown from "../assets/drop-down-img.svg";
import arrowUp from "../assets/arrow-up-2.png";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";


export const LocationDropDownFN = () => {
  const [isClicked, setIsClicked] = useState(false);
  function toggleArrow() {
    // isClicked ? setIsClicked(false) : setIsClicked(true);
  }
  return (
    <>
      <div className="dropdown dropdown-center " onClick={toggleArrow}>
        <div tabIndex={0} className=" m-1"  >
          <img
            src={isClicked  ? arrowUp :   arrowDown}
            alt="drop-down-img"
            className="cursor-pointer min-w-3"
            
          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu  rounded-box z-1 w-25 h-30 text-[#FBFBFB] p-2 shadow-sm mt-5 bg-[#252422]"
        >
          <li>
            <a>Delta</a>
          </li>
          <li>
            <a>Delta</a>
          </li>
          <li>
            <a> Lagos</a>
          </li>
        </ul>
      </div>
    </>
  );
};


// import arrowDown from "../assets/drop-down-img.svg";
// import arrowUp from "../assets/arrow-up-2.png";
// import { useState } from "react";

// export const LocationDropDownFN = ({ options = [], onSelect, selected }) => {
//   const [isClicked, setIsClicked] = useState(false);

//   const toggleArrow = () => {
//     setIsClicked(prev => !prev);
//   };

//   return (
//     <div className="dropdown dropdown-center" onClick={toggleArrow}>
//       <div tabIndex={0} className="m-1">
//         <img
//           src={isClicked ? arrowUp : arrowDown}
//           alt="drop-down-img"
//           className="cursor-pointer min-w-3"
//         />
//       </div>
//       {isClicked && (
//         <ul
//           tabIndex={0}
//           className="dropdown-content menu rounded-box z-1 w-25 h-30 text-[#FBFBFB] p-2 shadow-sm mt-5 bg-[#252422]"
//         >
//           {options.map((location, index) => (
//             <li key={index}>
//               <a
//                 onClick={() => {
//                   onSelect(location);
//                   setIsClicked(false);
//                 }}
//               >
//                 {location}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
