import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import Card from "./Card";

export default function CollapseCard({
  title,
  subTitle,
  children,
  defaultOpen = false,
  leftContent,
  rightContent,
  className,
}) {
  return (
    <Card className={clsx("group mt-4 p-0", className)}>
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-white p-4 text-left font-medium focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-75 group-hover:bg-gray-200">
              <div className="flex flex-col">
                <div className="flex items-center">
                  {leftContent && (
                    <span className="mr-2 text-base font-light">
                      {leftContent}
                    </span>
                  )}
                  <span>{title}</span>
                </div>
                {!open && subTitle && (
                  <span className="text-sm font-light">{subTitle}</span>
                )}
              </div>
              <div className="flex items-center">
                {rightContent && (
                  <span className="mr-2 text-base font-light">
                    {rightContent}
                  </span>
                )}
                <ChevronUpIcon
                  className={clsx(
                    "h-8 w-8 text-gray-400",
                    open && "rotate-180 transform"
                  )}
                />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-4 px-4 pt-2 pb-4">
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Card>
  );
}
