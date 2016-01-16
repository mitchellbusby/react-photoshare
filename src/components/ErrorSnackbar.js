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
  }
  render() {
    const { errorMessage } = this.props;
    console.log(errorMessage);
    return (
      <Snackbar
      onRequestClose={ this.requestToClose }
      open={ () => /* errorMessage !== null */ true }
      message={ errorMessage } />
    );
  }
  requestToClose() {
    this.props.resetError();
  }
}

export default ErrorSnackbar;
