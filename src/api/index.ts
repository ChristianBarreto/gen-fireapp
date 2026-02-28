import axios from "axios";
import { axiosParams, baseUrl } from "./apiInit";
import { RegionResp, RegionsResp } from "./types";
import qs from "qs";


export const getList = async (resource: string, params?: any) => {
  const { data } = await axios.get(`${baseUrl}/${resource}${params ? "?" + qs.stringify(params) : ''}`, axiosParams);
  return data;
}

export const getItemById = async (resource: string, id: string): Promise<RegionResp | void> => {
  const { data } = await axios.get(`${baseUrl}/${resource}/${id}`, axiosParams);
  return data;
};

export const addItem = async (resource: string, body: RegionResp): Promise<RegionResp | void> => {
  const { data } = await axios.post(`${baseUrl}/${resource}/`, body, axiosParams);
  return data;
};

export const editItemById = async (resource: string, id: string, body: RegionResp): Promise<RegionResp | void> => {
  const { data } = await axios.put(`${baseUrl}/${resource}/${id}`, body, axiosParams);
  return data;
};

export const deleteItemById = async (resource: string, id: string): Promise<RegionResp | void> => {
  const { data } = await axios.delete(`${baseUrl}/${resource}/${id}`, axiosParams);
  return data;
};

