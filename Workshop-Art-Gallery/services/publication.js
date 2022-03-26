const Publication = require('../models/Publication');
const User = require('../models/User');

async function createArt(artData, userId){
    const art = new Publication(artData);
    const user = await User.findById(userId);
    user.myPublications.push(art);

    await art.save();
    await user.save();
}

async function getAllArt(){
    return Publication.find({}).lean();
}

async function getArtById(id){
    return Publication.findById(id).populate('author', 'username').lean();
}

async function editArt(artId, artData){
    const art = await Publication.findById(artId);

    art.title = artData.title;
    art.technique = artData.technique;
    art.artPic = artData.artPic;
    art.authenticy = artData.authenticy;

    return art.save();
}

async function deleteArt(id){
    await Publication.findByIdAndDelete(id);
}

async function getProfile(userId){
    return User.findById(userId).populate('myPublications','title').populate('userShared', 'title').lean();
}

async function sharePublication(userId, artId){
    const art = await Publication.findById(artId);
    console.log(art)
    art.userShared.push(userId);

    await art.save();
}

module.exports = {
    createArt,
    getAllArt,
    getArtById,
    editArt,
    deleteArt,
    getProfile,
    sharePublication
}