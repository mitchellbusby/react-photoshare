// Image lightbox
import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import { fave } from '../actions/images';
import Radium from 'radium';
import { connect } from 'react-redux';

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fave: (id) => {
      dispatch(fave(id));
    },
  };
}


@Radium
@connect(mapStateToProps, mapDispatchToProps)
class ImageCard extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    fave: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
  }
  onFaveClick() {
    this.props.fave(this.props.image.id);
  }
  render() {
    const { image } = this.props;
    return (
      <Card style={ styles }>
        <CardMedia>
          <img src={ image.url } />
        </CardMedia>
        <CardHeader title={ image.location } avatar={ <FontIcon className="material-icons"> flight_takeoff </FontIcon> } />
        <CardActions>
          <span>
            <IconButton onClick={() => {this.onFaveClick();}}  iconClassName="material-icons" tooltipPosition="top-center" tooltip={`Fave (${image.likes})`} touch>
              favorite
            </IconButton>
          </span>
          <a href={ image.url } target="_blank">
            <IconButton iconClassName="material-icons" tooltipPosition="top-center" tooltip="Link" touch>
              launch
            </IconButton>
          </a>
        </CardActions>
      </Card>
    );
  }
}


const styles = {
  'width': '50%',
  'margin': '0 auto',
  'marginTop': '20px',
  'marginBottom': '20px',
};

export default ImageCard;
