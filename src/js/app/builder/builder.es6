import React from 'react'
import ComboEditor from '../components/comboEditor.es6'
import SqlWidget from './sqlWidget.es6'
 
class Builder extends React.Component {
  state = { 
    data: []
  }

  addItem(newItem) {
    var data = this.state.data;
    data.push(newItem);

    this.setState({
      data: data
    });
  }

  removeItem(e) {
    var index = $(".container .remove").index(e.target),
        data = this.state.data;
    data.splice(index, 1);

    this.setState({
      data: data
    });
  }

  createView() {
    var items = this.state.data,
        result = [],
        actions = <div
          className="actions">
          <button>+</button>
          <button
            className="remove"
            onClick={this.removeItem.bind(this)}>
            X
          </button>
        </div>

    for (let item of items) {
      let view;

      switch (item.type) {
        case 'sql':
          view = <SqlWidget
            data={item.data}
          />;
          result.push(<div>{actions}{view}</div>);
          break;
        case 'r':
          view = <div>
            {actions}
            <div><iframe src={item.url}></iframe></div>
          </div>;
          result.push(view);
          break;
        case 'text':
          view = <div>{actions}<div>{item.text}</div></div>;
          result.push(view);
          break;
      }
    }

    return result;
  }

  render() {
    return <div className="content">
      <ComboEditor
        onSubmit={this.addItem.bind(this)}
      />
      <div className="container">
         {this.createView()}
      </div>
    </div>;
  }
}
 
export default Builder