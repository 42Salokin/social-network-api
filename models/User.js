const { Schema, model } = require("mongoose");
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          maxLength: 50,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address'],
          maxLength: 50,
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
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

// Adds a virtual property `friendCount` to the schema
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

// Creates the User model from the schema
const User = model('user', userSchema);

module.exports = User;
