import axios from 'axios';

const API_TIMEOUT = 2000;

export const fetchApi = async ({
  url,
  path,
  method = 'GET',
  data,
  params,
  headers,
  isExternalResource,
  ...rest
}) => {
  const finalHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // console.info(`%c[${method}]%c ${url || `${path}`}`, {
  //   params,
  //   data,
  //   headers: finalHeaders,
  // });

  const response = await axios({
    timeout: API_TIMEOUT,
    url: url || path,
    method,
    data,
    params,
    headers: finalHeaders,
    ...rest,
  });

  console.log(
    `%c[${response.status}][${method}] ${url || `${path}`}`,
    response.data,
  );

  return response.data;
};
