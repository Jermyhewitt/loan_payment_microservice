const fetch = require('node-fetch');
exports.get = async (url,maxAttempts)=>{

    let attempts = 0;
    while(attempts < maxAttempts)
    {
        try {
            attempts++;
            return await fetch(url);
        } catch (error) {
            await backOff(attempts);
        }
    }
    return Promise.reject("Error getting loan");
    
}

const backOff = async (attempts) =>{
    let backOffTime = 250*2**attempts;
    let jitter = Math.floor(Math.random() * backOffTime);
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,jitter)
    })
   
}