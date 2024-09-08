import { useState } from "react"
import { ComparePlayersModalButton } from "../components/modals/ComparePlayersModal/ComparePlayersModalButton"
import ComparePlayersModal from "../components/modals/ComparePlayersModal/ComparePlayersModal";

export const Compare = ():JSX.Element => {

    const [modalShow, setModalShow] = useState<boolean>(false);

    const handleModalOpen = () => {
        setModalShow(true)
    };
    const handleModalClose = () => {
        setModalShow(false)
    };
    
    return (
        <div className="flex justify-center">
            <ComparePlayersModalButton openModal={handleModalOpen}/>
            <ComparePlayersModal show={modalShow} onHide={handleModalClose}/>
        </div>
    )
}