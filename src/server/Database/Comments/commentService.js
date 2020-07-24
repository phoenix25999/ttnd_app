const Comment = require('./commentModel');

exports.addComment = async (newComment) => {
    const addComment = await Comment.create(newComment);
    return addComment;
}

exports.getComments = async (buzzID) => {
    const comment = await Comment.find({buzzId: buzzID})
                    .populate("commentedBy", "name email picture");
    
    console.log('Comments', JSON.stringify(comment));
    return comment;
}

exports.getReplies = async (commentID) => {
    const replies = await Comment.find({parentComment: commentID})
                    .populate("commentedBy", "name email picture");
    
    return replies;
}

