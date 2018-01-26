import React from 'react';

class Toaster extends React.Component {
  render() {
    return (
      <div className='toaster-container'>
        {this.props.state.toasterList.map((item, index) => 
          <div 
            key={index} 
            className='toaster-item'
            style={{
              display: this.props.toasterDisplay,
              backgroundColor: item.bgcolor }}>
            {item.message}
          </div>
        )}
      </div>
    )
  }
}

export default Toaster;