const mongoose = require('mongoose')

const Taskscheme = mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String 
    }
})

const scheme = mongoose.model('task',Taskscheme)
module.exports =  scheme