import mongoose from "mongoose";

const cricketerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  jerseyNum: {
    type: Number,
    required: true,
  },

  nationality: {
    type: String,
    required: true,
  },

  format: {
    type: String,
    required: true,
  },

  runs: {
    type: Number,
    required: true,
  },
  innings: {
    type: Number,
    required: true,
  },
  average: {
    type: Number,
    required: true,
  },

  strikeRate: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("cricketers", cricketerSchema);
