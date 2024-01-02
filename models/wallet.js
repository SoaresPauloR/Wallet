import { Schema, model, models } from "mongoose";

const WalletSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  value: {
    type: Schema.Types.Decimal128,
    required: [true, "Value is required!"],
  },
});

const Wallet = models.Wallet || model("Wallet", WalletSchema);

export default Wallet;
