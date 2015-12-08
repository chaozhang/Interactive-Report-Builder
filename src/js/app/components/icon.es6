import React from 'react'

class Icon extends React.Component {
  static defaultProps = {
    iconName: 'alert'
  }

  render() {
    var htmlString = {
      __html: '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/svg/sprite.svg#' + this.props.iconName + '"></use>'
    };

    return <svg dangerouslySetInnerHTML={htmlString}/>;
  }
}

export default Icon
