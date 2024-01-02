import { Schema, model, models } from "mongoose";

const SuggestionSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

const Suggestion = models.Suggestion || model("Suggestion", SuggestionSchema);

export default Suggestion;
