import React, { Component } from 'react';
import Home from '../components/Home';
import { connect } from 'react-redux';
import { addUser, addRoom } from '../actions/index';

class HomeContainer extends Component {
    state = {
        username: "",
        room: ""
    }

    handleEnterKeyPress = ev => {
        if (ev.key === "Enter") {
            this.props.history.push('/chatroom')
            this.props.addUser(this.state.username);
            this.props.addRoom(this.state.room);
        }
    }

    setUsername = ev => {
        this.setState({username: ev.target.value})
    }

    setRoom = ev => {
        this.setState({room: ev.target.value})
    }

    handleSubmit = ev => {
        this.props.history.push('/chatroom')
        this.props.addUser(this.state.username);
        this.props.addRoom(this.state.room);
        ev.preventDefault()
    }
    
    render() {
        return (
            <Home 
                onChangeUsername={this.setUsername}
                onChangeRoom={this.setRoom}
                onSubmit={this.handleSubmit}
                onEnterKeyPress={this.handleEnterKeyPress}
            />
        )
    }
}

export default connect(null, { addUser, addRoom })(HomeContainer);

