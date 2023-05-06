const jwt = require('jsonwebtoken');

const authentication = (req,res,next)=>{
    const token = req.headers.authorization;
    console.log(token)
    if(token){
        const decoded = jwt.verify(token,"Masailibrary");
        if(decoded){
            req.body.userID = decoded.userID;
            console.log("from authentication file",decoded.userID)
            next();
        }else{
            res.status(400).send({"msg":"please Login First"})
        }
    }else{
        res.status(400).send({"msg":"please Login First"})
    }
}

module.exports = {
    authentication
}