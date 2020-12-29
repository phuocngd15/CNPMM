import axios from 'axios';
import { StatusMiddleWare } from '../share/Alert';

const axiosGet = async props => {
  const { url, ...rest } = props;
  try {
    const response = await axios.get(url, {
      params: {
        ...rest
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const axiosPost = async props => {
  const { url, ...rest } = props;
  try {
    const response = await axios.post(url, rest);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
axios.interceptors.request.use(config => {
  const tk = localStorage.getItem('tk')
    ? JSON.parse(localStorage.getItem('tk'))
    : null;
  if (tk) {
    config.headers.Authorization = `Bearer ${tk}`;
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    const { data } = response;
    if (data && data[0]) {
      const { tk } = data[0];
      if (tk) localStorage.setItem('tk', JSON.stringify(tk));
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export { axiosGet, axiosPost };
