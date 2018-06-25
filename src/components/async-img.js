import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

/**
 * WARNING! This class uses a "mounted" member of state
 * which react recommends against.  Changing that would make the
 * code a lot messier and this solution is otherwise a clean way
 * to get protected images.
 */
export default class AsyncImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      mounted: false,
    };
  }
  updateData() {
    if (this.props.async) {
      fetch(this.props.src, this.props.fetchOptions)
        .then(r => r.blob())
        .then((imgData) => {
          if (this.state.mounted) {
            this.setState({data: URL.createObjectURL(imgData)});
          }
        })
        .catch((error) => {
          console.error('Error fetchimg image at:', this.props.src);
          this.props.onError(error);
        });
    }
  }
  componentDidMount() {
    this.setState({mounted: true});
    this.updateData();
  }
  componentWillUnmount() {
    this.setState({mounted: false});
  }
  componentDidUpdate(prevProps) {
    if (this.props.async && this.props.src !== prevProps.src) {
      this.updateData();
    }
  }
  render() {
    const props = {};
    const copy_props = ['height', 'width', 'src', 'onClick', 'alt', 'className'];
    for (let prop of copy_props) {
      if (this.props[prop]) {
        props[prop] = this.props[prop];
      }
    }
    if (this.props.async) {
      props.src = this.state.data;
    }
    // it is necessary to ensure an alt tag for a11y,
    // and the prop version needs to be deleted to ensure no
    // duplicate props for the img tag.
    const alt = this.props.alt ? this.props.alt : '';
    return (
      <img alt={alt} {...props} />
    );
  }
}

AsyncImage.propTypes = {
  /** Do we need to fetch the image asynchronous? */
  async: PropTypes.bool,
  /** Options to use for fetch calls */
  fetchOptions: PropTypes.object,
  /** onError callback */
  onError: PropTypes.func,
  /** onCLick callback */
  onClick: PropTypes.func,
  /** Width in pixels */
  width: PropTypes.number,
  /** Height in pixels */
  height: PropTypes.number,
  /** Source attribute */
  src: PropTypes.string,
  /** Alt text */
  alt: PropTypes.string,
  /** CSS class name */
  className: PropTypes.string,
};
