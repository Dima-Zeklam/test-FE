import React from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {  Button, Card } from 'react-bootstrap';
import ModalForm from './ModalForm';

require('dotenv').config();
// import ModalForm from './ModalForm';

class Favourit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FavData: [],
            selected:{},
            show:false
        }
    }

    componentDidMount = ()=>{
this.getFav();
    }
    // server.get('/getFav',getFav);
    getFav = async()=>{
         let { user } = this.props.auth0;
        let Url = `${process.env.REACT_APP_SERVER}/getFav?email=${user.email}`;
        let FavoritData = await axios.get(Url);
        // console.log('FavoritData',FavoritData.data);
        this.setState({
            FavData:FavoritData.data
        })
        // console.log('FavData:',this.state.FavData);
    }
// server.delete('/deleteFav:uniID',deleteFav);
deleteFav = async (ID)=>{
    let Url = `${process.env.REACT_APP_SERVER}/deleteFav/${ID}`;
    let deletedData = await axios.delete(Url);
    // console.log('deletedData::',deletedData.data);
    this.setState({
        FavData:deletedData.data
    })
this.getFav();
}
updateselect= async(ID)=>{
let selectedData = this.state.FavData.find(ele=>{

    return (ele._id === ID);
})
await this.setState({
    selected:selectedData,
    show:true
})
console.log(selectedData);
console.log(this.state.selected);

}
// server.put('updateFav:uniID',updateFav)
updateFav= async(e)=>{
e.preventDefault();
let Obj = {
    country:e.target.country.value,
    name:e.target.name.value,
    web_pages:e.target.web_pages.value,
    email:e.target.email.value
}
console.log("Obj :",Obj);
let Url = `${process.env.REACT_APP_SERVER}/updateFav/${this.state.selected._id}`;
let updatedData = await axios.put(Url,Obj);
console.log('updatedData::',updatedData.data);
await this.setState({
    FavData:updatedData.data,
    show:false
})
}
closeHandler = ()=>{
    this.setState({
        show:!this.state.show
    })
}
    render() {
        return (
            <>
             
             {   this.state.FavData.map((item,key) => {
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
                                    <Button onClick={() => this.deleteFav(item._id)} variant="primary">delete</Button>
                                    <Button onClick={() => this.updateselect(item._id)} variant="primary">update</Button>
                                </Card.Body>
                            </Card>
                        );
             })
            }
            <ModalForm
            updateFav={this.updateFav}
            selected={this.state.selected}
            show={this.state.show}
            closeHandler = {this.closeHandler}
            />
            </>
        )
    }
}

export default withAuth0(Favourit);
