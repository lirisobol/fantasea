export const LoadingSpinner = (): JSX.Element => {
    return (
        <div className="absolute top-50 left-1/2 transform -translate-x-1/2 w-full h-screen flex justify-center items-start">
            <progress className="progress w-full"></progress>
        </div>
    )
};
