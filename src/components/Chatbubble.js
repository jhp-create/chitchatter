import React from 'react'

const Chatbubble = (props) => {
    const date = props.date.slice(12)
    return (
        <div className={props.me ? 'message' : 'message others'}>
            {props.message.startsWith('http') ? 
                <img src={props.message} alt=''/> : 
                <div className='chat'>{props.message}</div>}
            {props.me ?
                <div className='author'>
                    <span>{date}</span> 
                    <strong style={{marginLeft: 10}}>{props.author}</strong>
                </div> :
                <div className='author'>
                    <strong style={{marginRight: 10}}>{props.author}</strong>
                    <span>{date}</span>
                </div>}
        </div>
    )
}

export default Chatbubble;