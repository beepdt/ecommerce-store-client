import { Billboard as BillboardType } from "@/types";
import Image from "next/image";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="overflow-hidden mx-auto  px-2 lg:px-8 ">
      <div className="relative  h-120 mx-auto">
        <Image src={data.imageUrl} className="absolute object-cover rounded-2xl md:rounded-4xl" alt="Billboard" fill />
        <div className="w-full bg-black/40 h-full rounded-2xl md:rounded-4xl absolute flex items-center justify-center px-8 py-4">
            <p className="lg:text-[6rem] text-6xl text-background leading-none tracking-tight">
                {data.label}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
