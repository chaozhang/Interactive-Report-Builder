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

  createView() {
    var items = this.state.data, result = [];

    for (let item of items) {
      let view;

      switch (item.type) {
        case 'sql':
          view = <SqlWidget
            data={item.data}
          />;
          result.push(view);
          break;
        case 'r':
          view = <div>
            <iframe src={item.url}></iframe>
          </div>;
          result.push(view);
          break;
        case 'text':
          view = <div>{item.text}</div>;
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