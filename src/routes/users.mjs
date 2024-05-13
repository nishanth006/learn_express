import { Router } from "express";
import { query,validationResult,body,checkSchema } from "express-validator";
import {createUserValidationSchema} from '../utils/validationSchema.mjs';
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { mockUsers } from "../utils/constants.mjs";
const router=Router();
router.get('/api/users',query('filter').isString().notEmpty(),(req,res)=>{
    const result=validationResult(req);
    console.log(result);
    console.log(req.query);
    const {query:{filter,value}}=req;
    if(filter && value){
        return res.send(mockUsers.filter((user)=>user[filter].includes(value)))
    }
    res.send(mockUsers)
})

router.post('/api/users',
    checkSchema(createUserValidationSchema),
(req,res)=>{
    const result=validationResult(req);
    console.log(result);
    if(!result.isEmpty()){
        return res.status(400).send({errors:result.array()})
    }
    const {body}=req;
    console.log(body)
    const newUser={
        id:mockUsers.length,
        ...body
    }
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
})
router.get('/api/users/:id',resolveIndexByUserId,(req,res)=>{
    const {findUserIndex}=req;
    const findUser=mockUsers[findUserIndex];
    res.send(findUser);
})
router.put('/api/users/:id',resolveIndexByUserId,(req,res)=>{
    const {body,findUserIndex}=req;
    mockUsers[findUserIndex]={id:mockUsers[findUserIndex].id,...body};
    return res.sendStatus(200);
})

router.patch('/api/users/:id',resolveIndexByUserId,(req,res)=>{
    const {body,findUserIndex}=req;
    mockUsers[findUserIndex]={...mockUsers[findUserIndex],...body};
    return res.sendStatus(200);
})

router.delete('/api/users/:id',resolveIndexByUserId,(req,res)=>{
    const {findUserIndex}=req;
    mockUsers.splice(findUserIndex,1);
    return res.sendStatus(200);
})

export default router;