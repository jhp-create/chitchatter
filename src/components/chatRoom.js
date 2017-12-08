import React, { Component } from 'react'
import './chatroom.css'
import CornerImage from '../side-image.png';
import {
    ChatBubblesME,
    ChatBubblesOTHERS,
    ChatBubblesIMAGEME,
    ChatBubblesIMAGEOTHERS,
    ChatBubblesPDFME,
    ChatBubblesPDFOthers
} from './chatBubbles.js'

export class SideBar extends Component {
    render() {
        console.log(this.props.users)
        return (
            <div className="users container-fluid">
                <p>
                    <strong>
                        Room
                    </strong>
                        <br />
                    <h2>
                        {this.props.room}
                    </h2>
                    
                    <a onClick={this.props.logOut}>(Leave)</a>
                </p>
                <strong>Members</strong>
                {this.props.users.map(users => {
                    return(
                        <div className="active-users"><p>{users}</p></div>
                    )
                })}
            </div>
        )
    }
}

export class ChatHistory extends Component {
    componentDidUpdate(newProps) {
        (this.chatNode.scrollTop = this.chatNode.scrollHeight)
        
    }
    render() {
        console.log(this.props.messages)
        return (
            <div ref={(el) => this.chatNode = el} className="chatlogs">
                {
                    this.props.messages.map(message => {
                        if(message.system === true){
                            return(
                                <div className="joined-leave">
                                 <em>
                                 {message.message}
                                 </em>
                                </div>
                            )
                            // Handle a case where there is no message.message
                            // but a message.fileURL instead

                        }else if (message.author === this.props.username) {
                            return (
                                <div>
                                    {/* <ChatBubblesME message={message.message}
                                        author={message.author} /> */}
                                     
                                    <ChatBubblesIMAGEME messages={message.message}
                                        author={message.author} />

                                    {/* <ChatBubblesPDFME message={message.message}
                                        author={message.author} /> */}
                                </div>
                            )
                        } else if (message.author !== this.props.username) {
                            return (
                                <div>
                                    {/* <ChatBubblesOTHERS message={message.message}
                                        author={message.author} /> */}
                                     <ChatBubblesIMAGEOTHERS messages={message.message}
                                        author={message.author} />

                                    {/* <ChatBubblesPDFOthers message={message.message}
                                        author={message.author} /> */}
                                </div>
                            )
                        }
                    })

                }
            </div>
        )
    }
}

export class SideImage extends Component {
    render() {
        return (
            <div className="background-photo">
            </div>
        )
    }
}







