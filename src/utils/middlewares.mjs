import { mockUsers } from "./constants.mjs";
export const resolveIndexByUserId=(req,res,next)=>{
    const {body,params:{id}}=req;
    console.log(body)
    const parseId=parseInt(id);
    if(isNaN(parseId))return res.status(400).send({msg:"Bad Request .Invalid Id"});
    const findUserIndex=mockUsers.findIndex((user)=>user.id==parseId);
    if(findUserIndex==-1)return res.sendStatus(404);
    req.findUserIndex=findUserIndex;
    next();
}