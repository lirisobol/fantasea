import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ImportDraftModal from "./ImportDraftModal";

export const ImportDraft = (): JSX.Element => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const openModal = () => {
    setModalShow(true)
  };
  const closeModal = () => {
    setModalShow(false)
  };

  return (
    <div
      onClick={openModal}
      className="
      flex items-center justify-center rounded-md
      border shadow-sm px-6 py-2 text-white
      bg-gradient-to-r from-emerald-400 to-cyan-400
      hover:bg-gradient-to-r from-emerald-500 to-cyan-500
      hover:rounded"
    >
      Import Draft
      <FontAwesomeIcon icon={faFileImport} style={{ marginLeft: 12 }} />
      <ImportDraftModal show={modalShow} onHide={closeModal}/>
    </div>
  );
};
