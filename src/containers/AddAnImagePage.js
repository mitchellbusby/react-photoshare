// AddAnImagePage.js

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ADD_IMAGE_FORM } from '../constants';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import { selectImageAsync } from '../actions/previewimage';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import { submitImageAsync } from '../actions/addImage';
import ErrorSnackbar from '../components/ErrorSnackbar';

function mapStateToProps(state) {
  return {
    imageForm: state.form[ADD_IMAGE_FORM],
    imageData: state.previewImage.imageData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectImage: (imageData) => {
      dispatch(selectImageAsync(imageData));
    },
    submit: (values) => {
      dispatch(submitImageAsync(values, dispatch));
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ImageForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    imageForm: PropTypes.object,
    selectImage: PropTypes.func.isRequired,
    imageData: PropTypes.string,
    submit: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {};
  }
  renderImagePreview() {
    if (this.props.imageData) {
      return (
        <div style={{ 'maxWidth': '400px', 'marginTop': '1em' }} >
          <img src={ this.props.imageData } />
        </div>
      );
    }
  }
  render() {
    const { fields, submit, selectImage, handleSubmit } = this.props;
    return (
      <div>
        <AppBar
          title="TRVL"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          showMenuIconButton= { false } style={{ 'position': 'fixed' }} zDepth={ 1 } />
        <Card style={{ 'paddingTop': '70px', 'width': '80%', 'margin': '0 auto' }}>
          <form onSubmit={ handleSubmit(submit) } style={{'marginLeft': '1em'}}>
            <div>
              <TextField
                hintText="San Francisco, CA"
                floatingLabelText="Location"
                {...fields.location} />
            </div>
            <div>
              <TextField
                hintText=""
                floatingLabelText="Longitude"
                {...fields.longitude} />
            </div>
            <div>
              <TextField
                hintText=""
                floatingLabelText="Latitude"
                {...fields.latitude} />
            </div>
            <div style={{ 'marginTop': '1em' }}>
              <DatePicker hintText="Date"
              onChange={
                ( e, date ) => {
                  fields.date.onChange(date);
                }
              }
              />
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
                  fields.image.onChange(files[0]);
                  selectImage(files[0]);
                }
              }/>
            </div>
            {this.renderImagePreview()}
            <RaisedButton onClick={ handleSubmit(submit) } label={'Submit'}
            style={{'margin': '1em', 'marginLeft': '0'}}
            primary/>
          </form>
        </Card>
        <ErrorSnackbar />
      </div>
    );
  }
}

ImageForm = reduxForm({
  form: ADD_IMAGE_FORM,
  fields: ['location', 'image', 'longitude', 'latitude', 'date'],
})(ImageForm);

export default ImageForm;
