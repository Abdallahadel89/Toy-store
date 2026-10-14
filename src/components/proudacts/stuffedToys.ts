
import Teddy from "../../assets/imige/bear.png";
import foxxy from "../../assets/imige/fox.png";
import dog from "../../assets/imige/dog.png";
import thing from "../../assets/imige/mega toy.png";



const Stuffedanimals = [

{
    id:1,
    slug: "teddy-bear",
    attributes :{

        name:"Teddy Bear",
        short_desc : " a small teddy brown bear",
        price : "$30 USD",
        category: "Stuffed Animals",
        img : { data: { attributes: { url: Teddy } } }
    },
    

},

{
    id:2,
    slug: "mega-blush-toy",
    attributes :{

        name:"Mega Blush Toy",
        short_desc : " a small mega blush toy ",
        price : "$38 USD",
        category: "Stuffed Animals",
        img : { data: { attributes: { url: thing } } }
    },
    

},

{
    id:3,
    slug: "cute-dog",
    attributes :{

        name:"Cute Dog",
        short_desc : " a small dog wearing a hoody ",
        price : "$24 USD",
        category: "Stuffed Animals",
        img : { data: { attributes: { url: dog } } }
    },
    

},
{
    id:4,
    slug: "foxxy",
    attributes :{

        name:"Foxxy",
        short_desc : " a small cute frindly fox ",
        price : "$27 USD",
        category: "Stuffed Animals",
        img : { data: { attributes: { url: foxxy } } }
    },
    

},

]

export default Stuffedanimals;