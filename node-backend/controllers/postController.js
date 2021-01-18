const { body, validationResult } = require('express-validator');
const multer = require('multer');
const verifyToken = require('../config/verifyToken');
var AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Models
const User = require('../models/user');
const Post = require('../models/post');
const Portfolio = require('../models/portfolio');
const Comment = require('../models/comment');
const Image = require('../models/image');
const Commented = require('../models/commented');
const { post } = require('../app');

// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object.
// The body object contains the values of the text fields of the form,
// the file or files object contains the files uploaded via the form.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Send list of all Posts (DONE)
exports.post_list = async (req, res, next) => {

  // Get all public posts from database
  let post_list;
  try {
    post_list = await Post.find({ private: false }).populate('image')
                      .populate({ path: 'poster', model: 'Portfolio', populate: { path: 'owner', model: 'User' }}).exec()
  } catch(err) {
    return next(err);
  }

  // Modify post list to liking
  const posts = post_list.map(post => {
    const poster = {
      _id: post.poster._id,
      icon: post.poster.icon,
      owner: post.poster.owner.username,
    };
    return {
      art_type: post.art_type,
      date_posted: post.date_posted,
      hashtags: post.hashtags,
      image: post.image.location, // image URL
      poster: poster, // _id (portfolio id), icon, owner (username)
      private: post.private,
      summary: post.summary,
      title: post.title,
      numberOfComments: (post.numberOfComments || 0),
      _id: post._id
    };
  });

  // Successful, so send
  return res.status(200).json(posts);
};

// Handle Post create (DONE)
exports.post_create = [

  verifyToken,

  // Sanitise fields
  body('title').trim().escape(),
  body('summary').trim().escape(),
  body('hashtags').trim().escape(),

  // Stores image in uploads folder using
  // multer and creates a reference to the file
  // In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
  upload.single('file'),
  
  function(req, res, next) {
    const file = req.file;
    const s3FileUrl = process.env.AWS_UPLOADED_FILE_URL_LINK;

    // AWS credentials
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    // Where you want to store your file
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: Date.now() + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    // Upload to S3 bucket
    s3bucket.upload(params, function(err, data) {
      if (err) { return next(err); }

      // Create a new image object
      const newImage = new Image({
        key: data.Key,
        location: data.Location,
        mimetype: file.mimetype,
        size: file.size,
        type: 'Post',
      });

      // Save new image
      newImage.save(function(err) {
        if (err) { return next(err); }

        // Create a new post object
        const newPost = new Post({
          title: req.body.title,
          summary: req.body.summary,
          art_type: req.body.art_type,
          hashtags: req.body.hashtags,
          private: req.body.private,
          poster: req.portfolio._id, // From verifyToken middleware
          image: newImage._id, // id gets stored after save
          // numberOfComments and date_posted have defaults
        });

        // Save new post
        newPost.save(function(err) {
          if (err) { return next(err); }

          // Return new post information
          return res.status(200).json(newPost);
        });
      });
    });
  }
]

// Send details for a specific Post (DONE)
exports.post_detail = async (req, res, next) => {
  try {
    const response = await Post.findById(req.params.postid).populate('image').populate({ path: 'poster', model: 'Portfolio', populate: { path: 'owner', model: 'User' }}).exec();

    if (response) {
      const data = { ...response._doc, poster: { _id: response._doc.poster._id, icon: response._doc.poster.icon, owner: response._doc.poster.owner.username } };
      return res.status(200).json(data);
    } else {
      return res.status(404).json(["No post found"]);
    }
  } catch(err) {
    return next(err);
  }
};

// Handle Post update (DONE)
exports.post_update = [

  verifyToken,

  async (req, res, next) => {
    const body = req.body;

    const post = {};
    if (body.private === 'false') {
      post.private = true;
    } else {
      post.private = false;
    }

    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.postid, post, { new: true }).exec();
      const populatedPost = await updatedPost.populate('image').populate({ path: 'poster', model: 'Portfolio', populate: { path: 'owner', model: 'User' }}).execPopulate();
      const modifiedPost = { ...populatedPost._doc, poster: { _id: populatedPost._doc.poster._id, icon: populatedPost._doc.poster.icon, owner: populatedPost._doc.poster.owner.username } };
      return res.status(200).json(modifiedPost);
    } catch(err) {
      return next(err);
    }
  }

];

// Handle Post delete (DONE)
exports.post_delete = [

  verifyToken,

  async(req, res, next) => {

    // Find all comments in this post
    let commentArr;
    try {
      commentArr = await Comment.find({ post: req.params.postid }).populate('attachment').exec();
    } catch(err) {
      return next(err);
    }

    // AWS credentials
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    // Delete each comment's image instances (if any)
    try {
      await commentArr.forEach(async (comment) => {

        if (comment.attachment) { // Comment has an image instance

          let params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: comment.attachment.key
          }

          // Delete comment image from S3
          s3bucket.deleteObject(params, async (err, data) => {
            if (err) { return next(err); }

            // Delete image
            try {
              await Image.findByIdAndRemove(comment.attachment._id);
              return;
            } catch(err) {
              return next(err);
            }
          });

        } else { // Comment has no image instance
          return;
        }
      });
    } catch(err) {
      return next(err);
    }

    // Delete commented relationships associated with post
    try {
      await Commented.deleteMany({ postid: req.params.postid }).exec();
    } catch(err) {
      return next(err);
    }

    // Delete comments associated with comment
    try {
      await Comment.deleteMany({ post: req.params.postid }).exec();
    } catch(err) {
      return next(err);
    }

    // Find post
    let post;
    try {
      post = await Post.findById(req.params.postid).populate('image').exec();
    } catch(err) {
      return next(err);
    }

    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: post.image.key
    }

    // Delete post image from S3
    s3bucket.deleteObject(params, async (err, data) => {
      if (err) { return next(err); }

      // Delete image
      try {
        await Image.findByIdAndRemove(post.image._id).exec();
      } catch(err) {
        return next(err);
      }

      // Delete post
      try {
        await Post.findByIdAndRemove(req.params.postid).exec();
      } catch(err) {
        return next(err);
      }

      // Successful
      return res.status(200).json('Successful');
    });
  }
];

// Send list of all Comments (DONE)
exports.comment_list = async (req, res, next) => {

  // Get token (if any)
  const token = req.cookies.token || '';

  if (token) { // User is logged

    // Get userid
    let token_payload;
    try {
      token_payload = await jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      return next(err);
    }
    const userid = token_payload.id;

    // Get original list of comments
    let response;
    try {
      response = await Comment.find({ post: req.params.postid }).populate('poster').populate('attachment').exec();
    } catch(err) {
      return next(err);
    }

    // Get modified list of comments
    const getModifiedList = async () => {
      return Promise.all(response.map(async (comment) => {

        // Look for a relationship
        let relationship;
        try {
          relationship = await Commented.findOne({ portfolioid: userid, commentid: comment._id }).exec();
        } catch(err) {
          return next(err);
        }
  
        if (relationship) { // Relationship between user and comment exists
          comment._doc.status = relationship.status;
          return comment._doc;
        } else { // No relationship between user and comment exists
          comment._doc.status = 'neutral';
          return comment._doc;
        }
      }));
    };

    getModifiedList()
      .then(modifiedList => {
        return res.status(200).json(modifiedList);
      })
      .catch(err => {
        next(err);
      })

  } else { // User is not logged in

    // Get original list of comments and return
    try {
      const response = await Comment.find({ post: req.params.postid }).populate('poster').populate('attachment').exec();
      return res.status(200).json(response);
    } catch(err) {
      return next(err);
    }
  }
};

// Handle Comment create (DONE)
exports.comment_create = [

  verifyToken,

  upload.single('attachment'),

  // Sanitise fields
  body('description').trim().escape(),

  async (req, res, next) => {
    const file =  req.file;

    // Update number of comments on post
    try {
      const post = await Post.findById(req.params.postid).exec();
      post.numberOfComments++;
      await Post.findByIdAndUpdate(req.params.postid, post, {});
    } catch(err) {
      return next(err);
    }

    // Initialize new comment
    let newComment = {
      description: req.body.description,
      poster: req.portfolio._id,
      post: req.params.postid
    };

    if (file) { // Attachment included

      // AWS credentials
      let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });

      // Where you want to store your file
      var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: Date.now() + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
      };

      // Upload to S3 bucket
      s3bucket.upload(params, async function(err, data) {
        if (err) { return next(err); }

        /* Create new image */
        const newImage = new Image({
          key: data.Key,
          location: data.Location,
          mimetype: file.mimetype,
          size: file.size,
          type: 'Comment',
        });

        try {
          await newImage.save();
        } catch(err) {
          return next(err);
        }

        /* Create new comment */
        newComment.attachment = newImage._id;

        try {
          const comment = new Comment(newComment);
          await comment.save();
          const response = await comment.populate('poster').populate('attachment').execPopulate();
          return res.status(200).json(response);
        } catch(err) {
          return next(err);
        }
      });
    } 
    
    else { // No attachment

      const comment = new Comment(newComment);
      try {
        await comment.save();
        const response = await comment.populate('poster').execPopulate();
        return res.status(200).json(response);
      } catch(err) {
        return next(err);
      }
    }
  }
  
];

// Handle Comment delete (DONE)
exports.comment_delete = [

  verifyToken,

  async (req, res, next) => {

    // Find comment
    let commentFound;
    try {
      commentFound = await Comment.findById(req.params.commentid).populate('attachment').exec();
    } catch(err) {
      return next(err);
    }

    // Check if any comment was found
    if (!commentFound) {
      return res.status(404).json('Comment does not exist');
    }

    // See if user is poster (only poster can delete)
    if (commentFound.poster.toString() !== req.portfolio._id.toString()) {
      return res.status(401).json('You are not allowed to delete this comment');
    }

    // Delete commented relationships associated with comment
    try {
      await Commented.deleteMany({ commentid: req.params.commentid }).exec();
    } catch(err) {
      return next(err);
    }
    
    // Find post
    let postFound;
    try {
      postFound = await Post.findById(commentFound.post).exec();
    } catch(err) {
      return next(err);
    }

    // Check if any post was found
    if (!postFound) {
      return res.status(404).json('Post does not exist');
    }

    // Construct updated post with one less comment
    const updatedPost = new Post({
      title: postFound.title,
      summary: postFound.summary,
      art_type: postFound.art_type,
      hashtags: postFound.hashtags,
      private: postFound.private,
      poster: postFound.poster,
      date_posted: postFound.date_posted,
      image: postFound.image,
      numberOfComments: postFound.numberOfComments - 1, // one less comment
      _id: postFound._id,
    });

    // Update post
    try {
      await Post.findByIdAndUpdate(postFound._id, updatedPost, {});
    } catch(err) {
      return next(err);
    }

    if (commentFound.attachment) { // Attachment found

      // AWS credentials
      let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });

      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: commentFound.attachment.key
      }

      // Delete comment image from S3
      s3bucket.deleteObject(params, async (err, data) => {
        if (err) { return next(err); }

        // Delete image
        try {
          await Image.findByIdAndRemove(commentFound.attachment._id);
        } catch(err) {
          return next(err);
        }

        // Delete comment
        try {
          await Comment.findByIdAndRemove(commentFound._id);
          return res.status(200).json('Successful');
        } catch(err) {
          return next(err);
        }
      });
    }

    else { // No attachment found
      
      // Delete comment
      try {
        await Comment.findByIdAndRemove(commentFound._id);
        return res.status(200).json('Successful');
      } catch(err) {
        return next(err);
      }
    }
  }
];

// Handle Comment update (DONE)
exports.comment_update = [

  verifyToken,

  async (req, res, next) => {
    
    // See if any relationship exists between the user and the comment
    let response;
    try {
      response = await Commented.findOne({ portfolioid: req.portfolio._id, commentid: req.params.commentid }).exec();
    } catch(err) {
      return next(err);
    }

    if (response) { // Relationship exists

      let returnStatus;

      // Get comment's number of likes
      let comment;
      try {
        comment = await Comment.findById(req.params.commentid).exec();
      } catch(err) {
        return next(err);
      }

      const newComment = {
        description: comment.description,
        date_posted: comment.date_posted,
        poster: comment.poster,
        post: comment.post,
        _id: comment._id,
      };

      // Comment does not require it
      if (comment.attachment) {
        newComment.attachment = comment.attachment;
      }

      if (response.status === 'like') { // User has liked comment before

        if (req.body.status === 'like') { // User liked comment

          // Delete relationship
          try {
            await Commented.findByIdAndRemove(response._id).exec();
          } catch(err) {
            return next(err);
          }

          newComment.likes = comment.likes - 1; // Take away like
          returnStatus = 'neutral';
        } 
        
        else if (req.body.status === 'dislike') { // User disliked comment

          // Restructure relationship
          const relationship = new Commented({
            postid: response.postid,
            commentid: req.params.commentid,
            portfolioid: response.portfolioid,
            status: req.body.status,
            _id: response._id
          });
          
          // Update relationship
          try {
            await Commented.findByIdAndUpdate(response._id, relationship, {});
          } catch(err) {
            return next(err);
          }

          newComment.likes = comment.likes - 2; // Take away like and add dislike
          returnStatus = 'dislike';
        }

        else {
          return res.status(400).json(['Bad request']);
        }
      } 
      
      else if (response.status === 'dislike') { // User has disliked comment before

        if (req.body.status === 'like') { // User liked comment

          // Restructure relationship
          const relationship = new Commented({
            postid: response.postid,
            commentid: req.params.commentid,
            portfolioid: response.portfolioid,
            status: req.body.status,
            _id: response._id
          });
          
          // Update relationship
          try {
            await Commented.findByIdAndUpdate(response._id, relationship, {});
          } catch(err) {
            return next(err);
          }

          newComment.likes = comment.likes + 2; // Take away dislike and add like
          returnStatus = 'like';
        } 
        
        else if (req.body.status === 'dislike') { // User disliked comment

          // Delete relationship
          try {
            await Commented.findByIdAndRemove(response._id).exec();
          } catch(err) {
            return next(err);
          }

          newComment.likes = comment.likes + 1; // Take away dislike
          returnStatus = 'neutral';
        }

        else {
          return res.status(400).json(['Bad request']);
        }
      } 
      
      else {
        return res.status(400).json(['Bad request']);
      }

      // Update comment's number of likes
      const updatedComment = new Comment(newComment);
      try {
        const retVal = await Comment.findByIdAndUpdate(req.params.commentid, updatedComment, { new: true }).exec();
        const ret = await retVal.populate('poster').populate('attachment').execPopulate();
        ret._doc.status = returnStatus;
        return res.status(200).json(ret);
      } catch(err) {
        return next(err);
      }
    }

    else { // No relationship exists

      /* Create a new relationship */
      const relationship = new Commented({
        postid: req.params.postid,
        commentid: req.params.commentid,
        portfolioid: req.portfolio._id,
        status: req.body.status
      });

      try {
        await relationship.save();
      } catch(err) {
        return next(err);
      }

      // Get comment's number of likes
      let comment;
      try {
        comment = await Comment.findById(req.params.commentid).exec();
      } catch(err) {
        return next(err);
      }

      const newComment = {
        description: comment.description,
        date_posted: comment.date_posted,
        poster: comment.poster,
        post: comment.post,
        _id: comment._id,
      };

      // Comment does not require it
      if (comment.attachment) {
        newComment.attachment = comment.attachment;
      }

      if (req.body.status === 'like') { // User liked comment
        newComment.likes = comment.likes + 1;
      } else if (req.body.status === 'dislike') { // User disliked comment
        newComment.likes = comment.likes - 1;
      } else { // Something else
        return res.status(400).json('Bad request');
      }

      // Update comment's number of likes
      const updatedComment = new Comment(newComment);
      try {
        const retVal = await Comment.findByIdAndUpdate(req.params.commentid, updatedComment, { new: true }).exec();
        const ret = await retVal.populate('poster').populate('attachment').execPopulate();
        ret._doc.status = req.body.status;
        return res.status(200).json(ret);
      } catch(err) {
        return next(err);
      }
    }
  }
];