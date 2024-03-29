import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import usePreferences from "../../stores/index";
import { useShallow } from "zustand/react/shallow";
import SelectComponent from "../MultiSelect/index";

const Header = ({ category, sources, authorList }) => {
  const {
    category: prefCategory,
    sources: prefSources,
    author: prefAuthor,
    setPrefCategory,
    setPrefAuthor,
    setPrefSources,
  } = usePreferences(
    useShallow((state) => ({
      category: state.category,
      sources: state.sources,
      author: state.author,
      setPrefCategory: state.setPrefCategory,
      setPrefSources: state.setPrefSources,
      setPrefAuthor: state.setPrefAuthor,
    }))
  );

  return (
    <>
      <header className="flex flex-wrap p-5 sm:justify-start sm:flex-nowrap z-50 w-full text-sm">
        <nav className="relative max-w-[85rem] w-full mx-auto bg-white border-b border-l-0 border-gray-200 py-3 px-4 sm:py-0 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              NEWS
            </a>
          </div>

          <div className="pr-12">
            <Popover className="relative mt-5 pl-2 sm:pl-1 sm:mt-1">
              <Popover.Button className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
                <AdjustmentsHorizontalIcon
                  className="h-5 w-5"
                  color="#4f46e5"
                  aria-hidden="true"
                />
                <span className="pl-2">Preferences</span>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                  <div className="shrink rounded-xl bg-white p-4 px-8 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                    <SelectComponent
                      className="max-w-[270px] min-w-[250px] mb-3"
                      placeholder="Preferred Categories"
                      value={prefCategory}
                      onChange={setPrefCategory}
                      options={category}
                    />
                    <SelectComponent
                      className="max-w-[270px] min-w-[250px] mb-3"
                      placeholder="Preferred Sources"
                      value={prefSources}
                      onChange={setPrefSources}
                      options={sources}
                    />
                    <SelectComponent
                      className="max-w-[270px] min-w-[250px] mb-3"
                      placeholder="Preferred Author"
                      value={prefAuthor}
                      onChange={setPrefAuthor}
                      options={authorList}
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
