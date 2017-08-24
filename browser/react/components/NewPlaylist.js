import React, { Component } from 'react'; 
import axios from 'axios';

export default class NewPlaylist extends Component {

  constructor () {
    super();
    this.state = {
      name: '', 
      isDisabled: true,
      hasEdit: false 
    };
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this); 

  }

  postToDatabase(name) {
    axios.post('/api/playlists/', {name: name})
    .then(res => res.data)
    .then(playlists => {
      console.log(playlists); 
    })
  }

  validate() {
    // console.log(this.state.isDisabled, "DFSD", this.state.hasEdit); 
    if(this.state.name === '' || this.state.name.length > 16) {
      this.setState({
        isDisabled: true, 
        hasEdit: true 
      })
    } else {
      this.setState({
        isDisabled: false,
        hasEdit: true
      })
    }
  }

  handleChange(event) {  
    this.setState({
      name: event.target.value,  
    }, () => {
      this.validate(); 
    }); 
  }

  handleSubmit(event) {
    this.postToDatabase(this.state.name); 
    this.setState({
      name: ''
    })
    event.preventDefault(); 
  }

  render() {
    return (
        <div className="well">
          <form className="form-horizontal">
            <fieldset>
              <legend>New Playlist</legend>
              <div className="form-group">
                <label className="col-xs-2 control-label">Name</label>
                <div className="col-xs-10">
                  { (this.state.isDisabled && this.state.hasEdit) ? <div className="alert alert-warning">Please enter a playlist name</div> : null }
                  <input className="form-control" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-10 col-xs-offset-2">
                  <button type="submit" className="btn btn-success" 
                  disabled = {this.state.isDisabled}
                  onClick = {this.handleSubmit}>
                    Create Playlist
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
    )

  }

}

 