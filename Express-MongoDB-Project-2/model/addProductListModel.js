const mongoose = require ("mongoose");
const productSchema = mongoose.Schema;

let smartphone = new productSchema({
  _id: {
    type: productSchema.Types.ObjectId,
    required: false
},
  name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  });
  module.exports= mongoose.model("myProduct", smartphone);