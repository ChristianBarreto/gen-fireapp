/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
import type { Request, Response } from "express";
import 'dotenv/config';
import {
  getItemsDb,
  getItemIdDb,
  addItemDb,
  editItemIdDb,
  deleteItemIdDb
} from "./ops";

const schema = require("../schema.json");

const app = express();

const envProduction = process.env.FUNCTIONS_EMULATOR !== 'true'

console.log("PRODUCTION", envProduction);

app.use(function(request: Request, response: Response, next: any) {
  response.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

schema.forEach((schemaItem: any) => {
  app.get(`/${schemaItem.url}`, async (req: Request, res: Response) => getItemsDb(schemaItem.resource, req, res));
  app.get(`/${schemaItem.url}/:id`, async (req: Request, res: Response) => getItemIdDb(schemaItem.resource, req, res));
  app.post(`/${schemaItem.url}`, async (req: Request, res: Response) => addItemDb(schemaItem.resource, req, res));
  app.put(`/${schemaItem.url}/:id`, async (req: Request, res: Response) => editItemIdDb(schemaItem.resource, req, res));
  app.delete(`/${schemaItem.url}/:id`, async (req: Request, res: Response) => deleteItemIdDb(schemaItem.resource, req, res));
});

export const genfireapp = onRequest(app);
