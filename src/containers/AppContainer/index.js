import React from 'react';
import { connect } from 'react-redux';
import { func, oneOfType, node, array } from 'prop-types';
import { setActiveBreakpoint } from 'redux/actions';
import { initReduxBreakpoints } from 'utils/responsiveHelpers';
import { get } from 'lodash';
import 'styles/core.scss';
import './AppContainer.scss';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dogs: null };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    console.log(clientId);
    const apiUrl = 'https://api.imgur.com/3/gallery/top/all/';

		const fetchConfig = {
      method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Client-ID ${clientId}`
      }),
      mode: 'cors'
    }
    

    fetch(apiUrl, fetchConfig)
      .then(res => res.json()).then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => console.log(err));
    
    initReduxBreakpoints.call(
      this, window, (breakpointName, breakpointSize, mediaQueryState) =>
        dispatch(setActiveBreakpoint(breakpointName, breakpointSize, mediaQueryState))
    );
	}

  render () {
    const { children } = this.props;
    const { data } = this.state;
    if (!data) return false;

    return (
      <div className="appcontainer">
        <div className="pagecontent row">
          { data.filter(d => d.images_count > 0).map((d, index) => (
            <div key={ index } className="img-item">
              <img src={ get(d, 'images[0].link') } alt={ d.description } />
            </div>
          )) }
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
