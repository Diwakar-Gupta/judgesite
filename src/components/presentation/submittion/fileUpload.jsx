import React, { Component } from "react";

export default class FileUpload extends Component {
  
  state = {
    text:''
  }

  onFileChange = (event) => {
    if(!event.target.files[0])return;
    
    const file = event.target.files[0];
    const text = file.text();
    text.then(value => {
      this.setState({
        text: value
      });
    })
  }
  
  render() {
    return (
      <div>
        <form>
          <input type="file" onChange={this.onFileChange} />
        </form>
        <div>
          {this.state.text}
        </div>
      </div>
    );
  }
}
