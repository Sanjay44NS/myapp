const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers'
const fs = require('fs')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})

bookSchema.virtual('coverImagePath').get(function(){
    
    if(this.coverImageName != null){
        //const file_buffer  = fs.readFileSync(path.join('public', coverImageBasePath, this.coverImageName))
        //const contents_in_base64 = file_buffer.toString('base64');
        //console.log(contents_in_base64)
        //return path.join('/', coverImageBasePath, this.coverImageName)
        const filePath = path.join('public', coverImageBasePath, this.coverImageName)
        return "data:image/jpeg;base64," + fs.readFileSync(filePath, 'base64');
    }
})

module.exports = mongoose.model("Book", bookSchema)
module.exports.coverImageBasePath = coverImageBasePath