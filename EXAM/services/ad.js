const Ad = require('../models/Ad');
const User = require('../models/User');

async function createAd(adData, id) {
    const ad = new Ad(adData);
    const user = await User.findById(id);
    await ad.save();
    user.myAds.push(ad._id);

    await user.save();
}

async function getAllAds() {
    return Ad.find({}).lean();
}

async function getAdById(id) {
    return Ad.findById(id).populate('author', 'email').populate('usersApplied', 'email descSkills').lean();
}

async function editAd(adId, adData) {
    const ad = await Ad.findById(adId);

    ad.headline = adData.headline;
    ad.location = adData.location;
    ad.companyName = adData.companyName;
    ad.companyDescription = adData.companyDescription;

    await ad.save();
}

async function deleteAd(id){
    await Ad.findByIdAndDelete(id);
}

async function searchAd(queary) {
    return User.findOne({ email: new RegExp(`^${queary}$`, 'i') }).populate('myAds').lean();
}

async function apply(userId, adId){
    const ad = await Ad.findById(adId);
    ad.usersApplied.push(userId);
    await ad.save();
}

module.exports = {
    createAd,
    getAllAds,
    getAdById,
    editAd,
    deleteAd,
    searchAd,
    apply
}