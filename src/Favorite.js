import axios from 'axios';
import React from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import { Button, Card } from 'react-bootstrap';
import UbdateForm from './UbdateForm';
// server.get('/getFav', getFav);
class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FavData: [],
            show: false,
            selected: {}
        }
    }
    componentDidMount = async () => {

        await this.GetData();


    }
    GetData = async () => {

        let email = this.props.auth0.user.email
        // console.log(email);
        let url = `${process.env.REACT_APP_SERVER}/getFav?email=${email}`;
        let getData = await axios.get(url);
        console.log('getData:', getData.data);
        await this.setState({
            FavData: getData.data
        })
    }
    // /deleteFav/:uniID
    deleteFav = async (ID) => {
        // let uniID = this.state.FavData._id;
        // console.log(uniID);
        // e.preventDefault();
        let url = `${process.env.REACT_APP_SERVER}/deleteFav/${ID}`;
        let Data = await axios.delete(url);
        console.log(Data.data);
        await this.setState({
            FavData: Data.data
        })

        await this.GetData();
    }

    selectUpdateEle = async (ID) => {
        console.log('ID:', ID);
        let Obj = await this.state.FavData.find(ele => {
       
                return (ele._id === ID);
         
        })
        console.log("Obj:" ,Obj);
        await this.setState({
            selected: Obj,
            show: true
        })
       
    }
    updateFav = async (e) => {
        // /updateFav/:uniID
        e.preventDefault();
        let updatedData = {
            country: e.target.country.value,
            name: e.target.name.value,
            web_pages: e.target.web_pages.value,
            email:this.props.auth0.user.email
        }
        console.log('updatedData11111111',updatedData);
        let url = `${process.env.REACT_APP_SERVER}/updateFav/${this.state.selected._id}`;
        let updateData = await axios.put(url, updatedData);
        console.log("updateData222222", updateData.data);
        await this.setState({
            FavData:  updateData.data,
            show: !this.state.show
        })

    }
    closeHundler = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <>
                {this.state.FavData.length &&
                    this.state.FavData.map((item, key) => {
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
                                        <a href={item.web_pages} style={{color:'black'}}>web_pages</a>
                                    </Card.Text>
                                    <Button onClick={() => this.deleteFav(item._id)} variant="primary">Delete</Button>
                                    <Button onClick={() => this.selectUpdateEle(item._id)} variant="primary">update</Button>
                                </Card.Body>
                            </Card>

                        );
                    })
                }
                <UbdateForm
                show={this.state.show}
                updateFav={this.updateFav}
                selected = {this.state.selected}
                closeHundler= {this.closeHundler}
                />
            </>
        )
    }
}

export default withAuth0(Favorite);
