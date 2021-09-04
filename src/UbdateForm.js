import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';


class UbdateForm extends React.Component {

    render() {
        return (
            <>

                <Modal show={this.props.show} onHide={this.props.closeHundler}>
                    <Form onSubmit={this.props.updateFav}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>country</Form.Label>
                            <Form.Control type="text" name="country" defaultValue={this.props.selected.country} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text" name="name" defaultValue= {this.props.selected.name}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword" >
                            <Form.Label>web pages</Form.Label>
                            <Form.Control type="text" name="web_pages" defaultValue={this.props.selected.web_pages }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" placeholder="example@gmail.com" defaultValue={this.props.selected.email} name="email" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                       Save changes
                    </Button>
                    </Form>
                    <Button variant="primary" onClick={this.props.closeHundler}>
                       Close
                    </Button>
                </Modal>
             
            </>
        )
    }
}

export default UbdateForm;
