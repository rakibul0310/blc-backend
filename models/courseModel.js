const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  regularPrice: { type: Number, required: true },
  offerrPrice: { type: Number, required: true },
  coverImg: { type: String },
  author: { type: String, required: true },
  avatar: { type: String },
  published: { type: String, default: new Date() },
  lastUpdate: { type: String, default: new Date() },
  enrolled: { type: Number },
  totalLessons: { type: Number },
  rating: { type: Number },
  ratingCount: { type: Number },
  duration: { type: String },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "All"],
    default: "Beginner",
  },
  courseOutline: [
    new mongoose.Schema({
      title: { type: String, required: true },
      course_id: { type: String, required: true },
      lessonNo: { type: Number, required: true },
      videoLink: { type: String },
      quiz_id: { type: String },
    }),
  ],
});

const Course = new mongoose.model("Course", courseSchema);

module.exports = Course;
