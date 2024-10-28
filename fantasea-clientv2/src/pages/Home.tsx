import { FDR } from "./FDR";
import { Players } from "./Players";

export const Home = (): JSX.Element => {
    return (
        <div className="flex flex-wrap h-screen justify-center gap-4">
            <div className="w-full h-5/6 md:px-12">
                <Players />
            </div>
            <div className="w-full md:px-12 gap-4 grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="h-[40rem]">
                    <FDR />
                </div>
                <div className="h-[40rem]">
                    <FDR />
                </div>
                <div className="h-[40rem]">
                    <FDR />
                </div>
                <div className="h-[40rem]">
                    <FDR />
                </div>
            </div>
        </div>
  );
};
