import axios from "axios";
import { axiosParams, baseUrl } from "./apiInit";
import { RegionResp, RegionsResp } from "./types";
import qs from "qs";
import schema from "../../schema.json";

const getUrl = (resource: string) => {
  const schemaItem = schema.find((s: any) => s.resource === resource);
  return schemaItem ? schemaItem.url : resource;
};

export const getList = async (resource: string, params?: any) => {
  const { data } = await axios.get(`${baseUrl}/${getUrl(resource)}${params ? "?" + qs.stringify(params) : ''}`, axiosParams);
  return data;
}

export const getItemById = async (resource: string, id: string): Promise<RegionResp | void> => {
  const { data } = await axios.get(`${baseUrl}/${getUrl(resource)}/${id}`, axiosParams);
  return data;
};

export const addItem = async (resource: string, body: RegionResp): Promise<RegionResp | void> => {
  const { data } = await axios.post(`${baseUrl}/${getUrl(resource)}/`, body, axiosParams);
  return data;
};

export const editItemById = async (resource: string, id: string, body: RegionResp): Promise<RegionResp | void> => {
  const { data } = await axios.put(`${baseUrl}/${getUrl(resource)}/${id}`, body, axiosParams);
  return data;
};

export const deleteItemById = async (resource: string, id: string): Promise<RegionResp | void> => {
  const { data } = await axios.delete(`${baseUrl}/${getUrl(resource)}/${id}`, axiosParams);
  return data;
};

