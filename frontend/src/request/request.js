import axios from 'axios';
import { REACT_APP_API_BASE_URL } from '@/config/serverApiConfig';

import errorHandler from './errorHandler';
import successHandler from './successHandler';

const jwtToken = "Bearer " + window.localStorage.getItem("token").replace(/"/g,'')

const axiosConfig = {
  headers: {
    Authorization: jwtToken
  }
};

axios.defaults.baseURL = REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

const request = {
  create: async ({ entity, jsonData }) => {
    console.log('🚀 Create Request 🚀 ~ file: request.js ~ line 19 ~ create: ~ jsonData', jsonData);

    try {
      const url = entity + '/create'
      const response = await axios.post(url, jsonData, axiosConfig);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async ({ entity, id }) => {
    try {
      const url = entity + '/read/' + id
      const response = await axios.get(url, axiosConfig);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async ({ entity, id, jsonData }) => {
    console.log('🚀 ~ file: request.js ~ line 34 ~ update: ~ id', id);
    console.log('🚀 Update Request 🚀 ~ file: request.js ~ line 42 ~ update: ~ jsonData', jsonData);

    try {
      const url = entity + '/update/' + id
      const response = await axios.patch(url, jsonData, axiosConfig);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async ({ entity, id, options = {} }) => {
    try {
      const url = entity + '/delete/' + id
      const response = await axios.delete(url, axiosConfig);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async ({ entity, options = {} }) => {
    try {
      let filter = options.filter ? 'filter=' + options.filter : '';
      let equal = options.equal ? '&equal=' + options.equal : '';
      let query = `?${filter}${equal}`;

      const url = entity + '/filter' + query
      const response = await axios.get(url, axiosConfig);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async ({ entity, options = {} }) => {
    try {
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);
      // headersInstance.cancelToken = source.token;
      const url = entity + '/search' + query;
      const response = await axios.get(url, axiosConfig);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async ({ entity, options = {} }) => {
    try {
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);

      const url = entity + '/list' + query
      const response = await axios.get(url, axiosConfig);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  post: async ({ entity, jsonData, options = {} }) => {
    try {
      const response = await axios.post(entity, jsonData, axiosConfig);

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async ({ entity }) => {
    try {
      const response = await axios.get(entity, axiosConfig);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async ({ entity, jsonData }) => {
    try {
      const response = await axios.patch(entity, jsonData, axiosConfig);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  source: () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
export default request;
