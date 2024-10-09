import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { hideAlert } from "../../store/slices/alert";

interface AlertProps {
    message:string;
    type: string;
    onClose: () => void;
}
export const Alert = ({ message, type, onClose }: AlertProps): JSX.Element => {
    
    const alert = useAppSelector((state) => state.alert)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(alert.isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert.isVisible, dispatch])
    return (
        <div className={`absolute z-20 rounded-md p-4 ${type === 'error' ? 'bg-red-50' : 'bg-green-50'} `}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon className={`h-5 w-5 ${type === 'error' ? 'text-red-400' : 'text-green-400'}`} />
                </div>
                <div className="ml-3">
                    <p className={`text-sm font-medium ${type === 'error' ? 'text-red-800' : 'text-green-800'}`}>{message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};