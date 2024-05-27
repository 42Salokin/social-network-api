const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
          },
        reactionBody: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
          },
          username: {
            type: String,
            required: true,
          },
      },
      {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        toObject: {
            virtuals: true,
            getters: true
          }
      }
);

module.exports = reactionSchema;
