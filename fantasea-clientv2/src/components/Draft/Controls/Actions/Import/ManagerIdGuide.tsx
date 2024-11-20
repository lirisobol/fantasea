import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { DesktopGuide } from "./DesktopGuide";

export const ManagerIdGuide = (): JSX.Element => {
  return (
    <div>
      <Disclosure as="div" className="w-full">
        <DisclosureButton className="w-full border-b pb-2 text-left font-light text-sm lg:text-lg flex items-center justify-between">
            Find My Manager Id
            <FontAwesomeIcon icon={faArrowDown} className="ml-12"/>
        </DisclosureButton>
        <div className="overflow-hidden py-2 w-full">
          <DisclosurePanel
            transition
            className="w-full origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
          >
            <DesktopGuide />
          </DisclosurePanel>
        </div>
      </Disclosure>
    </div>
  );
};
