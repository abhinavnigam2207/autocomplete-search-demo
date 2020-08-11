
import { validateResponse } from '../network'

export const getUsers = async () => {
  return fetch('https://www.mocky.io/v2/5ba8efb23100007200c2750c')
    .then(validateResponse)
    .then((resp) => resp.data);
};
