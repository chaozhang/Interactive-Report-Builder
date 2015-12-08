import React from 'react'
import Router from 'react-router'

var {Link} = Router
 
class Header extends React.Component {
  static defaultProps = {
    navItems: [
      {
        name: 'Builder',
        url: '/'
      }
    ]
  }

  getNavItems() {
    var naveItems = [];

    for(let x of this.props.navItems) {
      let item = <li>
        <Link to={x.url}>{x.name}</Link>
      </li>

      naveItems.push(item)
    }

    return naveItems;
  }

  render() {
    return <nav>
      <ul>
        {this.getNavItems()}
      </ul>
    </nav>
  }
}
 
export default Header