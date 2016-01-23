// Image lightbox
import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import { faveAsync, unfaveAsync } from '../actions/images';
import Radium from 'radium';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    guestToken: state.guest.get('token'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fave: (id, token) => {
      dispatch(faveAsync(id, token));
    },
    unfave: (id, token) => {
      dispatch(unfaveAsync(id, token));
    },
  };
}


@Radium
@connect(mapStateToProps, mapDispatchToProps)
class ImageCard extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    fave: PropTypes.func.isRequired,
    unfave: PropTypes.func.isRequired,
    guestToken: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  onFaveClick() {
    this.isFaved() ? this.props.unfave(this.props.image.id, this.props.guestToken) : this.props.fave(this.props.image.id, this.props.guestToken);
  }

  render() {
    const { image } = this.props;
    const likes =  image.likelog.length;
    let faveColor;
    faveColor = !this.isFaved() ? 'black' : 'red';
    return (
      <div className={ 'image-card' }>
        <Card style={ styles }>
          <CardMedia>
            <img src={ image.url } />
          </CardMedia>
          <CardHeader title={ image.location } avatar={ <FontIcon className="material-icons"> flight_takeoff </FontIcon> } />
          <CardActions>
            <span>
              <IconButton iconStyle={{ 'color': faveColor }}  onClick={() => {this.onFaveClick();}}  iconClassName="material-icons" tooltipPosition="top-center" tooltip={this.isFaved() ? `Unfave (${likes})` : `Fave (${likes})`} touch>
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
      </div>
    );
  }
  isFaved() {
    const likelog = this.props.image.likelog !== null ? this.props.image.likelog : [];
    const guestToken = this.props.guestToken;
    if (likelog.filter(log => log.token === guestToken).length > 0) {
      return true;
    }
    return false;
  }
}


const styles = {
};

export default ImageCard;
