const Courses = require('../models/Courses');
const User = require('../models/User');

async function createCourse(courseData, userId){
    const course = new Courses(courseData);
    const user = await User.findById(userId);
    user.courses.push(course);
    
    await user.save();
    await course.save();
}

async function getAllCourses(){
    return Courses.find({}).sort({ createdAt: -1 }).lean();
}

async function getCourseById(id){
    return Courses.findById(id).populate();
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById
}