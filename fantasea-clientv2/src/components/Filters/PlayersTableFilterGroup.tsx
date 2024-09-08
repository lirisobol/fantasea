import { useState } from "react"
import AdvancedFiltersModal from "./AdvancedFiltersModal/AdvancedFiltersModal"
import { ModalButton } from "./ModalButton/ModalButton"
import ClubSelect from "./ClubSelect"
import PositionSelect from "./PositionSelect"
import PlayerSearch from "./PlayerSearch"

export const PlayersTableFilterGroup = ():JSX.Element => {
    const [modalShow, setModalShow] = useState<boolean>(false);

    const handleModalOpen = () => {
        setModalShow(true)
    };
    const handleModalClose = () => {
        setModalShow(false)
    };
    return (
        <div className="flex flex-col gap-0 sm:flex-row sm:gap-1 w-full shadow p-1 justify-between">
                <div className="flex flex-col gap-0 sm:flex-row sm:gap-1">
                    <PlayerSearch />
                    <ClubSelect />
                    <PositionSelect />
                </div>
                <div className="flex sm:flex-row sm:gap-1 justify-center">
                    <ModalButton openModal={handleModalOpen}/>
                </div>
            <AdvancedFiltersModal show={modalShow} onHide={handleModalClose}/>
        </div>
    )
} 