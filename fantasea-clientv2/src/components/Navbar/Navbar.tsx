'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'



export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-16">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Fantasea</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
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
        <div className="hidden lg:flex lg:gap-x-6">
            <div className='text-lg font-semibold px-4 rounded-md text-white py-2
                bg-gray-900 hover:bg-gray-700 transition'>
                <NavLink to={"/"}>Home</NavLink>
            </div>
            <div className='text-lg font-semibold px-4 rounded-md text-white py-2
                bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-teal-500 hover:to-blue-600 transition'>
                <NavLink to={"/myfpl"}>My Fantasy</NavLink>
            </div>
            <div className='text-lg font-semibold px-4 rounded-md text-white py-2
                bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-teal-500 hover:to-rose-600 transition'>
                <NavLink to={"/draft"}>Draft</NavLink>
            </div>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col gap-4">
                <div className='text-2xl font-thin'>
                    <NavLink to={"/"}>Home</NavLink>
                </div>
                <div className='text-2xl font-thin'>
                    <NavLink to={"/myfpl"}>My Fantasy</NavLink>
                </div>
                <div className='text-2xl font-thin'>
                    <NavLink to={"/draft"}>Draft</NavLink>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
