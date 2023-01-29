import { Request, Response, NextFunction } from "express";
import { listOrders } from "./database";
import { IlistRequiredItemKeys, IlistRequiredKeys, IDataInfo } from "./interface";

const validateListInfo = (request:Request, response: Response, next: NextFunction): Response | void => {
  const keys: Array<string> = Object.keys(request.body);
  const dataKeys : Array<string> = Object.keys(request.body.data[0])

  const requiredKeys: Array<IlistRequiredKeys> = ["listName", "data"];
  const requiredKeyItems: Array<IlistRequiredItemKeys> = ["name", "quantity"];

  let validateKeys: boolean = requiredKeys.every((key:string) => keys.includes(key));

  const validateItemKeys: boolean = requiredKeyItems.every((key:string) => dataKeys.includes(key))

  if(!validateKeys || keys.length > 2 || dataKeys.length > 2 ){
    return response.status(400).json({
      message: "Invalid input"
    })
  };

  if(!validateItemKeys || dataKeys.length > 2){
    return response.status(400).json({
      message: `Entered input should be ${requiredKeyItems}`
    })
  }

  next()
}

const validateKeyValues = (request: Request, response: Response, next: NextFunction): Response | void => {
  const keyValues : Array<string> = Object.values(request.body);
  const dataValues: Array<IDataInfo> = request.body.data

  if(typeof keyValues[0] !== "string"){
    return response.status(400).send({
      message: "The list name needs to be a string"
    })
  }

  if(dataValues.length === 0){
    return response.status(400).send({
      message: "The list cannot be empty"
    })
  }

  dataValues.map((item) => {
    if(item.name === "" || typeof item.name != "string"){
      return response.status(400).send({
        message: "Item name needs to be a string"
      })
    }
    if(item.quantity === "" || typeof item.quantity != "string"){
      return response.status(400).send({
        message: "Item quantity needs to be a string"
      })
    }
  })

  next();
};

const validateList = (request: Request, response: Response, next: NextFunction): Response | void => {
  const id: number = parseInt(request.params.id);

  const listIndex = listOrders.findIndex((list) => list.id === id);
  
  if (listIndex === -1) {
    return response.status(404).json({
      message: `The list with the id ${id} does not exist!`,
    });
  };

  request.selectedList = {
    listIndex: listIndex,
  };

  next();
};

const validateItem = (request:Request, response: Response, next: NextFunction): Response | void =>{
  let itemName: string = request.params.itemName
  const requiredKeyItems: Array<IlistRequiredItemKeys> = ["name", "quantity"];
  // const keys: Array<string> = Object.keys(request.body);

  listOrders.forEach((list) => {
    let index = list.data.findIndex(item => item.name === itemName);

    if(index === -1){
      return response.status(404).json({
        message:"Item does not exist!"
      })
    }

    list.data.forEach((item) =>{

      if(typeof item.name != "string" || typeof item.quantity != "string"){
        return response.status(404).json({
          message:`The properties ${requiredKeyItems} should be a string`
        })
      }

    })

    request.selectedItem = {
      index: index,
    };
  })

  next();
};


export { validateListInfo, validateList, validateItem, validateKeyValues };
