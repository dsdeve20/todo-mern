import React, { useState,useEffect} from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import '../css/updatecomponentStyle.css'
import { ImCross } from "react-icons/im";
import axios from 'axios';

function UpdateComponent(props) {
    console.log(props.updateContent)
    const [formFieldsData,setFormFieldsData] = useState(props.updateContent)
    console.log(formFieldsData)
    const updateForm = (e) => {
        e.preventDefault();
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
        axios.put(`https://todo-mern-bro1.onrender.com/api/update/${formFieldsData._id}`, {
            title: title,
            description: description
        }).then(function (response) {
            props.getrequest()
            props.setShowUpdateModel(ap => !ap)
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });

    }
    useEffect(() => {
        if (props.updateContent) {
            setFormFieldsData(props.updateContent);
        }
      }, [props.updateContent]);

    const changeinputs = (e) => {
        console.log(e)
       const value = e.target.value
       const name = e.target.name
         setFormFieldsData({...formFieldsData,[name]:value})
    }
    return <div className={`${props.showUpdateModel ? 'active' : ''} updatecomponent`}>
        <div className="parentUpdateForm">
            <div className="cross" onClick={() => props.setShowUpdateModel(ap => !ap)}><ImCross /></div>
            <Form action="" className="updateForm" onSubmit={updateForm}>
                <FloatingLabel
                    controlId="title"
                    label="Title"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Title" onChange={changeinputs} name="title" value={formFieldsData.title || ''} />
                </FloatingLabel>
                <FloatingLabel controlId="textarea" label="Description" >
                    <Form.Control
                        as="textarea"
                        placeholder="Description"
                        style={{ height: '100px' }}
                        name="description"
                        onChange={changeinputs}
                        value={formFieldsData.description || ''}
                    />
                </FloatingLabel>
                <div className="mt-3">
                    <Button variant="outline-success" size="lg" type="submit"> Update</Button>
                </div>
            </Form>
        </div>

    </div>
}

export default UpdateComponent