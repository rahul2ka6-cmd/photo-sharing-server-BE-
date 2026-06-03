"use strict";

const schemaInfo = {
  load_date_time: "Fri Apr 29 2016 01:45:15 GMT-0700 (PDT)",
  __v: 0,
  _id: "57231f1b30e4351f4e9f4bf6",
};

const im = { _id: "57231f1a30e4351f4e9f4bd7", first_name: "Ian",      last_name: "Malcolm",    location: "Austin, TX",   description: "Should've stayed in the car.", occupation: "Mathematician"   };
const er = { _id: "57231f1a30e4351f4e9f4bd8", first_name: "Ellen",    last_name: "Ripley",     location: "Nostromo",     description: "Lvl 6 rating. Pilot.",         occupation: "Warrant Officer" };
const pt = { _id: "57231f1a30e4351f4e9f4bd9", first_name: "Peregrin", last_name: "Took",       location: "Gondor",       description: "Home is behind, the world ahead...", occupation: "Thain"      };
const rk = { _id: "57231f1a30e4351f4e9f4bda", first_name: "Rey",      last_name: "Kenobi",     location: "D'Qar",        description: "Excited to be here!",          occupation: "Rebel"          };
const al = { _id: "57231f1a30e4351f4e9f4bdb", first_name: "April",    last_name: "Ludgate",    location: "Pawnee, IN",   description: "Witch",                        occupation: "Animal Control"  };
const jo = { _id: "57231f1a30e4351f4e9f4bdc", first_name: "John",     last_name: "Ousterhout", location: "Stanford, CA", description: "CS142!",                       occupation: "Professor"      };

const users = [im, er, pt, rk, al, jo];

const photos = [
  { _id: "57231f1a30e4351f4e9f4bdd", date_time: "2012-08-30 10:44:23", file_name: "ouster.jpg",   user_id: jo._id },
  { _id: "57231f1a30e4351f4e9f4bde", date_time: "2009-09-13 20:00:00", file_name: "malcolm2.jpg", user_id: im._id },
  { _id: "57231f1a30e4351f4e9f4bdf", date_time: "2009-09-13 20:05:03", file_name: "malcolm1.jpg", user_id: im._id },
  { _id: "57231f1a30e4351f4e9f4be0", date_time: "2013-11-18 18:02:00", file_name: "ripley1.jpg",  user_id: er._id },
  { _id: "57231f1a30e4351f4e9f4be1", date_time: "2013-09-20 17:30:00", file_name: "ripley2.jpg",  user_id: er._id },
  { _id: "57231f1a30e4351f4e9f4be2", date_time: "2009-07-10 16:02:49", file_name: "kenobi1.jpg",  user_id: rk._id },
  { _id: "57231f1a30e4351f4e9f4be3", date_time: "2010-03-18 23:48:00", file_name: "kenobi2.jpg",  user_id: rk._id },
  { _id: "57231f1a30e4351f4e9f4be4", date_time: "2010-08-30 14:26:00", file_name: "kenobi3.jpg",  user_id: rk._id },
  { _id: "57231f1a30e4351f4e9f4be5", date_time: "2013-12-03 09:02:00", file_name: "took1.jpg",    user_id: pt._id },
  { _id: "57231f1a30e4351f4e9f4be6", date_time: "2013-12-03 09:03:00", file_name: "took2.jpg",    user_id: pt._id },
  { _id: "57231f1a30e4351f4e9f4be7", date_time: "2013-09-04 09:16:32", file_name: "ludgate1.jpg", user_id: al._id },
  { _id: "57231f1a30e4351f4e9f4be8", date_time: "2008-10-16 17:12:28", file_name: "kenobi4.jpg",  user_id: rk._id },
];

const comments = [
  { _id: "57231f1a30e4351f4e9f4be9", date_time: "2012-09-02 14:01:00", comment: "Learning new programming languages is hard... it's so easy to forget a </div>!", user: jo, photo_id: "57231f1a30e4351f4e9f4bdd" },
  { _id: "57231f1a30e4351f4e9f4bea", date_time: "2013-09-06 14:02:00", comment: "This is another comment, with a bit more text; if the text gets long enough, does it wrap properly from line to line?", user: jo, photo_id: "57231f1a30e4351f4e9f4bdd" },
  { _id: "57231f1a30e4351f4e9f4beb", date_time: "2013-09-08 14:06:00", comment: "If you see this text in boldface then HTML escaping isn't working properly.", user: jo, photo_id: "57231f1a30e4351f4e9f4bdd" },
  { _id: "57231f1a30e4351f4e9f4bec", date_time: "2009-09-14 18:07:00", comment: "Life finds a way.", user: im, photo_id: "57231f1a30e4351f4e9f4bde" },
  { _id: "57231f1a30e4351f4e9f4bed", date_time: "2013-11-28 17:45:13", comment: "Back from my trip. Did IQs just... drop sharply while I was away?", user: er, photo_id: "57231f1a30e4351f4e9f4be1" },
  { _id: "57231f1a30e4351f4e9f4bee", date_time: "2013-11-02 14:07:00", comment: "Hey Rey, great form. Love what you do with the scavenged tech, got any tips?", user: er, photo_id: "57231f1a30e4351f4e9f4be3" },
  { _id: "57231f1a30e4351f4e9f4bef", date_time: "2013-11-02 14:09:15", comment: "Definitely! Let's meet up when I get back! :)", user: rk, photo_id: "57231f1a30e4351f4e9f4be3" },
  { _id: "57231f1a30e4351f4e9f4bf0", date_time: "2010-09-06 13:59:33", comment: "Made a new friend today! Well, they followed me home, anyway.", user: rk, photo_id: "57231f1a30e4351f4e9f4be4" },
  { _id: "57231f1a30e4351f4e9f4bf1", date_time: "2008-10-16 18:04:55", comment: "Completely built from scraps by hand!", user: rk, photo_id: "57231f1a30e4351f4e9f4be8" },
  { _id: "57231f1a30e4351f4e9f4bf2", date_time: "2013-12-04 13:12:00", comment: "What do you mean you haven't heard of second breakfast?", user: pt, photo_id: "57231f1a30e4351f4e9f4be6" },
  { _id: "57231f1a30e4351f4e9f4bf3", date_time: "2013-09-04 10:14:32", comment: "Beautiful yet cold and aloof. Does not obey, occasionally chooses to cooperate.", user: al, photo_id: "57231f1a30e4351f4e9f4be7" },
  { _id: "57231f1a30e4351f4e9f4bf4", date_time: "2016-01-04 02:00:01", comment: "Which one are you?", user: al, photo_id: "57231f1a30e4351f4e9f4be5" },
  { _id: "57231f1a30e4351f4e9f4bf5", date_time: "2016-01-04 02:04:01", comment: "The tall one.", user: pt, photo_id: "57231f1a30e4351f4e9f4be5" },
];

comments.forEach((comment) => {
  const photo = photos.find((p) => p._id === comment.photo_id);
  if (photo) {
    if (!photo.comments) photo.comments = [];
    photo.comments.push(comment);
  }
});

module.exports = {
  userListModel:    () => users,
  userModel:        (userId) => users.find((u) => u._id === userId) || null,
  photoOfUserModel: (userId) => photos.filter((p) => p.user_id === userId),
  schemaInfo:       () => schemaInfo,
};
