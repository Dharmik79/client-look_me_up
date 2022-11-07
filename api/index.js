import axios from "axios";
import qs from "qs";

const baseUrl = "http://192.168.0.116:3000/";
const GET = "GET";
const DELETE = "DELETE";
const POST = "POST";
const PUT = "PUT";

const getToken = () => {
  if (typeof localStorage !== "undefined") {
    let token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      return token;
    }
  }

  return "";
};
const ACTION_HANDLERS = {
  [GET]: (url, data, headers) => {
    let queryUrl = url;

    if (data !== undefined) {
      const query = qs.stringify(data);

      queryUrl = `${queryUrl}?${query}`;
    }

    return axios.get(baseUrl + queryUrl, {
      headers
    });
  },

  [DELETE]: (url, data, headers) =>
    axios.delete(baseUrl + url, { headers, data }),

  [POST]: (url, data, headers) =>
    axios.post(baseUrl + url, data, {
      headers
    }),

  
  [PUT]: (url, data, headers) =>
    axios.put(baseUrl + url, data, {
      headers
    })
};

function setHeaders({ contentType, authToken }) {
  // set contentType
  if (contentType) {
    axios.defaults.headers.post["Content-Type"] = contentType;
    axios.defaults.headers.post.Accept = "application/json";
  }
  if (authToken) {
    axios.defaults.headers.common.Authorization = `JWT ${getToken()}`;
  }
}

function handleError(error) {
  const { response = {} } = error || {};

  const { MESSAGE } = response.data || {};
console.log("Error",error)
 

  return Promise.reject(error);
}
const fetchUrl = ({ type, url, data = {}, config = {} }) => {
  setHeaders(config);
  const handler = ACTION_HANDLERS[type.toUpperCase()];
  console.log("Handlr",handler)
  return handler(url, data, config.headers)
    .then((response) => Promise.resolve(response.data))
    .catch(handleError);
};

export default fetchUrl;
