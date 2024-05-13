import { Router } from "express";

const productsRouter=Router();
productsRouter.get('/api/products',(req,res)=>{
    res.send([
        {id:123, name:"chicken breast",price:"12.99"},
    ])
})


export default productsRouter; 