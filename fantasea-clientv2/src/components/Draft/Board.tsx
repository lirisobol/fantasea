import fieldImage from "../../assets/field.jpg";

export const Board = (): JSX.Element => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fieldImage})` }}
    >
      
    </div>
  );
};
