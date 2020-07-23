const Comment = require('./commentModel');

exports.addComment = async (newComment) => {
    const addComment = await Comment.create(newComment);
    return addComment;
}

exports.getComments = async (buzzID) => {
    console.log('Buzz id', buzzID);
    const comment = await Comment.find({buzzId: buzzID})
                    .populate("commentedBy", "name email picture");
    
    console.log('Comments', JSON.stringify(comment));
    return comment;
}

exports.getAllComments = async () => {

    const comment = await Comment.find({})
                    .populate("commentedBy", "name email picture");
    return comment;
}