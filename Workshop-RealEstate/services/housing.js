const Housing = require('../models/Housing');

async function createHouse(houseData) {
    const house = new Housing(houseData);
    await house.save();
    return house;
}

async function getAllHouses() {
    return Housing.find({}).lean();
}

async function getHouseById(id) {
    return Housing.findById(id).lean();
}

async function getLast3Houser() {
    return Housing.find().sort({ created_at: -1 }).lean();
}

async function editHouse(houseId, houseData) {
    const house = await Housing.findById(houseId);

    house.name = houseData.name;
    house.type = houseData.type;
    house.year = houseData.year;
    house.city = houseData.city;
    house.homeImg = houseData.homeImg;
    house.description = houseData.description;
    house.availablePieces = houseData.availablePieces;
    house.owner = house.owner;

    await house.save();
}

async function deleteHouse(id) {
    await Housing.findByIdAndDelete(id);
}

async function searchHouses(queary) {
    return Housing.find(({ type: new RegExp(`^${queary}$`, 'i') })).lean();
}

async function rentHome(houseId, userId){
    const home = await Housing.findById(houseId);
    console.log(home.rentHome)
    home.rentedHome.push(userId);

    await home.save();
}

module.exports = {
    createHouse,
    getAllHouses,
    getHouseById,
    getLast3Houser,
    editHouse,
    deleteHouse,
    searchHouses,
    rentHome
}