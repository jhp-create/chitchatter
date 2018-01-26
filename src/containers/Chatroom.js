import React, { Component } from 'react';
import { toasterMessenger } from '../components/Messenger';
import ToasterContainer from './ToasterContainer';
import SidebarContainer from './SidebarContainer';
import ChatareaContainer from './ChatareaContainer';
import { connect } from 'react-redux';

class Chatroom extends Component {
  state = {
    users: [],
    messages: [],
    socket: null,
  }

  componentWillMount() {
    if (!this.props.user.username || !this.props.user.room)
      return this.props.history.replace('/')

    const socket = new WebSocket("ws://188.166.221.63:8000")
    socket.onmessage = this.messageHandler
    socket.onopen = () => {
      this.setState({ socket })
      socket.send(JSON.stringify({
        type: 'join',
        data: {
          username: this.props.user.username,
          room: this.props.user.room
        }
      }))
    }
  }

  messageHandler = (socketData) => {
    const data = JSON.parse(socketData.data)
    
    if (data.error) {
      setTimeout(() => toasterMessenger.dispatch(data.error, '#ff4d4d'), 200)
      return this.props.history.replace('/')
    }

    switch (data.type) {
      case "join_success":
        toasterMessenger.dispatch('Room Successfully Joined','green')
        break;
      case "history":
        this.setState({ messages: data.data.messages})

        break;
      case "members":
        data.data.push(this.props.username + ' (You)')
        this.setState({ users: data.data })
        break;
      case "message":
        this.setState({ messages: this.state.messages.concat([data.data]) })

        break;
      case "joined":
        this.setState({ users: [...this.state.users, data.data.name] })
        this.setState({ messages: [...this.state.messages, { message:`${data.data.name} has entered the room`, system: true  }] })
        break;
      case "left":
        this.setState({ messages: [...this.state.messages, { message: `${data.data.username} has left the room`, system: true }] })
        var i = this.state.users.findIndex((currentIndex) => data.data.username === currentIndex)
        this.setState({ users: this.state.users.slice(0, i).concat(this.state.users.slice(i + 1)) })
        break;
      default:
        break
    }
  }

  sendMessage = (chat) => {
    this.state.socket.send(JSON.stringify(
      {
        type: 'message',
        data: { message: chat }
      }
    ))
  }

  sendFiles = async (file) => {
    let formData = new FormData();
    formData.append('file', file['0'], file['0'].name);
    const url = 'http://188.166.221.63:8000/upload'

    const res = await fetch(url, {method: 'POST', body: formData})
    res.ok ? console.log('connection success') : console.log('connection failed')

    const json = await res.json()
    const imageUrl = `http://188.166.221.63:8000${json.path}`

    this.sendMessage(imageUrl)
  }

  logOut = () => {
    this.state.socket.send(JSON.stringify(
      {
        type: 'leave',
        data: { username: this.props.username }
      },
      this.props.history.push('/')
    ))
  }

  render() {
    return (
      <div className="chatroom">
          <div id="header">ChitChatter</div>
          <SidebarContainer 
            room={this.props.room} 
            users={this.state.users}
            logOut={this.logOut}
          />
          <ChatareaContainer 
            messages={this.state.messages}
            username={this.props.username}
            onClick={this.sendMessage}
            sendFiles={this.sendFiles}
          />
          <div className='photo-chatroom'></div>
          <ToasterContainer />
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Chatroom);