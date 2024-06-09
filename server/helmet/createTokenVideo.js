const createToken = async (roomName,userName) => {
    const { AccessToken } =  await import('livekit-server-sdk');
    
    const at = new AccessToken(process.env.API_KEY, process.env.SECRET_KEY, {
      identity: userName,
      ttl: '10m',
    });
    at.addGrant({ roomJoin: true, room: roomName });
    
    return await at.toJwt();
}

module.exports = {
    createToken
}