import { XMarkIcon } from '@heroicons/react/20/solid'
interface ErrorBannerProps {
    message:string
}
export default function ErrorBanner({message}:ErrorBannerProps):JSX.Element {
    return (
        <div className="flex items-center gap-x-6 bg-red-400 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <p className="text-sm leading-6 text-white">
                {message}
            </p>
            <div className="flex flex-1 justify-end">
                <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
                <span className="sr-only">Dismiss</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    )
}
