const Party = require("../models/Party")
const getUserByToken = require("../helpers/getUserByToken")
const mongoose = require("mongoose")

exports.register = async (req, res) => {
  const { title, description, party_date, privacy } = req.body
  let photos = req.files?.photos ? req.files.photos : []

  if (photos.length) photos = photos.map(file => file.filename)

  // Check empty fields
  if (title === "null" || description === "null" || party_date === "null")
    return res.status(400)
      .json({ error: "Preencha pelo menos os campos: titulo, descrição e data." })

  const token = req.header("auth-token")
  const user = await getUserByToken(token)
  const user_id = user._id.toString()

  const data = {
    title,
    description,
    party_date,
    photos,
    privacy,
    user_id,
    user_name: user.name,
    comments: []
  }

  try {
    const party = await Party.create(data)

    res.json({
      error: null,
      party
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao tentar criar evento, tente mais tarde." })
  }
}

exports.allParties = async (req, res) => {
  try {
    const parties = await Party.find({ privacy: false }).sort([['_id', -1]])

    res.json({
      error: null,
      parties
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao buscar eventos." })
  }
}

exports.userParties = async (req, res) => {
  const token = req.header("auth-token")
  const { _id } = await getUserByToken(token)
  const user_id = _id.toString()

  try {
    const parties = await Party.find({ user_id }).sort([['_id', -1]])

    res.json({
      error: null,
      parties
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao buscar festas, tente mais tarde." })
  }
}

exports.party = async (req, res) => {
  const partyId = req.params.id
  try {
    const party = await Party.findOne({ _id: partyId })

    if (party.privacy) {
      const token = req.header("auth-token")
      const { _id } = await getUserByToken(token)
      const user_id = _id.toString()
      const partyUserId = party.user_id.toString()

      if (user_id !== partyUserId) return res.status(401).json({ error: "Acesso negado!" })

      return res.json({ error: null, party })
    }

    res.json({ error: null, party })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Acesso negado!" })
  }
}

exports.delete = async (req, res) => {
  const token = req.header("auth-token")
  const { _id } = await getUserByToken(token)
  const user_id = _id.toString()

  const partyId = req.params.id
  try {
    await Party.deleteOne({ _id: partyId, user_id })

    res.json({
      error: null,
      msg: "Festa removida com sucesso!"
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao tentar deletar evento, tente mais tarde." })
  }
}

exports.update = async (req, res) => {
  const { title, description, party_date, privacy, party_id, user_id: reqId } = req.body

  let photos = req.files?.photos ? req.files.photos : []

  // Check empty fields
  if (title === "null" || description === "null" || party_date === "null")
    return res.status(400)
      .json({ error: "Preencha pelo menos os campos: titulo, descrição e data." })

  const updateData = {
    title,
    description,
    party_date,
    privacy
  }
  if (photos && photos.length) updateData.photos = photos.map(file => file.filename)

  const token = req.header("auth-token")
  const { _id } = await getUserByToken(token)
  const user_id = _id.toString()

  // Check ids match
  if (reqId !== user_id) return res.status(401).json({ error: "Acesso negado!" })

  try {
    const party = await Party.findOneAndUpdate(
      { _id: party_id, user_id },
      { $set: updateData },
      { new: true }
    )

    res.json({
      error: null,
      msg: "Festa atualizada com sucesso!",
      party
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao tentar atualizar dados do evento, tente mais tarde." })
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
  const { _id: user_id } = await getUserByToken(token)
  const commentObjectId = new mongoose.Types.ObjectId(comment_id)


  try {
    const party = await Party.findOne({ _id: party_id })
    const partyId = party._id
    const partyUserId = party.user_id
    console.log({ party_id, user_id, comment_id, partyUserId })

    const { comments } = await Party.findOneAndUpdate(
      {
        _id: partyId,
        comments: {
          $elemMatch: {
            _id: commentObjectId,
            user_id: user_id
          }
        }
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
      party_id: partyId,
      comments
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Erro ao excluir comentário, tente mais tarde." })
  }
}