import { useState } from "react"
import AdvancedFiltersModal from "./AdvancedFiltersModal/AdvancedFiltersModal"
import { ModalButton } from "./ModalButton/ModalButton"
import { PositionFilter } from "./PositionFilter"
import { SearchFilter } from "./SearchFilter"
import { TeamFilter } from "./TeamFilter"

export const PlayersTableFilterGroup = ():JSX.Element => {
    const [modalShow, setModalShow] = useState<boolean>(false);

    const handleModalOpen = () => {
        setModalShow(true)
    };
    const handleModalClose = () => {
        setModalShow(false)
    };
    return (
        <div className="w-full bg-white shadow p-1 flex gap-5 justify-center">
            <SearchFilter />
            <TeamFilter />
            <PositionFilter />
            <ModalButton openModal={handleModalOpen}/>
            <AdvancedFiltersModal show={modalShow} onHide={handleModalClose}/>
        </div>
    )
} 