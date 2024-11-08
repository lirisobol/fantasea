import { useState } from "react";
import ClubSelect from "./ClubSelect";
import PositionSelect from "./PositionSelect";
import PlayerSearch from "./PlayerSearch";
import { AdvancedFiltersModalButton } from "../modals/AdvancedFiltersModal/AdvancedFiltersModalButton";
import AdvancedFiltersModal from "../modals/AdvancedFiltersModal/AdvancedFiltersModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export const PlayersTableFilterGroupDraft = (): JSX.Element => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalShow(true);
  };
  const handleModalClose = () => {
    setModalShow(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {/* Filters Row for medium and larger screens */}
      <div className="hidden md:flex flex-col md:flex-row gap-4 p-4">
        <PlayerSearch />
        <ClubSelect />
        {/* Advanced Filters Button */}
        <AdvancedFiltersModalButton openModal={handleModalOpen} />
      </div>

      {/* Filter Button for small screens */}
      <div className="flex justify-start md:hidden">
        <button
          onClick={toggleDrawer}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FontAwesomeIcon icon={faFilter} style={{ marginRight: 10 }} />
          Filters
        </button>
      </div>

      {/* Bottom Drawer for small screens */}
      <div
        className={`fixed inset-x-0 bottom-0 transform ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        } transition-transform duration-300 ease-in-out bg-white border-t border-gray-200 md:hidden`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            onClick={toggleDrawer}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <PlayerSearch />
            <ClubSelect />
            <PositionSelect />
            {/* Advanced Filters Button */}
            <AdvancedFiltersModalButton openModal={handleModalOpen} />
          </div>
        </div>
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFiltersModal show={modalShow} onHide={handleModalClose} />
    </>
  );
};
