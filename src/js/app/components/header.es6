import React from 'react'
import Router from 'react-router'

var {Link} = Router
 
class Header extends React.Component {
  static defaultProps = {
    repo: "https://github.com/chaozhang/Interactive-Report-Builder",
    issues: "https://github.com/chaozhang/Interactive-Report-Builder/issues/new"
  }

  render() {
    return <header>
      <div className="container">
        <Link id="logo" to="/">Home</Link>
        <div className="links">
          <a href={this.props.repo} target="_blank">Github</a>
          <a href={this.props.issues} target="_blank">Submit Feedback</a>
        </div>
      </div>
    </header>
  }
}
 
export default Header