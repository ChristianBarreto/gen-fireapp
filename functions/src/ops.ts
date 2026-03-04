import { addDbItem, getDbItem, getDbItems, editDbItem, deleteDbItem } from "./db";
import type { Request, Response } from "express";
import { sortGetData } from "./helpers";
const schema = require("../../src/schema.json");

const getItemFkData = (item: any, endPointname: string, deep: number = 1): Promise<any> => new Promise((resolve, reject) => {
  if (deep <= 0) {
    resolve(item);
    return;
  }
  const returnItem = {...item};
  const promises: Promise<any>[] = [];
  const resourceSchema = schema.find((res) => res.resource === endPointname);
  const fkFields = resourceSchema.fields.filter((field) => field.type === "fk");

  for (let fkField of fkFields) {
    promises.push(
      getDbItem(fkField.field, item[fkField.field])
        .then((res) => deep > 1 ? getItemFkData(res, fkField.field, deep - 1) : res)
    );
  }

  Promise.all(promises).then((results) => {
    for (let i = 0; i < fkFields.length; i++) {
      returnItem[fkFields[i].field] = results[i];
    }
    resolve(returnItem);
  });

});

const getListFkData = (data: any[], endPointname: string, deep: number = 1): Promise<any[]> => new Promise((resolve, reject) => {
  const promises = data.map((item) => {
    return getItemFkData(item, endPointname, deep)
  });
  Promise.all(promises).then((results) => {
    resolve(results);
  });
});

export const getItemsDb = (endPointname: string, req: Request, res: Response) => new Promise((resolve) => {
  const deep = req.query.deep ? Number(req.query.deep) : 0;

  getDbItems(endPointname, req.query).then(({ data, totalCount }) => {
    if (!data.length) {
      resolve(res.status(200).json({ data: [], pagination: { total: 0 } }));
    } else if (deep <= 0) {
      resolve(res.status(200).json({
        data: data.sort((a, b) => sortGetData(a, b, req.query)),
        pagination: { total: totalCount }
      }));
    } else {
      getListFkData(data, endPointname, deep).then((dataWithFks) => {
        resolve(res.status(200).json({
          data: dataWithFks.sort((a, b) => sortGetData(a, b, req.query)),
          pagination: { total: totalCount }
        }));
      })
    }
  });
});

export const getItemIdDb = (endPointname: string, req: Request, res: Response) => new Promise((resolve) => {
  const deep = req.query.deep ? Number(req.query.deep) : 0;

  getDbItem(endPointname, req.params.id).then((item) => {
    if (deep <= 0) {
      resolve(res.status(200).json(item));
    } else {
      getItemFkData(item, endPointname, deep).then((dataWithFks) => {
        resolve(res.status(200).json(dataWithFks));
      });
    }
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