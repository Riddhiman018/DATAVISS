async function checkadmin(req,res,next){
    const role = req.body.ROLE 
    if(!role){
        res.status(200).send({
            Message:'Role Required'
          })
    }
    else{
        if(role!=='Admin'){
            res.status(200).send({
                Message:'Unauthorized'
            })
        }
    }
}
module.exports = {checkadmin}