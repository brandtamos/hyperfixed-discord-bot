const storage = require('node-persist');

const start = async function(){
  await storage.init({dir: 'storage'});
}
start();

const memberCache = {
    userNames: null,
    lastFetched: 0,
    TTL: 5 * 60 * 1000 // 5 minutes in milliseconds
};

async function pickRandomMember(msg) {
    try {
        const now = Date.now();
        const guild = msg.guild;

        //if cache is expired, fetch members from discord
        if (!memberCache.userNames || (now - memberCache.lastFetched) > memberCache.TTL) {
            try {
                // Fetch and store the collection
                const members = await guild.members.fetch({ force: true });
                
                // Update the cache
                memberCache.userNames = members.map(m => m.user.username);;
                memberCache.lastFetched = now;
            } catch (error) {
                console.error("Fetch failed:", error);
                // If fetch fails, try to fallback to existing cache if available
                if (!memberCache.data) return null;
            }
        }
        const randomIndex = Math.floor(Math.random() * memberCache.userNames.length);
        const randomUserName = memberCache.userNames[randomIndex];

        msg.channel.send(randomUserName);
    } catch (error) {
        console.error('Failed to fetch members:', error);
    }
}

async function setBigDog(msg){
    const bigDogName = msg.content.split(/\s+/)[1];
    //expire big dog status in 7 days
    const bigDogExpires = (Math.floor(Date.now())) + (7 * 24 * 60 * 60 * 1000); 

    let bigDogObj = {bigDogName: bigDogName, bigDogExpires: bigDogExpires};
    await storage.setItem('bigDogOfTheWeek', bigDogObj);

    msg.channel.send(bigDogName + ' is Big Dog of the Week');
}

async function getCurrentBigDog(msg){
    const currentBigDog = await storage.getItem('bigDogOfTheWeek');
    if (typeof currentBigDog == 'undefined'){
        msg.channel.send('There is not currently a Big Dog of the Week');
    }
    else{
        const currentTimestamp = new Date().getTime();
        if(currentBigDog.bigDogExpires < currentTimestamp){
            msg.channel.send('There is not currently a Big Dog of the Week');
        }
        else{
            msg.channel.send('The current Big Dog of the Week is ' + currentBigDog.bigDogName);
        }
    }
    
}

exports.pickRandomMember = pickRandomMember;
exports.setBigDog = setBigDog;
exports.getCurrentBigDog = getCurrentBigDog;