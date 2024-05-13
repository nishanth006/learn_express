import express from "express";
import router from "./routes/users.mjs";
import productsRouter from "./routes/products.mjs";
const app=express();

app.use(express.json())

app.use(router);
app.use(productsRouter);
const PORT=process.env.PORT||3000;


app.get('/',(req,res)=>{
    res.status(200).send({msg:"Hello"})
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})