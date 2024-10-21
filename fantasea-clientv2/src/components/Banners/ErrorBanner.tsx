import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export default function ErrorBanner({ message, onDismiss, duration = 5000 }: ErrorBannerProps): JSX.Element | null {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [onDismiss, duration, message]);

  if (!message) {
    return null;
  }

  return (
    <Transition
      as={Fragment}
      appear
      show={!!message}
      enter="transform transition duration-500"
      enterFrom="-translate-y-full opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transform transition duration-500"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-full opacity-0"
    >
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-x-6 bg-red-400 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 w-full">
        <p className="text-sm leading-6 text-white">{message}</p>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            onClick={onDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </Transition>
  );
}
