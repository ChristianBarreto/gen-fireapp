import { ReactNode } from "react";

export type Filter = [string, string]

export type Sort = any;

export type TableHeaderItem = {
  name: string,
  value: string,
  component?: ReactNode
  text?: boolean,
  fk?: string,
  fkKey: string,
}

export interface AnyObject {
  [key: string]: never  
}