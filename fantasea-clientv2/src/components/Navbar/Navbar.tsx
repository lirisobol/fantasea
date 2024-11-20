import { useState } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHammer,
  faHome,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/FantaseaSVGS/LogoFullNoText.svg";
import React from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-1 lg:px-6 px-4"
      >
        {/* Left side: Logo and Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="/" className="">
            <span className="sr-only">Fantasea</span>
            <img
              alt="Fantasea Logo"
              src={Logo}
              className="h-10 w-auto sm:h-16 md:h-20 lg:h-20"
            />
          </a>
          <div className="hidden lg:flex lg:gap-x-6">
            <NavLink to={"/myfpl"}>My Fantasy</NavLink>
            <NavLink to={"/draft"}>Draft</NavLink>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Right side: Button */}
        <div className="hidden lg:flex">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-gradient-to-r from-emerald-400 to-cyan-400 text-white hover:bg-gradient-to-r hover:from-emerald-400 hover:to-cyan-400 hover:scale-105 px-4 py-2 lg:px-4 lg:py-4 text-xs lg:text-sm font-semibold shadow-sm ring-1 ring-inset transition"
          >
            My Fantasy
            <SparklesIcon
              aria-hidden="true"
              className="-mr-1 w-4 h-4 lg:w-5 lg:h-5"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu dialog with Transition */}
      <Transition show={mobileMenuOpen} as={React.Fragment}>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden fixed inset-0 z-50 overflow-hidden"
        >
          {/* Background overlay */}
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Sliding panel */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-64">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <a href="/" className="">
                            <span className="sr-only">Fantasea</span>
                            <img alt="" src={Logo} className="h-16 w-16" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                          >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="mt-6 flow-root px-4 sm:px-6">
                        <div className="-my-6 divide-y divide-gray-500/10">
                          <div className="space-y-2 py-6 flex flex-col gap-4">
                            <div className="text-xl font-thin">
                              <FontAwesomeIcon
                                icon={faHome}
                                style={{ marginRight: 20, width: 18 }}
                              />
                              <NavLink
                                to={"/"}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Home
                              </NavLink>
                            </div>
                            <div className="text-xl font-thin">
                              <FontAwesomeIcon
                                icon={faUsersGear}
                                style={{ marginRight: 20, width: 18 }}
                              />
                              <NavLink
                                to={"/myfpl"}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                My Fantasy
                              </NavLink>
                            </div>
                            <div className="text-xl font-thin">
                              <FontAwesomeIcon
                                icon={faHammer}
                                style={{ marginRight: 20, width: 18 }}
                              />
                              <NavLink
                                to={"/draft"}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Draft
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
