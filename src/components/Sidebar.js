import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
    render() {
        const { chatroom, user } = this.props;
        return (
          <div className={this.props.state.reveal ? 'sidebar-chatroom reveal' : 'sidebar-chatroom'}>
              <button 
                  ref={this.props.buttonRef}
                  onClick={this.props.onClickButton}>
                  Room
              </button>
              <div className='chat-room'>
                  <strong>Room</strong>
                  <h2>{user.room}</h2>
                  <a onClick={this.props.onClickLogout}>(leave)</a>
              </div>
              <div className='members'>
                  <strong >Members</strong>
                  {chatroom.users.map((users, i) => {
                      return(
                          <div key={i} className="active">
                              <p>{users}</p>
                          </div>
                      )
                  })}
              </div>
          </div>
      )
  }
}

function mapStateToProps({ user, chatroom }) {
    return {
        user,
        chatroom
    }
}

export default connect(mapStateToProps)(Sidebar);