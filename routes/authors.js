const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All Authors
router.get('/', (req, res) => {
    var reqParams = {}
    
    if(req.query.author != null){
        reqParams.name = {$regex: req.query.author, $options: 'i'}
    }
    Author.find(reqParams, function(err, authors){
        res.render('authors/index', {authors: authors, author: req.query.author})
    })
    
})

//new author route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

//Create new author
router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    author.save((err, newAuthor) => {
        if(err){
            res.render("authors/new", {
                author: newAuthor,
                errorMessage: 'Error creating Author'
            })
        }else{
            //res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
        }
    })
})

module.exports = router