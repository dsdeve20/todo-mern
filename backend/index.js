
const express = require('express')
const mongoose = require('mongoose')
const TasksModel = require('./models/TasksModel.js')
var cors = require('cors')

const app = express()

app.use(cors())

const port = "2000"

//Middleware parses incoming json request
app.use(express.json());

//Connection to database
//const url = 'mongodb://localhost:27017/todolist'
const url  = 'mongodb+srv://dsdeve20:w6NTobxDQTZ8kRxZ@cluster0.mcydg.mongodb.net/'
mongoose.connect(url).then(() => console.log('Db Connected')).catch((error) => console.log(error))

app.get('/api/get', async (req, res) => {
    try {
       
        const getAllRecords = await TasksModel.find({})
        console.log(getAllRecords)
        return res.status(200).json({ message: "Task list" ,'data':getAllRecords})
    }
    catch (error) {
        return res.status(400).json({ message: "Some issue while collecting records Task" ,'error':error})
    }
})



app.post('/api/create', async (req, res) => {
    try {
        console.log(req.body)

        const {title, description} = req.body
       
        const createTask = await new TasksModel({
            "title":title,
            "description":description
        })
        createTask.save()

        return res.status(200).json({ message: "Task created" ,'data':createTask})
    }
    catch (error) {
        return res.status(400).json({ message: "Some issue while saving Task" ,'error':error})
    }
})


app.put('/api/update/:id', async (req, res) => {
    try {
        const  id = req.params.id
        const {title, description} = req.body
        const updateTask = await TasksModel.updateOne({'_id':id},{
            "title":title,
            "description":description
        })
        return res.status(200).json({ message: "Task updated" ,'data':updateTask})
    }
    catch (error) {
        return res.status(400).json({ message: "Some issue while updating Task" ,'error':error})
    }
})


app.delete('/api/delete/:id', async (req, res) => {
    try {
        const  id = req.params.id
        const deleteTask = await TasksModel.deleteOne({'_id':id})
        return res.status(200).json({ message: "Task deleted" ,'data':deleteTask})
    }
    catch (error) {
        return res.status(400).json({ message: "Some issue while updating Task" ,'error':error})
    }
})



app.listen(port, () => {
    console.log(`App Connect at port ${port}`)
})
