import ResearchTabs from "../components/ResearchTabs/ResearchTabs";

export const Home = (): JSX.Element => {
    return (
        <div className="flex flex-col items-center h-screen px-5">
            <div className="w-full h-full">
                <ResearchTabs />
            </div>
        </div>
  );
};
