// AddAnImagePage.js

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ADD_IMAGE_FORM } from '../constants';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


function mapStateToProps(state) {
  return {
    imageForm: state.form[ADD_IMAGE_FORM],
  };
}

@connect(mapStateToProps)
class ImageForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    imageForm: PropTypes.object,
  }
  constructor() {
    super();
    this.state = {};
  }
  renderImagePreview() {
    let imageUrlFileReader;
    if (this.state.currentImage) {
      imageUrlFileReader = new FileReader();
      imageUrlFileReader.readAsDataURL(this.state.currentImage);
      imageUrlFileReader.onload = () => {
        this.setState({imagePreviewHasLoaded: true});
      };
      if (this.state.imagePreviewHasLoaded) {
        return (
          <img src={imageUrlFileReader.result} />
        );
      }
    }
  }
  render() {
    const { fields, handleSubmit } = this.props;
    return (
      <div>
        <AppBar
          title="TRVL"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          showMenuIconButton= { false } style={{ 'position': 'fixed' }} zDepth={ 1 } />
        <Card style={{ 'paddingTop': '70px', 'width': '80%', 'margin': '0 auto' }}>
          <form onSubmit={ handleSubmit } style={{'marginLeft': '1em'}}>
            <div>
              <TextField
                hintText="San Francisco, CA"
                floatingLabelText="Location"
                {...location} />
            </div>
            <div style={{'marginTop': '1em'}}>
              <label>Image file</label>
              <input type="file"
              style={{'display': 'block', 'marginTop': '1em'}}
              onChange= {
                ( e ) => {
                  e.preventDefault();
                  const files = [...e.target.files];
                  this.setState({currentImage: files[0]});
                  fields.image.onChange(files);
                }
              }/>
            </div>
            {this.renderImagePreview()}
            <RaisedButton onClick={ handleSubmit } label={'Submit'}
            style={{'margin': '1em', 'marginLeft': '0'}}
            primary/>
          </form>
        </Card>
      </div>
    );
  }
}

ImageForm = reduxForm({
  form: ADD_IMAGE_FORM,
  fields: ['location', 'image'],
})(ImageForm);

export default ImageForm;
