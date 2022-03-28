const houseService = require('../services/housing');

function preload(populate){
    return async function (req, res, next){
        const id = req.params.id;
        if(populate){
            res.locals.house = await houseService.getTripAndUsers(id);
        }else{
            res.locals.house = await houseService.getHouseById(id);
        }

        next();
    };
}

module.exports = preload;