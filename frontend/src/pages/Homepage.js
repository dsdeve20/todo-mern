import React from 'react'
import { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Card } from 'react-bootstrap';
import { RiEditCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import UpdateComponent from '../components/UpdateComponent';
import axios from 'axios';

import '../css/style.css'


function Homepage() {
    const [content, setContent] = useState([])
    const [formFieldsData, setFormFieldsData] = useState({ title: "", description: "" })
    const [showUpdateModal, setShowUpdateModel] = useState(0)
    const [updateContent, setUpdateContent] = useState({})
    useEffect(() => {
        getrequest();
    }, [])
    const getrequest = () => {
        axios.get('https://todo-mern-bro1.onrender.com/api/get')
            .then(function (response) {
                setContent(response.data.data)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });
    }
    const deleteRecord = (id) => {
        if (id !== '') {
            axios.delete(`https://todo-mern-bro1.onrender.com/delete/${id}`)
                .then(function (response) {
                    getrequest()
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        }
       
    }
    const addSubmitForm = (e) => {
        e.preventDefault()
        const { title, description } = formFieldsData
        console.log(formFieldsData)
        if (title === '' || title === undefined) {
            alert("Title cannot be blank")
            return false
        }
        if (description === '' || description === undefined) {
            alert("Description cannot be blank")
            return false
        }
        axios.post(`https://todo-mern-bro1.onrender.com/api/create`, {
            title: title,
            description: description
        }).then(function (response) {
            getrequest()
            setFormFieldsData({title:"",description:""})
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });
    }
    const changeinputs = (e) => {
        console.log(e)
        const value = e.target.value
        const name = e.target.name
        setFormFieldsData({ ...formFieldsData, [name]: value })
    }
    const showModel = (_id) => {
        const filtereddata = content.filter((data) => data._id === _id)
        console.log(filtereddata)

        setShowUpdateModel(prevstate => !prevstate)
        setUpdateContent(filtereddata[0])
    }

    return <div>
        <div className="page text">
            <div className="container">
                <h1 className='mb-4'>To Do</h1>
                <Form action="" className='addform' onSubmit={addSubmitForm}>
                    <FloatingLabel
                        controlId="title"
                        label="Title"
                        className="mb-3"

                    >
                        <Form.Control type="text" placeholder="Title" onChange={changeinputs} name="title" value={formFieldsData.title} />
                    </FloatingLabel>
                    <FloatingLabel controlId="textarea" label="Description" >
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            style={{ height: '100px' }}
                            name="description"
                            onChange={changeinputs}
                            value={formFieldsData.description}
                        />
                    </FloatingLabel>
                    <div className="mt-3">
                        <Button variant="outline-success" size="lg" type="submit"> Add</Button>
                    </div>
                </Form>
            </div>
            <div className="container mt-5">
                <div className="taskslist">
                    <div className="row">
                        {
                            content.length > 0 ?
                                [...content].reverse().map((data, index) => {
                                    return <div className="col-4" key={index}>
                                        <div className="task-container mt-4">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>{data.title}</Card.Title>

                                                    <Card.Text>
                                                        {data.description}
                                                    </Card.Text>
                                                    <Button variant="danger" onClick={() => deleteRecord(data._id)} className='w-50'><MdDelete /> Delete</Button>
                                                    <Button variant="success" className="ms-2" onClick={() => showModel(data._id)}><RiEditCircleFill /> Edit</Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                    </div>
                                })
                                :
                                <div className="col-12"><p className="no-records">No record found</p></div>
                        }

                    </div>
                </div>
            </div>
            <UpdateComponent showUpdateModel={showUpdateModal} setShowUpdateModel={setShowUpdateModel} updateContent={updateContent} getrequest={getrequest}/>
        </div>
    </div>
}

export default Homepage