

import LiftMac from "../../assets/imige/lift.png"
import camera from "../../assets/imige/camera.png"
import rabbit from "../../assets/imige/bunny.png"
import FLower from "../../assets/imige/Flower.png";



const WoodenToys = [

{
    id:1,
    slug: "happy-flower",
    attributes :{

        name:"Happy Flower",
        short_desc : " a small happy flower",
        price : "$38 USD",
        category: "Wooden Animals",
        img : { data: { attributes: { url: FLower } } }
    },
    

},

{
    id:2,
    slug: "lift-machine",
    attributes :{

        name:"Lift machine",
        short_desc : " a small lifting machine ",
        price : "$24 USD",
        category: "Wooden Animals",
        img : { data: { attributes: { url: LiftMac } } }
    },
    

},

{
    id:3,
    slug: "wooden-camera",
    attributes :{

        name:"Wooden Camera",
        short_desc : " a small Wooden Camera  ",
        price : "$32 USD",
        category: "Wooden Animals",
        img : { data: { attributes: { url: camera } } }
    },
    

},
{
    id:4,
    slug: "little-rabit",
    attributes :{

        name:"Little Rabit",
        short_desc : " A small bunny for small storge  ",
        price : "$16 USD",
        category: "Wooden Animals",
        img : { data: { attributes: { url: rabbit } } }
    },
    

},

]

export default WoodenToys;