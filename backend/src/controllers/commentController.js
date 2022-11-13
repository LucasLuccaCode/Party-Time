const mongoose = require("mongoose")
const Comment = require("../models/Comment")
const getUserByToken = require("../helpers/getUserByToken")

exports.getComments = async (req, res) => {
  const { partyId } = req.params

  await Comment.findOne({ partyId: partyId })
    .then(({ comments }) => {
      res.json({
        error: null,
        comments
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: "Publicação não encontrada." })
    })
}

exports.createComment = async (req, res) => {
  const { partyId, comment } = req.body

  try {
    const token = req.header("auth-token")
    const { _id: userIdByToken, name: username } = await getUserByToken(token)

    const commentData = {
      _id: new mongoose.Types.ObjectId(),
      user_id: userIdByToken,
      username,
      comment,
      date: Date.now()
    }

    await Comment.findOneAndUpdate(
      { partyId: partyId },
      { $push: { comments: commentData } },
      { new: true }
    )
      .then(({ comments }) => {
        res.json({
          error: null,
          msg: "Comentário postado.",
          comments
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: "Erro ao adicionar comentário, tente mais tarde." })
      })

  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Acesso negado!" })
  }
}

exports.updateComment = async (req, res) => {
  const { partyId, commentId, comment } = req.body

  try {
    const token = req.header("auth-token")
    const { _id: userIdByToken } = await getUserByToken(token)

    const commentObjectId = new mongoose.Types.ObjectId(commentId)

    await Comment.findOneAndUpdate(
      {
        partyId: partyId,
        comments: {
          $elemMatch: {
            _id: commentObjectId,
            user_id: userIdByToken
          },
        }
      },
      { $set: { "comments.$.comment": comment } },
      { new: true }
    )
      .then(({ comments }) => {
        res.json({
          error: null,
          comments
        })
      })
      .catch(err => {
        console.log(err)
        res.stats(401).json({ error: "Erro ao tentar atualizar comentário." })
      })

  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "Acesso negado!" })
  }

}

exports.deleteComment = async (req, res) => {
  try {
    const { partyId, commentId } = req.params

    const token = req.header("auth-token")
    const { _id: userIdByToken } = await getUserByToken(token)
    const commentObjectId = new mongoose.Types.ObjectId(commentId)


    await Comment.findOneAndUpdate(
      {
        partyId: partyId,
        $or: [
          {
            comments: {
              $elemMatch: {
                _id: commentObjectId,
                user_id: userIdByToken
              }
            }
          },
          {
            partyUserId: userIdByToken
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
      .then(({ comments }) => {
        res.json({
          error: null,
          msg: "Comentário deletado",
          comments
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: "Erro ao excluir comentário, tente mais tarde." })
      })

  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Acesso negado!" })
  }
}