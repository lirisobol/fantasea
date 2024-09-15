import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"

export const TeamDrawerMenu = ():JSX.Element => {
    return (
        <Menu as="div" className="relative inline-block flex-shrink-0 text-left">
        <MenuButton className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open options menu</span>
          <span className="flex h-full w-full items-center justify-center rounded-full">
            <EllipsisVerticalIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
            />
          </span>
        </MenuButton>
        <MenuItems
          transition
          className="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                View profile
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Send message
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    )
}