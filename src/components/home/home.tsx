import homebg from "../../assets/imige/home-bg.jpg"
import { Button } from "../ui/button"
import HomeCatagory from "./HomeCatagory"
import Story from "./Story"
import StuffedAnimals from "./stuffedAnimals"
import WoodenAnimals from "./woodenAnimals"

export default function Home (){


return (
<>
<div className="bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center px-4 py-8" style={{ backgroundImage: `url(${homebg})` ,     backgroundPosition: "50% 94%"    
 } }>

    <div className="bg-white flex gap-3 md:gap-5 flex-col max-w-[570px] w-full rounded-[1vw] px-4 md:px-8 py-4 md:py-6 text-center items-center" >

        <h6 className="text-gr py-2 md:py-4 text-sm md:text-base">Say Hello to ToyStore 
        </h6>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">See Our Wonderfull Website</h1>

        <Button className="bg-gr text-white md:w-auto px-6 md:px-8 rounded-full my-3 md:my-5 hover:bg-green-700 text-sm md:text-base cursor-pointer" > Open Catalog </Button>



    </div>


</div>

<HomeCatagory></HomeCatagory>
<StuffedAnimals/>
<WoodenAnimals/>
<Story/>


</>)




}