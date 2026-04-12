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

const routes = schema.map((res: any) => res.resource);

app.get(`/test`, async (req: Request, res: Response) => res.send("test"));

routes.forEach((route: any) => {
  app.get(`/${route}`, async (req: Request, res: Response) => getItemsDb(route, req, res));
  app.get(`/${route}/:id`, async (req: Request, res: Response) => getItemIdDb(route, req, res));
  app.post(`/${route}`, async (req: Request, res: Response) => addItemDb(route, req, res));
  app.put(`/${route}/:id`, async (req: Request, res: Response) => editItemIdDb(route, req, res));
  app.delete(`/${route}/:id`, async (req: Request, res: Response) => deleteItemIdDb(route, req, res));
});

export const genfireapp = onRequest(app);
