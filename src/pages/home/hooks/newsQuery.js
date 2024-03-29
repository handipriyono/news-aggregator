import { getNewsAPI, getNewsGuardianAPI, getNewsNYTAPI } from "../api/index";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect, useState } from "react";
import useDebounceValue from "../../../commons/helpers/timeout";
import usePreferences from "../../../commons/stores/index";
import { useShallow } from "zustand/react/shallow";

const queryKey = "list-newsAPI";
const queryKeyGuardian = "list-newsGuardian";
const nytAPI = "list-news-nyt";

const useNewsQuery = () => {
  const [search, setSearch] = useState("");
  const [sourceList, setSourceList] = useState({});
  const [sectionList, setSectionList] = useState({});
  const [authorList, setAuthorList] = useState({});
  const [selectedSource, setSelectedSource] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const searchKeyword = useDebounceValue(search, 1000);

  const {
    category: prefCategory,
    sources: prefSources,
    author: prefAuthor,
  } = usePreferences(
    useShallow((state) => ({
      category: state.category,
      sources: state.sources,
      author: state.author,
    }))
  );

  useEffect(() => {
    const combineSection = [...selectedSection, ...prefCategory];
    const combineSource = [...selectedSource, ...prefSources];

    setSelectedSection([...new Set(combineSection)]);
    setSelectedSource([...new Set(combineSource)]);
  }, [prefCategory, prefSources]);

  const onSearch = (e) => {
    setSearch(e?.target?.value);
  };

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, searchKeyword, selectedDate],
    queryFn: () =>
      getNewsAPI({
        q: searchKeyword || "news",
        ...(selectedDate?.[0] && { from: selectedDate?.[0] }),
        ...(selectedDate?.[1] && { to: selectedDate?.[1] }),
      }),
    staleTime: 60000,
  });

  const { data: dataGuardian, isLoading: isLoadingGuardian } = useQuery({
    queryKey: [queryKeyGuardian, searchKeyword, selectedDate],
    queryFn: () =>
      getNewsGuardianAPI({
        q: searchKeyword,
        ...(selectedDate?.[0] && { "from-date": selectedDate?.[0] }),
        ...(selectedDate?.[1] && { "to-date": selectedDate?.[1] }),
      }),
    staleTime: 60000,
  });

  const createQueryParamsNYT = (searchKeyword, selectedDate) => {
    const queryParams = { q: searchKeyword };
    if (selectedDate?.[0]) queryParams.begin_date = selectedDate[0];
    if (selectedDate?.[1]) queryParams.end_date = selectedDate[1];
    return queryParams;
  };

  const { data: dataNYT, isLoading: isLoadingNYT } = useQuery({
    queryKey: [nytAPI, searchKeyword, selectedDate],
    queryFn: () =>
      getNewsNYTAPI(createQueryParamsNYT(searchKeyword, selectedDate)),
    staleTime: 60000,
  });

  const getOrDefault = (value, defaultValue) => value || defaultValue;

  const mapDataNewsNYT = (arr = []) => {
    return arr.map((item) => {
      const img = item?.multimedia?.[0]?.url;

      return {
        ...item,
        title: getOrDefault(item?.headline?.main, "-"),
        urlToImage: img ? "https://nytimes.com/" + img : undefined,
        description: getOrDefault(item?.snippet, "-"),
        publishedAt: item?.pub_date,
        author: getOrDefault(item?.byline?.original, "Author"),
        url: item?.web_url,
        sectionName: getOrDefault(
          item?.subsection_name,
          getOrDefault(item?.section_name, "-")
        ),
        source: {
          name: getOrDefault(
            item?.source,
            getOrDefault(item?.source?.name, "-")
          ),
        },
      };
    });
  };

  const mapDataNewsGuardian = (arr = []) => {
    return arr?.map((item) => {
      return {
        ...item,
        title: item?.webTitle,
        url: item?.webUrl,
        urlToImage: item?.fields?.thumbnail,
        description: item?.blocks?.[0]?.bodyTextSummary,
        sectionName: item?.subsectionName || item?.sectionName,
        author:
          item?.tags?.find((it) => it?.type === "contributor")?.webTitle ||
          "Author",
        publishedAt: item?.webPublicationDate,
        source: {
          name: item?.source || item?.source?.name || "The Guardian",
        },
      };
    });
  };

  const assignFilterData = (arr) => {
    const createObject = (item, key) => ({
      [item?.[key]]: {
        value: item[key],
        label: item[key],
      },
    });

    let labels = {};
    let sections = {};
    let authors = {};

    arr?.forEach((it) => {
      labels = { ...labels, ...createObject(it?.source, "name") };
      if (it?.sectionName) {
        sections = { ...sections, ...createObject(it, "sectionName") };
      }
      authors = { ...authors, ...createObject(it, "author") };
    });

    setSourceList((prev) => ({ ...prev, ...labels }));
    setSectionList((prev) => ({ ...prev, ...sections }));
    setAuthorList((prev) => ({ ...prev, ...authors }));
  };

  const mapNewsGeneral = (arr = []) => {
    try {
      return (arr || [])?.map((it) => {
        return {
          ...it,
        };
      });
    } catch (error) {
      return [];
    }
  };

  const mapData = (data, mapper) => {
    try {
      return mapper(data) || [];
    } catch (error) {
      return [];
    }
  };

  const mapNews = () => {
    return [
      ...mapData(dataNYT?.docs, mapDataNewsNYT),
      ...mapData(dataGuardian?.results, mapDataNewsGuardian),
      ...mapData(data?.articles, mapNewsGeneral),
    ];
  };

  const mapNewss = () => {
    try {
      const newsNYT = mapDataNewsNYT(dataNYT?.docs || []);
      const newsGuardian = mapDataNewsGuardian(dataGuardian?.results);

      return [
        ...(newsNYT || []),
        ...(newsGuardian || []),
        ...(mapNewsGeneral(data?.articles) || []),
      ];
    } catch (error) {
      return [];
    }
  };

  const cbList = useMemo(() => {
    try {
      const news = mapNews();
      assignFilterData(news);

      if (selectedSource?.length || selectedSection?.length) {
        const sourceFilter = news?.filter((x) =>
          selectedSource?.includes(x?.source?.name)
        );

        const sectionFilter = news?.filter((x) =>
          selectedSection?.includes(x?.sectionName)
        );

        if (selectedSource?.length && selectedSection?.length) {
          return news?.filter(
            (x) =>
              selectedSource?.includes(x?.source?.name) &&
              selectedSection?.includes(x?.sectionName)
          );
        } else if (selectedSource?.length > 0) {
          return sourceFilter;
        } else if (selectedSection?.length > 0) {
          return sectionFilter;
        }

        return news?.filter((x) => selectedSource?.includes(x?.source?.name));
      }
      return news;
    } catch (error) {
      return [];
    }
  }, [
    selectedSource,
    selectedSection,
    data?.articles,
    dataNYT?.docs,
    dataGuardian?.results,
    prefAuthor,
  ]);

  const newsWithPreference = () => {
    if (prefAuthor?.length) {
      return cbList?.filter((it) => prefAuthor?.includes(it?.author));
    }
    return cbList;
  };

  const objectValues = (object) => Object?.values(object);

  return {
    data: newsWithPreference(),
    sectionList: objectValues(sectionList),
    onSearch,
    search,
    selectedSection,
    setSelectedSource,
    selectedSource,
    setSelectedDate,
    authorList: objectValues(authorList),
    sources: objectValues(sourceList),
    setSelectedSection,
    isLoading: isLoading || isLoadingGuardian || isLoadingNYT,
  };
};

export default useNewsQuery;
