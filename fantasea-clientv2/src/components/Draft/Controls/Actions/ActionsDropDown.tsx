import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import ImportDraftModal from "./Import/ImportDraftModal";
import { useState } from "react";

export default function ActionsDropDown(): JSX.Element {
  const [importModalShow, setImportModalShow] = useState<boolean>(false);
  const openImportModal = () => {
    setImportModalShow(true);
  };
  const closeImportModal = () => {
    setImportModalShow(false);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div
        className="flex flex-col justify-center items-center text-xs gap-0.5 text-slate-700
        md:flex-row-reverse md:ring-1 md:ring-gray-400 md:px-4 md:py-2
        rounded-md
"
      >
        <MenuButton
          className="
          rounded-md
          px-5 py-2 md:px-0 md:py-0
          ring-1 ring-gray-400 ring-inset md:ring-0
        hover:bg-slate-100
          transition
        "
        >
          <ChevronDownIcon
            aria-hidden="true"
            className="
            hidden lg:inline-block
            size-4 lg:size-5 transition"
          />
          <Cog8ToothIcon
            aria-hidden="true"
            className="
            lg:hidden
            size-4 lg:size-5 transition"
          />
        </MenuButton>
        <span className="text-[9px] md:text-xs md:mr-2">Options</span>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem className="group">
            <div
              onClick={openImportModal}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <ArrowDownOnSquareIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              Import
            </div>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <ShareIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              Share
            </a>
          </MenuItem>
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <HeartIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              Add to favorites
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <ArrowPathIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              Reset
            </a>
          </MenuItem>
          <MenuItem className="group">
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <TrashIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              Delete
            </a>
          </MenuItem>
        </div>
      </MenuItems>
      <ImportDraftModal show={importModalShow} onHide={closeImportModal} />
    </Menu>
  );
}
