import React from 'react'
import Icon from '../components/icon.es6'
 
class Selector extends React.Component {
  static defaultProps = {
    name: "",
    list: [],
    onChange: function(){}
  };

  state = { 
    showItems: false,
    selected: null
  };

  select(e) {
    this.setState({
      showItems: false,
      selected: $(e.target).text()
    }, this.props.onChange);
  }

  remove(e) {
    e.stopPropagation();

    this.setState({
      selected: null,
      showItems: false
    }, this.props.onChange);
  }

  toggleItems() {
    this.setState({
      showItems: !this.state.showItems
    });
  }

  renderListItems() {
    if(this.state.showItems) {
      let items = [];
      for(let item of this.props.list){
        items.push(<li onClick={this.select.bind(this)}>{item}</li>);
      }
      return <ul>{items}</ul>;     
    } else {
      return;
    }
  }

  render() {
    var displayName = this.props.name,
        remove;

    if(this.state.selected) {
      displayName = this.state.selected;
      remove = <i onClick={this.remove.bind(this)}><Icon iconName="close"/></i>;
    }

    return <div className="selector">
        <div className="display" onClick={this.toggleItems.bind(this)}>
          <p>{displayName}</p>{remove}
        </div>
        {this.renderListItems()}
      </div>
  }
}
 
export default Selector