import jwt from "jsonwebtoken";
export const auth = (req,res,next)=>{
 try{
     console.log(req.header);
     // console.log(req);
     const token = req.header("x-auth-token");
     jwt.verify(token,process.env.secretkey);
     // console.log(jwt.verify(token,process.env.secretkey));
     next();
 }catch(err){
     res.status(401).send(err.message);
 }
};


export const auth1 = (req, res, next)=>{
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  };