import React, { Component } from 'react';
import Plus from '../images/plus.png';
import Send from '../images/send.png';
import Image from '../images/image.png';
import Clip from '../images/clip.png';
import ReactFileReader from 'react-file-reader' ;

class Chatbox extends Component {
  render() {
    return (
      <div id="chatbox">
        <div className="upload" style={{ display: this.props.state.open ? "inline" : "none"}}>
          <div className="attach bubble">
            <ReactFileReader fileTypes={[".png", ".jpg",".gif"]} handleFiles={this.props.handleFiles}>
                <img className="insertImage" src={Image} alt=''/>  
            </ReactFileReader>
            <ReactFileReader fileTypes={[".pdf"]} handleFiles={this.props.handleFiles}>
                <img src={Clip} alt=''/>
            </ReactFileReader>    
          </div>
        </div>
        <button ref={this.props.buttonRef} className="plus" >
          <img src={Plus} alt=''/>
        </button>
        <input 
          type="text" 
          placeholder="Type your message here" 
          value={this.props.state.currentMessage} 
          onChange={this.props.onChangeInput}
          onKeyPress={this.props.onKeyPress}
        />
        <button className="send" onClick={this.props.onClick} >
          <img src={Send} alt=''/>
        </button>
      </div>
    )
  }
}

export default Chatbox;