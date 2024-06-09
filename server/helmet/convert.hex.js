const converHex = (id) =>{
    const tem = id.length;
    for(let i = 0 ; i < 24; i++){
        if(i >= id.length){
            id += id.charAt((i - tem));
        }
    }
    return id;
}

module.exports = {
    converHex
}