// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async');
const Comment = require('./models/comment');
const Image = require('./models/image');
const Portfolio = require('./models/portfolio');
const Post = require('./models/post');
const User = require('./models/user');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const comments = []
const images = []
const portfolios = []
const posts = []
const users = []

function userCreate(username, password, cb) {
  const user = new User({ username, password });

  user.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New User: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function imageCreate(name, data, cb) {
  const image = new Image({ name, data });

  image.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Image: ' + image);
    images.push(image);
    cb(null, image);
  });
}

function portfolioCreate(owner, biography, icon, avatar, cb) {
  const portfoliodetail = { owner, icon };
  if (biography != false) portfoliodetail.biography = biography;
  if (avatar != false) portfoliodetail.avatar = avatar;

  const portfolio = new Portfolio(portfoliodetail);

  portfolio.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Portfolio: ' + portfolio);
    portfolios.push(portfolio);
    cb(null, portfolio);
  });
}

function postCreate(title, summary, art_type, hashtags, private, date_posted, poster, image, cb) {
  const post = new Post({ title, summary, art_type, hashtags, private, poster, image });

  post.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Post: ' + post);
    posts.push(post);
    cb(null, post);
  });
}

function commentCreate(description, likes, date_posted, poster, post, attachment, cb) {
  const commentdetail = { description, poster, post };
  if (date_posted != false) commentdetail.date_posted = date_posted;
  if (attachment != false) commentdetail.attachment = attachment;

  const comment = new Comment(commentdetail);

  comment.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Comment: ' + comment);
    comments.push(comment);
    cb(null, comment);
  });
}

function createImageUsers(cb) {
  async.series([
    function(callback) {
      userCreate('Polvyer', 'password', callback);
    },
    function(callback) {
      userCreate('jasthebaka', 'password', callback);
    },
    function(callback) {
      userCreate('Pokemon7thst', 'password', callback);
    },
    function(callback) {
      imageCreate("avatar.jpeg", "./uploads/avatar.jpeg", callback);
    },
    function(callback) {
      imageCreate("post_image.jpg", "./uploads/post_image.jpg", callback);
    },
    function(callback) {
      imageCreate("comment_image.png", "./uploads/comment_image.png", callback);
    },
  ],
  // optional callback
  cb);
}

function createPortfolios(cb) {
  async.parallel([
    function(callback) {
      portfolioCreate(users[0], 'I love pancakes', 'Anonymous', images[0], callback);
    },
    function(callback) {
      portfolioCreate(users[1], 'I am jasthebaka', 'Hobbyist', false, callback);
    },
    function(callback) {
      portfolioCreate(users[2], false, 'Student', false, callback);
    },
  ],
  // optional callback
  cb);
}

function createPosts(cb) {
  async.parallel([
    function(callback) {
      postCreate('Is p=np?', 'I need help figuring this out!', 'Drawing', '#difficult', false, false, portfolios[0], images[1], callback);
    },
  ],
  // optional callback
  cb);
}

function createComments(cb) {
  async.parallel([
    function(callback) {
      commentCreate('I recommend more colors!', false, false, portfolios[0], posts[0], images[2], callback);
    },
  ],
  // optional callback
  cb);
}

async.series([
    createImageUsers,
    createPortfolios,
    createPosts,
    createComments
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('Users: ' + users);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});