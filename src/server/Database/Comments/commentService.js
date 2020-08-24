const Comment = require('./commentModel');
const Buzz = require('../Buzz/buzzModel');

exports.addComment = async (newComment) => {
    console.log(newComment);
    const addComment = await Comment.create(newComment);
    let buzz = await Buzz.findById(newComment.buzzId);
    buzz.comments++;
    await buzz.save();
    return addComment;
}

exports.getComments = async (buzzID, pageNo) => {
    let comment = '';
    if(pageNo){
        comment =  await Comment.find({contentType: 'Comment',buzzId: buzzID})
                                .sort({createdOn: -1})
                                .skip(2*(pageNo-1))
                                .limit(2)
                                .populate("commentedBy", "name email picture");                           
    }
    else{
        comment = await Comment.find({contentType: 'Comment', buzzId: buzzID})
                                .sort({createdOn: -1})
                                .limit(2)
                                .populate("commentedBy", "name email picture");
    }
                    
    return comment;
}

exports.getReplies = async (commentID) => {
    const replies = await Comment.find({contentType: 'Reply', parentComment: commentID})
                        .populate("commentedBy", "name email picture")
                        .sort({createdOn: -1});
    return replies;
}

