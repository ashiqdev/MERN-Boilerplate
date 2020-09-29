import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  desc: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Post", postSchema);
