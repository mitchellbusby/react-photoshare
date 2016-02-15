import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { faveAsync, fetchImagesThunk } from '../actions/images';
import Radium from 'radium';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import ErrorSnackbar from '../components/ErrorSnackbar';
import ImageCard from '../components/ImageCard';
import { saveToken } from '../actions/guest';

function mapStateToProps(state) {
  return {
    images: state.images,
    guestData: state.guest,
    imagesGallery: state.imagesGalleryStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fave: (id) => {
      dispatch(faveAsync(id));
    },
    fetchImages: () => {
      dispatch(fetchImagesThunk());
    },
    saveGuestToken: () => {
      dispatch(saveToken());
    },
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class ImagesPage extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    fave: PropTypes.func.isRequired,
    fetchImages: PropTypes.func.isRequired,
    saveGuestToken: PropTypes.func.isRequired,
    guestData: PropTypes.object.isRequired,
    imagesGallery: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { fetchImages, saveGuestToken, guestData } = this.props;
    fetchImages();
    if (!guestData.get('isSaved')) {
      saveGuestToken(guestData.get('token'));
    }
  }
  render() {
    const { images, imagesGallery } = this.props;
    return (
      <div>
        <AppBar
        title="TRVL"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        showMenuIconButton= { false } style={{ 'position': 'fixed' }} zDepth={ 1 } />
        <Card style={{ 'paddingTop': '70px' }}>
          <CardText>
            <p>Here are a few photos from my travels...</p>
          </CardText>
        </Card>
        {images.map(image =>
          <ImageCard key={image.id} image={image}/>
        )}
        {
          imagesGallery.loading ?
          <p>Loading!</p>
          : null
        }
        <ErrorSnackbar />
      </div>

    );
  }
}

export default ImagesPage;
