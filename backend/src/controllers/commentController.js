const mongoose = require("mongoose")
const Party = require("../models/Party")
const getUserByToken = require("../helpers/getUserByToken")

exports.getComments = async (req, res) => {
  const party_id = req.params.id

  const token = req.header("auth-token")
  const { _id: reqUserId } = await getUserByToken(token)

  try {
    const party = await Party.findOne({ _id: party_id })
    const partyId = party._id
    const partyUserId = party.user_id
    console.log({ partyUserId, reqUserId })

    const { comments } = await Party.findOne({ _id: partyId, user_id: reqUserId })

    res.json({
      error: null,
      comments
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Publicação não encontrada." })
  }
}

exports.createComment = async (req, res) => {
  const { party_id, comment } = req.body

  const token = req.header("auth-token")
  const { _id: user_id, name: username } = await getUserByToken(token)

  const commentData = {
    _id: new mongoose.Types.ObjectId(),
    user_id,
    username,
    comment
  }

  try {
    const { comments } = await Party.findOneAndUpdate(
      { _id: party_id },
      { $push: { comments: commentData } },
      { new: true }
    )

    res.json({
      error: null,
      msg: "Comentário postado.",
      comments
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao adicionar comentário, tente mais tarde." })
  }
}

exports.deleteComment = async (req, res) => {
  const { party_id, comment_id } = req.params

  const token = req.header("auth-token")
  const { _id: reqUserId } = await getUserByToken(token)
  const commentObjectId = new mongoose.Types.ObjectId(comment_id)


  try {
    const { comments } = await Party.findOneAndUpdate(
      {
        _id: party_id,
        $or: [
          {
            comments: {
              $elemMatch: {
                _id: commentObjectId,
                user_id: reqUserId
              }
            }
          },
          {
            user_id: reqUserId
          }
        ]
      },
      {
        $pull: {
          comments: {
            _id: commentObjectId
          }
        }
      },
      { new: true }
    )

    res.json({
      error: null,
      msg: "Comentário deletado",
      comments
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao excluir comentário, tente mais tarde." })
  }
}