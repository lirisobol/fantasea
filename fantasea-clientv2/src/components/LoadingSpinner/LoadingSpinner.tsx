export const LoadingSpinner = (): JSX.Element => {
    return (
        <div className="absolute top-100 left-1/2 transform -translate-x-1/2 w-full h-screen flex justify-center items-start">
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    )
};
