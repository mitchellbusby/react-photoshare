import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { faveAsync, fetchImagesThunk } from '../actions/images';
import Radium from 'radium';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import ImageCard from '../components/ImageCard';

function mapStateToProps(state) {
  return {
    images: state.images,
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
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class ImagesPage extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    fave: PropTypes.func.isRequired,
    fetchImages: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { fetchImages } = this.props;
    fetchImages();
  }
  render() {
    const { images } = this.props;
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
      </div>

    );
  }
}

export default ImagesPage;
