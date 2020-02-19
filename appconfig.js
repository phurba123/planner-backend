let appConfig =
{
    port:3000,
    env:'dev',
    db:{
        uri:'mongodb://127.0.0.1:27017/meeting-plannerDb'
    },
    allowedCorsOrigin:'*',
    apiVersion:'/api/v1'
}

module.exports =appConfig;