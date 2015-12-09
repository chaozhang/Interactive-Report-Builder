import React from 'react'
 
class Selector extends React.Component {
  static defaultProps = {
    list: [],
    onChange: function(){}
  };

  state = { 
    showItems: false,
    selected: null
  };

  select(e) {
    var text = $(e.target).text();
    this.setState({
      showItems: false,
      selected: text
    }, this.props.onChange.bind(this, text));
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
    var displayText = this.props.list[0];

    if(this.state.selected) {
      displayText = this.state.selected;
    }

    return <div className="selector">
        <div className="display" onClick={this.toggleItems.bind(this)}>
          <p>{displayText}</p>
        </div>
        {this.renderListItems()}
      </div>
  }
}
 
export default Selector