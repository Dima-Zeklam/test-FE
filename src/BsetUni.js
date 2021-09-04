import React from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button,Card } from 'react-bootstrap';
import axios from 'axios';
require('dotenv').config();
// import ShowUni from './ShowUni';


class BsetUni extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      universities: []

    }
  }

  // server.get('/getApi', getApi);
  // server.post('/addFav', addFav);
  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  //----------- Get from API ---------
  getApi = async (e) => {
    e.preventDefault();
    let city = e.target.country.value;
    console.log('cityName: ', city);
    let url = `${process.env.REACT_APP_SERVER}/getApi?country=${city}`;
    let UniData = await axios.get(url);
    // console.log("UniData:", UniData.data);
    this.setState({
      universities: UniData.data
    })
    console.log("universities:", this.state.universities);
  }

  // ------------- Add To Favourit -------------
  addFav = async (ele) => {
    const { user } = this.props.auth0;
    let uniData = {
      country: ele.country,
      name: ele.name,
      web_pages: ele.web_pages,
      email: user.email
    }
    console.log('uniData', uniData);
    let url = `${process.env.REACT_APP_SERVER}/addFav`;
    let FavData = await axios.post(url, uniData);
    console.log('FavData:', FavData.data)
    // this.setState({
    //   favourit: FavData.data
    // })
  }

  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <Form onSubmit={this.getApi}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>country</Form.Label>
            <Form.Control type="text" placeholder="Jordan" name="country" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>

        {this.state.universities.length ? (
          this.state.universities.map((item, key) => {
            return (

              <Card key={key} style={{ width: '18rem' }}>

                <Card.Body>
                  <Card.Text>
                    {item.country}
                  </Card.Text>
                  <Card.Text>
                    {item.name}
                  </Card.Text>
                  <Card.Text>
                    <a href={item.web_pages}>Web Page</a>
                  </Card.Text>
                  <Button onClick={()=>this.addFav(item)} variant="primary">Add to favourit</Button>
                </Card.Body>
              </Card>

            );
          })


        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default withAuth0(BsetUni);
