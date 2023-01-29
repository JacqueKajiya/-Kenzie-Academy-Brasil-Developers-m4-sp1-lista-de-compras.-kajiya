import { Request, Response } from "express";
import  { listOrders, itemId }  from './database';
import { IData, IlistRequiredItemKeys, INewData } from "./interface";

const createList = (request: Request, response : Response) : Response => {
    const list:IData = request.body;
    const id:number = (itemId.length) + 1;

    const newList:INewData = {
        ...list,
        id: id
    };
    
    itemId.push(id)
    listOrders.push(newList)
    
    return response.status(201).json(newList);
}


const getList = (request: Request, response: Response) : Response => {
    return response.status(200).json(listOrders);
}

const getListById = (request: Request, response:Response) : Response =>{
    const listIndex: number = Number(request.selectedList.listIndex);

    return response.status(200).json(listOrders[listIndex])
}


const deleteList = (request: Request, response:Response): Response =>{
    const listIndex: number = request.selectedList.listIndex;

    listOrders.splice(listIndex, 1)

    return response.status(204).send();

}

const deleteItem = (request: Request, response:Response): Response =>{
    const listIndex: number = Number(request.selectedList.listIndex);
    const itemIndex: number = request.selectedItem.index;

    listOrders[listIndex].data.splice(itemIndex, 1)
  
    return response.status(204).send()
}

const updateItem = (request:Request, response:Response) : Response => {
    const {name, quantity} = request.body
    const itemKeys = Object.keys(request.body)
    const requiredKeyItems: Array<IlistRequiredItemKeys> = ["name", "quantity"];

    let validateKeys: boolean = requiredKeyItems.some((key:string) => itemKeys.includes(key));

    const listIndex: number = Number(request.selectedList.listIndex);
    const itemIndex: number = request.selectedItem.index;

    let selectedItem = listOrders[listIndex].data[itemIndex];


    if(!validateKeys){
        return response.status(400).json({
            message: `The editable content should de ${requiredKeyItems}`
        })
    }

    if(typeof name != "string" || typeof quantity != "string"){
        return response.status(400).json({
            message: "The editable content should be a string"
        })
    }

    selectedItem = {...listOrders[listIndex].data[itemIndex], ...request.body}

    return response.status(200).json(selectedItem)
    
};

export { createList, getList, getListById, deleteList, deleteItem, updateItem };
 