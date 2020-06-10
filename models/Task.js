// /models/Task.js

const mongoose = require("mongoose");
const {Schema} = mongoose;

const taskSchema = new Schema({
    title: String,
    date: String,
    complete: Boolean,
    completedDate: String,
})

mongoose.model("tasks", taskSchema);