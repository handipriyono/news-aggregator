import { Select } from "antd";
import Header from "../../commons/components/HeaderBar/index";
import Search from "./components/Search/index";
import useNewsQuery from "./hooks/newsQuery";
import DateFilter from "./components/DateFilter";
import EmptyData from "./components/Empty";
import Loader from "../../commons/components/Loader";
import RenderArticle from "./components/ArticleItem";
import SelectComponent from "../../commons/components/MultiSelect";

const HomePage = () => {
  const {
    data,
    onSearch,
    search,
    sources,
    setSelectedSource,
    sectionList,
    setSelectedSection,
    setSelectedDate,
    selectedSection,
    selectedSource,
    authorList,
    isLoading,
  } = useNewsQuery();

  return (
    <>
      <Header
        category={sectionList}
        sources={sources}
        authorList={authorList}
      />
      <main id="content" role="main">
        <>
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="flex flex-col xl:flex-row gap-2 justify-between my-2 sm:my-1">
              <Search onSearch={onSearch} search={search} />

              <div className="flex flex-col lg:flex-row mr-3">
                <DateFilter onChangeDate={setSelectedDate} />

                <div className="flex mr-4 py-3 sm:py-1">
                  <SelectComponent
                    className="max-w-[270px] min-w-[250px]"
                    placeholder="Filter by sources"
                    value={selectedSource}
                    onChange={setSelectedSource}
                    options={sources}
                  />
                </div>

                <div className="flex py-2 sm:py-1">
                  <SelectComponent
                    className="max-w-[270px] min-w-[250px]"
                    placeholder="Filter categories"
                    value={selectedSection}
                    onChange={setSelectedSection}
                    options={sectionList}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white pr-2 text-sm text-gray-500">
                  Headlines
                </span>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {data?.map(RenderArticle)}
            </div>
            {data?.length < 1 && isLoading && <Loader />}
            {data?.length < 1 && !isLoading && <EmptyData />}
          </div>
        </>
      </main>
    </>
  );
};

export default HomePage;
