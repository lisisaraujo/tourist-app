import { SourceCode } from "eslint";
import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

// connecting through mongoose to cards collection in the database.
// it's not case sensitive

const Card = mongoose.models.Cards || mongoose.model("Cards", cardSchema);
export default Card;
