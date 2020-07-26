const Comment = require('./commentModel');

exports.addComment = async (newComment) => {
    const addComment = await Comment.create(newComment);
    return addComment;
}

exports.getComments = async (buzzID) => {
    const comment = await Comment.find({contentType: 'Comment', buzzId: buzzID})
                    .populate("commentedBy", "name email picture");
    
    return comment;
}

exports.getReplies = async (commentID) => {
    const replies = await Comment.find({contentType: 'Reply', parentComment: commentID})
                    .populate("commentedBy", "name email picture");
    console.log('Replies', replies);
    return replies;
}

