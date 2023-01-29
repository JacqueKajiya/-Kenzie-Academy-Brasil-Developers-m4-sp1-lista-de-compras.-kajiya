import * as express from 'express';

declare global {
    namespace Express{
        interface Request{
            selectedList:{
                listIndex: number
            },
            selectedItem:{
                index:number
            }
        }
    }
};
