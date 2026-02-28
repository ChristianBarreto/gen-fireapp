import { addDbItem, getDbItem, getDbItems, editDbItem, deleteDbItem } from "./db";
import type { Request, Response } from "express";
import { sortGetData } from "./helpers";
const schema = require("../../src/schema.json");

const getItemFkData = (item: any, endPointname: string): Promise<any> => new Promise((resolve, reject) => {
  const returnItem = {...item};
  const promises: Promise<any>[] = [];
  const resourceSchema = schema.find((res) => res.resource === endPointname);
  const fkFields = resourceSchema.fields.filter((field) => field.type === "fk");

  for (let fkField of fkFields) {
    promises.push(
      getDbItem(fkField.field, item[fkField.field]).then((res) => res)
    );
  }

  Promise.all(promises).then((results) => {
    for (let i = 0; i < fkFields.length; i++) {
      returnItem[fkFields[i].field] = results[i];
    }
    resolve(returnItem);
  });

});

const getListFkData = (data: any[], endPointname: string): Promise<any[]> => new Promise((resolve, reject) => {
  const promises = data.map((item) => {
    return getItemFkData(item, endPointname)
  });
  Promise.all(promises).then((results) => {
    resolve(results);
  });
});

export const getItemsDb = (endPointname: string, req: Request, res: Response) => new Promise((resolve) => {
  getDbItems(endPointname, req.query).then(({ data, totalCount }) => {
    if (!data.length) {
      resolve(res.status(200).json({ data: [], pagination: { total: 0 } }));
    } else {
      getListFkData(data, endPointname).then((dataWithFks) => {
        resolve(res.status(200).json({
          data: dataWithFks.sort((a, b) => sortGetData(a, b, req.query)),
          pagination: { total: totalCount }
        }));
      })
    }
  });
});

export const getItemIdDb = (endPointname: string, req: Request, res: Response) => new Promise((resolve) => {
  getDbItem(endPointname, req.params.id).then((item) => {
    getItemFkData(item, endPointname).then((dataWithFks) => {
      resolve(res.status(200).json(dataWithFks));
    }) 
  }).catch((err) => {
      resolve(res.status(404).json({error: "Item not found"}));
  });
});

export const addItemDb = async (endPointname: string, req: Request, res: Response) => {
  const resp = await addDbItem(endPointname, req.body);
  return res.json(resp);
};

export const editItemIdDb = async (endPointname: string, req: Request, res: Response) => {
  const resp = await editDbItem(endPointname, req.params.id, req.body);
  return res.json(resp);
};

export const deleteItemIdDb = async (endPointname: string, req: Request, res: Response) => {
  const resp = await deleteDbItem(endPointname, req.params.id);
  return res.json(resp);
};
0