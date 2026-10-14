import IMG from "../../assets/imige/back2.jpg";
import { FaPlayCircle } from "react-icons/fa";

export default function Story() {
  return (
    <>
      <section
        className="mt-5 md:mt-[5rem] pb-[112px]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)) , url(${IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll ,fixed",
          minHeight: "50vh",
        }}
      >
        <div className="flex flex-col items-center gap-5  h-[50vh] relative top-[100px] md:top-[200px] text-white font-semibold">
          <h1 className="text-3xl"> About The Shop</h1>
          <h2 className="text-5xl">Watch Our Story</h2>

          <p className="text-center text-xl">
            There is no magic formula to write perfect ad copy. It is based on a
            number of factors, including ad placement, <br />
            demographic, even the consumer’s mood.
          </p>
          <button className="  border-transparent text-gr bg-white cursor-pointer   text-7xl rounded-full  ">
            {" "}
            <FaPlayCircle />
          </button>
        </div>
      </section>
    </>
  );
}
