import { FDR } from "./FDR";
import { Players } from "./Players";

export const Home = (): JSX.Element => {
    return (
        <div className="flex flex-wrap h-screen justify-center gap-4">
            <div className="w-full h-5/6 md:px-12">
                <Players />
            </div>
            <div className="w-full flex h-screen flex-col md:flex-row md:px-12 gap-4">
                <div className="w-full h-5/6 md:w-2/4">
                    <FDR />
                </div>
                <div className="w-full h-5/6 md:w-2/4">
                    <FDR />
                </div>
            </div>
        </div>
  );
};
