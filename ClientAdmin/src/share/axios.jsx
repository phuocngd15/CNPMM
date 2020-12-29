import axios from 'axios';
import { StatusMiddleWare } from './Alert';

const axiosGet = async props => {
  const { url, ...rest } = props;
  try {
    const response = await axios.get(url, {
      params: {
        ...rest
      }
    });
    const { status, data } = response;
    return StatusMiddleWare(status, data) && response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const axiosPost = async props => {
  const { url, ...rest } = props;
  try {
    const response = await axios.post(url, rest);
    const { status, data } = response;
    return StatusMiddleWare(status, data) && response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const axiosDelete = async props => {
  const { url, ...rest } = props;
  try {
    const response = await axios.delete(url, rest);
    const { status, data } = response;
    return StatusMiddleWare(status, data) && response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export { axiosGet, axiosPost, axiosDelete };
