import React from 'react';
import { connect } from 'react-redux';
import { func, oneOfType, node, array } from 'prop-types';
import { setActiveBreakpoint } from 'redux/actions';
import { initReduxBreakpoints } from 'utils/responsiveHelpers';
import 'styles/core.scss';

class AppContainer extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props;


    initReduxBreakpoints.call(
      this, window, (breakpointName, breakpointSize, mediaQueryState) =>
        dispatch(setActiveBreakpoint(breakpointName, breakpointSize, mediaQueryState))
    );
  }

  render () {
    const { children } = this.props;

    return (
      <div className="appcontainer">
        <div className="pagecontent">
          { children }
        </div>
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: oneOfType([node, array]),
  dispatch: func,

  // Included in initReduxBreakpoints automatically
  // eslint-disable-next-line
  setActiveBreakpoint: func,
};

export default connect()(AppContainer);
