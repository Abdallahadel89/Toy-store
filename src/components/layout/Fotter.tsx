import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Guarantee from "./Gurntee";


export default function Fotter() { 









    return (
      <>  <Guarantee />
        <footer className = " bg-gr text-white flex flex-col md:flex-row  md:justify-between   mt-5 py-5 ">
             <div className="flex flex-col md:flex-row text-sm md:text-xl gap-1 md:gap-10 md:ml-[18em]  md:mx-[5rem] justify-center ">
          <h6 className="text-center text-xs md:text-xl  ">
            Toystore © 2026 All rights reserved.
          </h6>
        </div>
        <div className="flex gap-2 text-xl md:text-2xl md:mx-[20em] justify-center  ">
          <FaFacebookSquare />
          <FaInstagram />
          <FaXTwitter />
          <FaGithub />
          <FaLinkedin />
        </div>
        </footer>
        </>
    )
}