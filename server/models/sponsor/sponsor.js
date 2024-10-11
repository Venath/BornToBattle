const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sponsorSchema = new Schema({
  sponsorName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  sponsorPosition: {
    type: String,
    required: true,
  },
  sponsorType: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: Number,
    required: true,
  },
  companyPhone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

module.exports = Sponsor;
