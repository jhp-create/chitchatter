import React from 'react';
import Chatbubble from '../components/Chatbubble';
import ChatboxContainer from './ChatboxContainer';
import { connect } from 'react-redux'

class ChatareaContainer extends React.Component {
    componentDidUpdate(newProps) {
        (this.chatNode.scrollTop = this.chatNode.scrollHeight*2)
    }

    render() {
        return (
            <div className="chatarea">
                <div ref={(el) => this.chatNode = el} className="chat-messages">
                    {this.props.chatroom.messages.map((message, i) => {
                        if(message.system === true) {
                            return(
                                <div key={i} className="joined-leave">
                                    <em>{message.message}</em>
                                </div>
                            )
                        } else {
                            return (
                                <Chatbubble
                                    key={i}
                                    message={message.message}
                                    author={message.author}
                                    date={message.date}
                                    me={message.author === this.props.user.username}
                                />
                            )
                        }
                    })}
                </div>
                <ChatboxContainer
                    onClick={this.props.onClick}
                    sendFiles={this.props.sendFiles}
                />
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

export default connect(mapStateToProps)(ChatareaContainer);