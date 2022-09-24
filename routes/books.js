const express = require('express')
const router = express.Router()

//all books
router.get('/', (req, res) => {
    res.render('books/index')
})

//navigate to new book page
router.get('/new', (req, res) => {
    res.render('books/new')
})

//create book
router.post('/', (req, res) => {
    res.send('Create book')
})

module.exports = router