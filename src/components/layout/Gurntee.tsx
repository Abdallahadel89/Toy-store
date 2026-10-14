



export default function Guarantee() {




    return (
        <div className="flex justify-center bg-bage py-8 lg:px-14 xl:py-20">
        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-4 xl:gap-25 ">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center sm:text-left sm:flex-row">
            <img
              src="/src/assets/icons/trophy 1.svg"
              alt="High Quality"
              className="mr-2 mb-4 sm:mb-0"
            />
            <div>
              <h3 className="text-xl lg:text-lg xl:text-2xl font-semibold lg:leading-[37.5px]">
                High Quality
              </h3>
              <p className="text-sm sm:text-base lg:text-md xl:text-xl text-[#898989] font-medium leading-tight lg:leading-[30px]">
                Crafted from top materials
              </p>
            </div>
          </div>
  
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center sm:text-left sm:flex-row">
            <img
              src="/src/assets/icons/Group.svg"
              alt="Warranty Protection"
              className="mr-2 mb-4 sm:mb-0"
            />
            <div>
              <h3 className="text-xl lg:text-lg xl:text-2xl font-semibold leading-none xl:leading-[37.5px]">
                Warranty Protection
              </h3>
              <p className="text-sm sm:text-base lg:text-md xl:text-xl text-[#898989] font-medium leading-tight lg:leading-[30px]">
                Over 2 months
              </p>
            </div>
          </div>
  
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center sm:text-left sm:flex-row">
            <img
              src="/src/assets/icons/shipping.svg"
              alt="Free Shipping"
              className="mr-2 mb-4 sm:mb-0"
            />
            <div>
              <h3 className="text-xl lg:text-lg xl:text-2xl font-semibold lg:leading-[37.5px]">
                Free Shipping
              </h3>
              <p className="text-sm sm:text-base lg:text-md xl:text-xl text-[#898989] font-medium leading-tight lg:leading-[30px]">
                Order over 150$
              </p>
            </div>
          </div>
  
          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center sm:text-left sm:flex-row">
            <img
              src="/src/assets/icons/customer-support.svg"
              alt="24 / 7 Support"
              className="mr-2 mb-4 sm:mb-0"
            />
            <div>
              <h3 className="text-xl lg:text-lg xl:text-2xl font-semibold lg:leading-[37.5px]">
                24 / 7 Support
              </h3>
              <p className="text-sm sm:text-base lg:text-md xl:text-xl text-[#898989] font-medium leading-tight lg:leading-[30px]">
                Dedicated support
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}