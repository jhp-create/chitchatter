import React, { Component } from 'react';

class SideBar extends Component {
  constructor() {
      super();
      this.state = {
          reveal: false,
          sideClass: 'sidebar-chatroom'
      }
  }
  
  componentDidMount() {
      document.addEventListener('click', this.closeSide);
      this.button.addEventListener('click', this.toggleSidebar);
  }

  componentWillUnmount() {
      document.removeEventListener('click', this.closeSide)
  }

  closeSide = () => {
      this.setState({reveal: false})
  }

  toggleSidebar = (e) => {
      e.stopPropagation()
      this.setState({reveal: !this.state.reveal})
  } 

  render() {
      return (
          <div className={this.state.reveal ? 'sidebar-chatroom reveal' : 'sidebar-chatroom'}>
              <button 
                  ref = {button => this.button = button}
                  onClick={this.toggleSidebar}>
                  Room
              </button>
              <div className='chat-room'>
                  <strong>Room</strong>
                  <h2>{this.props.room}</h2>
                  <a onClick={this.props.logOut}>(leave)</a>
              </div>
              <div className='members'>
                  <strong >Members</strong>
                  {this.props.users.map((users, i) => {
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

export default SideBar;