import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "https://look-me-up-server.herokuapp.com/";
const GET = "GET";
const DELETE = "DELETE";
const POST = "POST";
const PUT = "PUT";

const getToken = async () => {
  let token = await AsyncStorage.getItem("token");
  return token;
};
const ACTION_HANDLERS = {
  [GET]: (url, data, headers) => {
    let queryUrl = url;

    if (data !== undefined) {
      const query = qs.stringify(data);

      queryUrl = `${queryUrl}?${query}`;
    }

    return axios.get(baseUrl + queryUrl, {
      headers,
    });
  },

  [DELETE]: (url, data, headers) =>
    axios.delete(baseUrl + url, { headers, data }),

  [POST]: (url, data, headers) =>
    axios.post(baseUrl + url, data, {
      headers,
    }),

  [PUT]: (url, data, headers) =>
    axios.put(baseUrl + url, data, {
      headers,
    }),
};

function setHeaders({ contentType, authToken }) {
  // set contentType
  if (contentType) {
    axios.defaults.headers.post["Content-Type"] = contentType;
    axios.defaults.headers.post.Accept = "application/json";
  }
  if (authToken) {
    axios.defaults.headers.common.Authorization = `JWT ${authToken}`;
  }
}

function handleError(error) {
  const { response = {} } = error || {};

  return Promise.reject(response.data ? response.data : {});
}
const fetchUrl = ({ type, url, data = {}, config = {} }) => {
  setHeaders(config);
  const handler = ACTION_HANDLERS[type.toUpperCase()];
  return handler(url, data, config.headers)
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

export default fetchUrl;
