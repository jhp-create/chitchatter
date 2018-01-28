import React, { Component } from 'react';
import { toasterMessenger } from '../components/Messenger';
import ToasterContainer from './ToasterContainer';
import SidebarContainer from './SidebarContainer';
import ChatareaContainer from './ChatareaContainer';
import { connect } from 'react-redux';
import { 
  addSocket, 
  getHistory, 
  addMessage, 
  addUserList, 
  getMembers, 
  filterUserList 
} from '../actions/index';

class Chatroom extends Component {
  componentWillMount() {
    const { user } = this.props
    if (!user.username || !user.room) {
      this.props.history.replace('/')
    }

    const socket = new WebSocket("ws://188.166.221.63:8000")
    socket.onmessage = this.messageHandler
    socket.onopen = () => {
      this.props.addSocket(socket)
      socket.send(JSON.stringify({
        type: 'join',
        data: {
          username: user.username,
          room: user.room
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
        return toasterMessenger.dispatch('Room Successfully Joined','green');
      case "history":
        return this.props.getHistory(data.data.messages);
      case "members":
        return this.props.getMembers(data.data, this.props.user.username);
      case "message":
        return this.props.addMessage(data.data);
      case "joined":
        this.props.addUserList(data.data.name);
        this.props.addMessage({ message:`${data.data.name} has entered the room`, system: true  });
        break;
      case "left":
        this.props.addMessage({ message: `${data.data.username} has left the room`, system: true });
        this.props.filterUserList(this.props.chatroom.users, data.data.username);
        break;
      default:
        break
    }
  }

  sendMessage = (chat) => {
    this.props.chatroom.socket.send(JSON.stringify(
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
    this.props.chatroom.socket.send(JSON.stringify(
      {
        type: 'leave',
        data: { username: this.props.user.username }
      },
      this.props.history.push('/')
    ))
  }

  render() {
    return (
      <div className="chatroom">
          <div id="header">ChitChatter</div>
          <SidebarContainer
            logOut={this.logOut}
          />
          <ChatareaContainer 
            onClick={this.sendMessage}
            sendFiles={this.sendFiles}
          />
          <div className='photo-chatroom'></div>
          <ToasterContainer />
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

export default connect(
  mapStateToProps, 
  { addSocket, 
    getHistory, 
    addMessage, 
    addUserList, 
    getMembers,
    filterUserList
  }
  )(Chatroom);