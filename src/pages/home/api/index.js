import AxiosAPI from "../../../commons/helpers/axios";
import {
  NEWS_API,
  GUARDIAN_API,
  NYTIMES_API,
  APIKEY_NEWS_API,
  APIKEY_GUARDIAN,
  APIKEY_NYTIMES,
} from "../../../commons/constants/config";

export const getNewsAPI = async (payload = {}) => {
  try {
    const result = await AxiosAPI.get(`${NEWS_API}/v2/everything`, {
      params: {
        apiKey: APIKEY_NEWS_API,
        pageSize: 40,
        language: "en",
        ...payload,
      },
    });
    return result?.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getNewsGuardianAPI = async (payload = {}) => {
  try {
    const result = await AxiosAPI.get(
      `${GUARDIAN_API}/search?&show-tags=contributor`,
      {
        params: {
          "api-key": APIKEY_GUARDIAN,
          "show-fields": "thumbnail",
          "show-blocks": "all",
          ...payload,
        },
      }
    );
    return result?.data?.response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getNewsNYTAPI = async (payload = {}) => {
  try {
    const result = await AxiosAPI.get(
      `${NYTIMES_API}/svc/search/v2/articlesearch.json`,
      {
        params: {
          "api-key": APIKEY_NYTIMES,
          ...payload,
        },
      }
    );
    return result?.data?.response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default { getNewsAPI, getNewsGuardianAPI, getNewsNYTAPI };
