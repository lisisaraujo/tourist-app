import { SourceCode } from "eslint";
import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: false },
  description: { type: String, required: true },
  id: { type: String, required: true },
});

// connecting through mongoose to cards collection in the database.
// it's not case sensitive

const Card = mongoose.models.Cards || mongoose.model("Cards", cardSchema);
export default Card;
