const path = require('path')
const express = require('express')
const xss = require('xss')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
    id: folder.id,
    name: xss(folder.name)
})

foldersRouter
    .route('/')
    .get((req, res, next) => {
        FoldersService.getAllFolders(
            req.app.get('db')
        )
        .then(folders => {
            res.json(folders.map(serializeFolder))
        })
        .catch(next)
    })

module.exports = foldersRouter