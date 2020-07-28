const commentService = require('./commentService');

exports.addComment = async (req, res) => {
  let imagePath ='';
  if(req.file){
    imagePath = req.file.path;
  }
  let newComment = {
    content: req.body.comment,
    buzzId: req.params.buzzID,
    contentType: 'Comment',
    commentedBy: req.body.userID,
    image: imagePath
  }

  console.log(req.file);

  try{
      const addedComment = await commentService.addComment(newComment);
      console.log(addedComment);
      res.status(201).send(addedComment);
  } catch(err) {
    console.log(err)
      res.status(400).send(err);
  }
}

exports.getComments = async (req, res) => {
  try{
    const comment = await commentService.getComments(req.params.buzzID);
    res.status(201).send(comment);
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.addReply = async (req, res) => {
  let imagePath ='';
  if(req.file){
    imagePath = req.file.path;
  }
  const { buzzID, commentID } = req.params;

  let newReply = {
    content: req.body.reply,
    buzzId: buzzID,
    contentType: 'Reply',
    commentedBy: req.body.userID,
    parentComment: commentID,
    image: imagePath
  }

  try{
      const addedReply = await commentService.addComment(newReply);
      res.status(201).send(addedReply);
  } catch(err) {
      res.status(400).send(err);
  }
}

exports.getReplies = async (req, res) => {
  try{
    const comment = await commentService.getReplies(req.params.commentID);
    res.status(201).send(comment);
  } catch(err) {
    res.status(400).send(err);
  }
}
