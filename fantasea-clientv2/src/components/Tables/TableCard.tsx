import { ReactNode } from "react"

interface TableCardProps {
    tableComponent: ReactNode;
}
export const TableCard = ({tableComponent}:TableCardProps):JSX.Element => {
    return (
        <div className="border rounded-lg shadow-lg bg-white flex flex-col h-full">
            {tableComponent}
        </div>
    )
}