import field from "../../assets/field.jpg";

export const DraftBoard = (): JSX.Element => {
    const boardBackground = `url(${field})`; // Properly format it as a CSS url value
    return (
        <div 
            className="h-full" 
            style={{ 
                backgroundImage: boardBackground, // Corrected to use CSS url function
                backgroundSize: 'cover', // Ensures the image covers the div
                backgroundPosition: 'center' // Centers the image within the div
            }}
        >
            Content of the draft board
        </div>
    );
}
