// Image lightbox
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

const ImageCard = () => {
  return (
      <Card style={ styles }>
        <CardMedia>
          <img src="https://s3-us-west-2.amazonaws.com/busby-traveller/photo.jpg" />
        </CardMedia>
        <CardHeader title="Paris, France" avatar={ <FontIcon className="material-icons"> flight_takeoff </FontIcon> } />
        <CardActions>
          <IconButton iconClassName="material-icons" tooltipPosition="top-center">
            favorite
          </IconButton>
          <IconButton iconClassName="material-icons" tooltipPosition="top-center">
            launch
          </IconButton>
        </CardActions>
      </Card>
    );
};

const styles = {
  'width': '50%',
  'margin': '0 auto',
  'marginTop': '20px',
  'marginBottom': '20px',
};

export default ImageCard;
