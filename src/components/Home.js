import React from 'react';
import ToasterContainer from '../containers/ToasterContainer';

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="sidebar">
                    <h1>ChitChatter</h1>
                    <div className="user-input">
                        <em>Join a room to get started</em>
                        <strong>Username</strong>
                        <input
                            onChange={this.props.onChangeUsername}
                            type="text" name="username" 
                        />
                        <strong>Room Name</strong>
                        <input type="text" name="chatroomname"
                            onChange={this.props.onChangeRoom}
                            onKeyPress={this.props.onEnterKeyPress} 
                        />
                        <input 
                            id='join-now'
                            type="submit" 
                            name="submit" 
                            value="JOIN ROOM" 
                            onClick={this.props.onSubmit} 
                        />
                    </div>      
                </div>
                <div className="photo"></div>
                <ToasterContainer />
            </div>
        )
    }
}

export default Home;

