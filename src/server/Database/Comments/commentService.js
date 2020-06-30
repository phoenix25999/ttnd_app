const Comment = require('./commentModel');

exports.addComment = async (newComment) => {
    const addComment = await Comment.create(newComment);
    return addComment;
}

exports.getComments = async (buzzID) => {
    const comment = await Comment.find({buzzId: buzzID});
    return comment;
}