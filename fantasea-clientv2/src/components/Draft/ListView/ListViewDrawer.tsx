import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ListView from './ListView';

interface ListViewDrawerProps {
  show: boolean;
  onHide: () => void;
}

export default function ListViewDrawer({ show, onHide }: ListViewDrawerProps): JSX.Element {
  return (
    <Dialog open={show} onClose={onHide} className="relative z-10 opacity-95">
      <div className="absolute inset-0" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Updated Positioning */}
          <div className="pointer-events-none fixed inset-y-40 bottom-10 left-5 flex max-w-full rounded-lg">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 rounded-lg shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Players
                    </DialogTitle>
                    {/* Adjusted Close Button Alignment */}
                    <div className="mr-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => onHide()}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <ListView />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
