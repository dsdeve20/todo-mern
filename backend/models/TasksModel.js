import { Schema, model } from 'mongoose'

const Taskscheme = Schema({
    title:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String 
    }
})

const scheme = model('task',Taskscheme)
export default  scheme