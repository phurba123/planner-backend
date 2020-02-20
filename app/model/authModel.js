const mongoose = require('mongoose');
const schema = mongoose.Schema;
const time = require('../lib/timeLib')

const authModel = new schema(
    {
        userId:{
            type:String
        },

        authToken:
        {
            type:String
        },

        tokenSecret:
        {
            type:String
        },

        tokenGenerationTime:
        {
            type:Date,
            default:time.now()
        }
    }
);
mongoose.model('authModel',authModel);
