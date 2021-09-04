import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
require('dotenv').config();

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            universites: []
        }
    }

    /// ---------------- get API --------------------
    //server.get('/getApi',getApi); http://universities.hipolabs.com/search?country=Jordan
    getApi = async (e) => {
        e.preventDefault();
        let cityName = e.target.country.value;
        console.log(cityName)
        let URL = `${process.env.REACT_APP_SERVER}/getApi?country=${cityName}`;
        let uniData = await axios.get(URL);

        this.setState({
            universites: uniData.data
        })
        console.log('universites', this.state.universites);
    }
    // server.post('/addFav',addFav);
    // ---------- addFav  --------------
    addFav = async (item) => {
        let { user } = this.props.auth0;
        let uniData = {
            country: item.country,
            name: item.name,
            web_pages: item.web_pages,
            email: user.email
        }
        console.log('uniData',uniData);
        let Url = `${process.env.REACT_APP_SERVER}/addFav`;
      let newDaata=  await axios.post(Url, uniData);
console.log('newDaata:',newDaata.data);
    }
    render() {
        return (
            <>
                <Form onSubmit={this.getApi}>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Set Country</Form.Label>
                        <Form.Control type="text" placeholder="Jordan" name="country" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form>

                {this.state.universites.length &&
                    this.state.universites.map((item,key) => {
                        return (

                            <Card key={key} style={{ width: '18rem' }} >

                                <Card.Body>
                                    <Card.Text>
                                      {item.country}
                                    </Card.Text>
                                    <Card.Text>
                                      {item.name}
                                    </Card.Text>
                                    <Card.Text>
                                     <a href={item.web_pages}>web page</a>
                                    </Card.Text>
                                    <Button onClick={() => this.addFav(item)} variant="primary">Add to Fav</Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </>
        )
    }
}

export default withAuth0(Main);
