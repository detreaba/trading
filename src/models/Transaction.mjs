import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  coinSymbol: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
