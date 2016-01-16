import { ClearError } from '../actions/errormessaging';
import Snackbar from 'material-ui/lib/snackbar';
import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';

function mapStateToProps(state) {
  return {
    errorMessage: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetError: () => {
      dispatch(ClearError());
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class ErrorSnackbar extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    resetError: PropTypes.func.isRequired,
    action: PropTypes.string,
    onAction: PropTypes.func,
  }
  render() {
    const { errorMessage, action, onAction } = this.props;
    return (
      <Snackbar
      onRequestClose={ () => { this.requestToClose(); } }
      open={ errorMessage !== null }
      message={ errorMessage }
      action = { action }
      onActionTouchTap = { () => { onAction !== undefined ? onAction() : ''; } } />
    );
  }
  requestToClose() {
    this.props.resetError();
  }
}

export default ErrorSnackbar;
