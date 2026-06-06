const mongoose = require("mongoose");
require("dotenv").config();

const models = require("../modelData/models");

const User = require("./userModel");
const Photo = require("./photoModel");

async function dbLoad() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
    process.exit(1);
  }

  // Clear old data
  await User.deleteMany({});
  await Photo.deleteMany({});
  console.log("Cleared existing data");

  // Load users, map old _id -> new _id
  const mapFakeId2RealId = {};
  const userModels = models.userListModel();

  for (const u of userModels) {
    const userObj = new User({
      login_name: u.login_name,
      first_name: u.first_name,
      last_name: u.last_name,
      location: u.location,
      description: u.description,
      occupation: u.occupation,
    });
    try {
      await userObj.save();
      mapFakeId2RealId[u._id] = userObj._id;
      u.objectID = userObj._id;
      console.log(
        "Adding user:",
        userObj.first_name + " " + userObj.last_name,
        "(login: " + userObj.login_name + ")",
        " with ID ",
        userObj._id
      );
    } catch (error) {
      console.error("Error create user", error);
    }
  }

  // Load photos for each user
  const photoModels = [];
  const userIDs = Object.keys(mapFakeId2RealId);
  userIDs.forEach(function (id) {
    photoModels.push(...models.photoOfUserModel(id));
  });

  for (const photo of photoModels) {
    const photoObj = await Photo.create({
      file_name: photo.file_name,
      date_time: photo.date_time,
      user_id: mapFakeId2RealId[photo.user_id],
    });
    photo.objectID = photoObj._id;

    if (photo.comments) {
      photo.comments.forEach(function (comment) {
        photoObj.comments = photoObj.comments.concat([
          {
            comment: comment.comment,
            date_time: comment.date_time,
            user_id: mapFakeId2RealId[comment.user._id],
          },
        ]);
      });
    }

    try {
      await photoObj.save();
      console.log(
        "Adding photo:",
        photo.file_name,
        " of user ID ",
        photoObj.user_id
      );
    } catch (error) {
      console.error("Error create photo", error);
    }
  }

  console.log("Database loaded successfully!");
  console.log(
    "Available login_names:",
    userModels.map((u) => u.login_name).join(", ")
  );
  mongoose.disconnect();
}

dbLoad().catch((err) => {
  console.error("Error loading database:", err);
  mongoose.disconnect();
  process.exit(1);
});
