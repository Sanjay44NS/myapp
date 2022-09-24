const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All Authors
router.get('/', async (req, res) => {
    var reqParams = {}
    
    if(req.query.author != null && req.query.author != ''){
        reqParams.name = {$regex: req.query.author, $options: 'i'}
    }
    try{
       const authors = await Author.find(reqParams)
       res.render('authors/index', {authors: authors, author: req.query.author})
    }catch{

    }
})

//new author route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

//Create new author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    }catch{
        res.render("authors/new", {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router