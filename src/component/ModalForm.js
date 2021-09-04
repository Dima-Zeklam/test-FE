import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
require('dotenv').config();

class ModalForm extends React.Component {
    // updateFav={this.updateFav}
    // selected={this.state.selected}
    // show={this.state.show}
    // closeHandler = {this.closeHandler}
    // country:e.target.country.value,
    // name:e.target.name.value,
    // web_pages:e.target.web_pages.value,
    // email:e.target.email.value
    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.closeHandler}>
                    <Form onSubmit={this.props.updateFav}>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" name="country" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text" name="name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>web_pages</Form.Label>
                            <Form.Control type="text" name="web_pages" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="text" name="email" />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            Save changes
                        </Button>
                    </Form>
                    <Button variant="primary" onClick={this.props.closeHandler}>
                        close
                    </Button>
                </Modal>
            </>
        )
    }
}

export default ModalForm;