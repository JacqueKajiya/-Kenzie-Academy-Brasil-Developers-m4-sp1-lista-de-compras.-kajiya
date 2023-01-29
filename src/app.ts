import express, { Application } from 'express'
import { createList, getList, getListById, deleteList, deleteItem, updateItem } from './logic';
import { validateListInfo, validateList, validateItem, validateKeyValues } from './middlewares';

const app: Application = express();
app.use(express.json());

app.post('/purchaseList', validateListInfo, validateKeyValues, createList);
app.get('/purchaseList', getList);
app.get('/purchaseList/:id', validateList, getListById);
app.patch('/purchaseList/:id/:itemName', validateList, validateItem, updateItem);
app.delete('/purchaseList/:id/:itemName', validateList, validateItem, deleteItem);
app.delete('/purchaseList/:id', validateList,  deleteList);


const PORT:number = 3000;
const runningMsg:string = `Server is running on http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(runningMsg)
});
