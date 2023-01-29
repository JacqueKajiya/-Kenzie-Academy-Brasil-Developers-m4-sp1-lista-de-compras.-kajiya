import express, { Application } from "express";

const app: Application = express();
app.use(express.json());

interface IData{
    listName: string;
    data: IDataInfo[];
}

interface IDataInfo{
    name: string;
    quantity: string;
}

interface INewData extends IData {
    id:number;
}

type IlistRequiredKeys = "listName" | "data";

type IlistRequiredItemKeys = "name" | "quantity";

export  { IData, IDataInfo, INewData, IlistRequiredKeys, IlistRequiredItemKeys }