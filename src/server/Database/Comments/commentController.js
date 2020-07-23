const commentService = require('./commentService');

exports.addComment = async (req, res) => {
  let newComment = {
    content: req.body.comment,
    buzzId: req.params.buzzID,
    contentType: 'Comment',
    commentedBy: req.body.userID
  }

  try{
      const addedComment = await commentService.addComment(newComment);
      res.status(201).send(addedComment);
  } catch(err) {
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

exports.getAllComments = async (req, res) => {
  try{
    const comment = await commentService.getAllComments();
    res.status(201).send(comment);
  } catch(err) {
    res.status(400).send(err);
  }
}