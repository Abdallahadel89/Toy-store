import bearImg from "../../assets/imige/bear.png";
import { Button } from "../ui/button";
import FlowarImg from "../../assets/imige/Flower.png"

export default function HomeCatagory() {
  return (
    <>
      <div className="my-8 md:my-[5rem] mb-24 md:mb-[5rem] flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-4">
        {/* First Card - Stuffed Animals */}
        <div className="rounded-md w-full md:w-[760px] h-[190px] bg-[#ffc12c] overflow-visible relative">
          <div className="flex flex-row items-center h-full">
            <div className="flex flex-col gap-3 md:gap-5 items-end mr-15  justify-center flex-1 px-4 md:px-0 md:ml-auto md:mr-8 py-4 md:py-0">
              <h1 className="text-white font-semibold text-xl md:text-2xl">
                Stuffed Animals
              </h1>
              <Button
                variant={"ghost"}
                className="text-black bg-white  md:w-auto px-6 md:px-8 text-center rounded-full cursor-pointer hover:bg-black hover:text-white"
              >
              
                Shop Now
              </Button>
            </div>
          </div>
          {/* Desktop image - overlapping */}
          <img
            className="  w-[180px] md:w-[250px] absolute bottom-[30px] md:bottom-[-15px] left-1 md:left-[20px] z-10"
            src={bearImg}
            alt="Bear"
          />
          
        </div>

        {/* Second Card - Wooden Toys */}
        <div className="rounded-md w-full md:w-[760px] h-[190px] bg-[#fb416b] overflow-visible relative">
          <div className="flex flex-row items-center h-full">
            <div className="flex flex-col gap-3 md:gap-5 items-start md:items-start ml-15 flex-1  md:px-0 md:ml-8 py-4 md:py-0">
              <h1 className="text-white font-semibold text-xl md:text-2xl">
                Wooden Toys
              </h1>
              <Button
                variant={"ghost"}
                className="text-black bg-white  w-auto px-6 md:px-8 text-center rounded-full cursor-pointer hover:bg-black hover:text-white"
              >
                Shop Now
              </Button>
            </div>
          </div>
          {/* Desktop image - overlapping */}
          <img
            className=" w-[150px]  md:w-[250px] absolute bottom-[30px] md:bottom-[-15px] right-[20px] z-10"
            src={FlowarImg}
            alt="Flower"
          />
          {/* Mobile image - overlapping */}
          
        </div>
      </div>
    </>
  );
}
