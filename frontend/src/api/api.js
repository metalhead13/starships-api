import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getShips = async () => {
  const response = await axios.get(`${API_URL}/nave-general`);
  return response.data;
};

export const getPilots = async (id) => {
  const response = await axios.get(`${API_URL}/piloto/${id}`);
  return response.data;
};

export const updateShip = async (shipName, shipData) => {
  const response = await axios.put(
    `${API_URL}/actualizar-nave/${shipName}`,
    shipData
  );
  return response.data;
};
