const mongoose = require("mongoose");

const myCourseSchema = new mongoose.Schema(
  {
    course_id: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    coverImg: { type: String },
    author: { type: String, required: true },
    avatar: { type: String },
    published: { type: String, default: new Date() },
    lastUpdate: { type: String, default: new Date() },
    enrolled: { type: String, default: new Date() },
    totalLessons: { type: Number },
    duration: { type: String },
    courseOutline: [
      new mongoose.Schema({
        title: { type: String, required: true },
        course_id: { type: String, required: true },
        lessonNo: { type: Number, required: true },
        videoLink: { type: String },
        quiz_id: { type: String },
        duration: { type: String },
        status: { type: Boolean, default: false },
      }),
    ],
  },
  { timestamps: true }
);

const MyCourse = new mongoose.model("MyCourse", myCourseSchema);

module.exports = MyCourse;
