const path = require("path")
const fs = require("fs")


const Party = require("../models/Party")
const getUserByToken = require("../helpers/getUserByToken")

exports.register = async (req, res) => {
  const { description, party_date, privacy } = req.body
  let photos = req.files?.photos ? req.files.photos : []

  if (photos.length) photos = photos.map(file => file.filename)

  // Check empty fields
  if (description === "null" || party_date === "null")
    return res.status(400)
      .json({ error: "Preencha pelo menos os campos: Descrição e Data." })

  try {
    const token = req.header("auth-token")
    const user = await getUserByToken(token)

    const data = {
      description,
      party_date,
      photos,
      privacy,
      user_id: user._id,
      user_name: user.name,
      date: Date.now()
    }

    await Party.create(data)
      .then(party => {
        res.json({
          error: null,
          message: "Festa publicada com sucesso.",
          party
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: "Erro ao tentar criar evento, tente mais tarde." })
      })
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "Acesso negado!" })
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
  try {
    const reqUserId = req.params.userId
    const token = req.header("auth-token")
    const { _id } = await getUserByToken(token)
    const userIdByToken = _id.toString()

    if (reqUserId === userIdByToken) {
      await Party.find({ user_id: userIdByToken }).sort([['_id', -1]])
        .then(parties => {
          res.json({
            error: null,
            parties
          })

        })
        .catch(err => {
          console.log(err)
          res.status(400).json({ error: "Erro ao buscar festas, tente mais tarde." })
        })
      return
    }
    await Party.find({ user_id: reqUserId, privacy: false }).sort([['_id', -1]])
      .then(parties => {
        res.json({
          error: null,
          parties
        })

      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: "Erro ao buscar festas, tente mais tarde." })
      })

  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Acesso negado!" })
  }
}

exports.party = async (req, res) => {
  try {
    const partyId = req.params.id
    const party = await Party.findOne({ _id: partyId })

    if (party.privacy) {
      const token = req.header("auth-token")
      const { _id } = await getUserByToken(token)
      const userIdByToken = _id.toString()
      const partyUserId = party.user_id.toString()

      if (userIdByToken !== partyUserId)
        return res.status(401).json({ error: "Acesso negado!" })
      return res.json({
        error: null,
        party
      })
    }

    res.json({
      error: null,
      party
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Acesso negado!" })
  }
}

exports.delete = async (req, res) => {
  try {
    const token = req.header("auth-token")
    const { _id: userIdByToken } = await getUserByToken(token)

    const partyId = req.params.id

    const party = await Party.findOne({ _id: partyId, user_id: userIdByToken })
    await party.remove()
      .then(party => {
        res.json({
          error: null,
          msg: "Festa removida com sucesso!"
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: "Erro ao tentar excluir festa, tente mais tarde." })
      })
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "Acesso negado!" })
  }
}

exports.update = async (req, res) => {
  const { description, party_date, privacy, party_id, user_id: reqId, photosRemoved } = req.body

  let photos = req.files?.photos ? req.files.photos : []

  // Check empty fields
  if (description === "null" || party_date === "null")
    return res.status(400)
      .json({ error: "Preencha pelo menos os campos: Descrição e Data." })

  const updateData = {
    description,
    party_date,
    privacy
  }

  if (photos && photos.length) updateData.photos = photos.map(file => file.filename)

  try {
    const token = req.header("auth-token")
    const { _id } = await getUserByToken(token)
    const user_id = _id.toString()

    // Check ids match
    if (reqId !== user_id) return res.status(401).json({ error: "Acesso negado!" })

    await Party.findOneAndUpdate(
      { _id: party_id, user_id },
      { $set: updateData },
      { new: true }
    )
      .then(async party => {

        if (photosRemoved) {
          try {
            const photosDataType = typeof photosRemoved
            const photosToRemove = photosDataType == "object" ? photosRemoved : [photosRemoved]

            // Delete party images 
            photosToRemove.forEach(filename => 
              fs.unlinkSync(path.resolve("tmp", "uploads", filename)))


            await Party.findOneAndUpdate(
              { _id: party_id, user_id },
              {
                $pull: {
                  photos: {
                    $in: photosToRemove
                  }
                }
              },
              { new: true }
            )
          } catch (err) {
            console.log(err)
          }

        }

        res.json({
          error: null,
          msg: "Festa atualizada com sucesso!",
          party
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ error: "Erro ao tentar atualizar dados do evento, tente mais tarde." })
      })

  } catch (err) {
    console.log(err)
    res.status(401).json({ error: "Acesso negado!" })
  }
}

exports.likeParty = async (req, res) => {
  try {
    const partyId = req.params.id
    const token = req.header("auth-token")
    const { _id: userIdByToken } = await getUserByToken(token)

    const likedParty = await Party.findOne({ _id: partyId, likes: userIdByToken })

    if (likedParty) {
      const { likes } = await Party.findOneAndUpdate(
        { _id: partyId, likes: userIdByToken },
        { $pull: { likes: userIdByToken } },
        { new: true }
      )
      return res.json({
        error: null,
        likes
      })
    }

    const { likes } = await Party.findOneAndUpdate(
      { _id: partyId },
      { $push: { likes: userIdByToken } },
      { new: true }
    )

    res.json({
      error: null,
      likes
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Acesso negado!" })
  }
}