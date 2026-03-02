import { ReactNode } from "react";

export type Filter = [string, string]

export type Sort = any;

export type TableHeaderItem = {
  name: string,
  field: string,
  type: 'text' | 'number' | 'fk' | 'long-text' | string,
  fkField?: string,
  nullable?: boolean,
  component?: ReactNode,
}

export interface AnyObject {
  [key: string]: never  
}