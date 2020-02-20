const bcrypt = require('bcrypt');
const logger = require('./loggerLib');

const saltRounds = 10;

let hashPassword = (myPlaintextPassword)=>
{
    let salt =bcrypt.genSaltSync(saltRounds);
    let hash =bcrypt.hashSync(myPlaintextPassword,salt);
    return hash;
}

let comparePassword = (password,hashPassword,cb)=>
{
    bcrypt.compare(password,hashPassword,(err,res)=>
    {
        if(err)
        {
            logger.error(err.message,'generatePasswordLib:comparePassword()',10);
            cb(err,null);
        }
        else
        {
            cb(null,res);
        }
    })
}
module.exports=
{
    hashPassword,
    comparePassword
}