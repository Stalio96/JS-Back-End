const Trip = require('../models/Trip');

async function getAllTrips() {
    return Trip.find({}).lean();
}

async function getTripById(id) {
    return Trip.findById(id).lean();
}

async function getTripAndUsers(id) {
    return Trip.findById(id).populate('owner').populate('buddies').lean();
}

async function getTripsByUser(id) {
    return Trip.find({ owner: id }).lean();
}

async function createTrip(trip) {
    const result = new Trip(trip);

    await result.save();

    return result;
}

async function editTrip(id, trip) {
    const existing = await Trip.findById(id);

    existing.start = trip.start;
    existing.end = trip.end;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.carImg = trip.carImg;
    existing.carBrand = trip.carBrand;
    existing.seats = Number(trip.seats);
    existing.price = Number(trip.price);
    existing.description = trip.description;
    existing.owner = trip.owner;


    await existing.save();
}

async function deleteTrip(id) {
    await Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);

    if (trip.buddies.includes(userId)) {
        throw new Error('You already have been listed');
    }
    trip.buddies.push(userId);

    await trip.save();
}

module.exports = {
    createTrip,
    getTripById,
    getTripAndUsers,
    getAllTrips,
    editTrip,
    deleteTrip,
    joinTrip,
    getTripsByUser
}