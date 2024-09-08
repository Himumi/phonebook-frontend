import axios from 'axios';

const baseUrl = '/api/phonebook';

const getAll = () => {
  console.log('success fetching all data');
  return axios.get(baseUrl);
};

const addNumber = (newObject) => {
  console.log('success posting a new data');
  return axios.post(baseUrl, newObject);
};

const deleteNumber = (id) => {
  console.log('success deleting data');
  return axios.delete(`${baseUrl}/${id}`);
};

const updateNumber = (id, newObject) => {
  console.log('success updating data');
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getAll, addNumber, deleteNumber, updateNumber };
