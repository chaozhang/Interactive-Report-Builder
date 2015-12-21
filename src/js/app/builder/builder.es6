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

  addInput(e) {
    var index = $(".add-input .remove").index(e.target),
        data = this.state.data;
    data.push({type: "input"});

    this.setState({
      data: data
    });   
  }

  createView() {
    var items = this.state.data,
        result = [],
        actions = <div
          className="actions">
          <button
            className="add-input"
            onClick={this.addInput.bind(this)}>
            +
          </button>
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
          result.push(<div className="output">
            {actions}{view}
          </div>);
          break;
        case 'r':
          view = <div className="output">
            {actions}
            <div><iframe src={item.url}></iframe></div>
          </div>;
          result.push(view);
          break;
        case 'text':
          view = <div className="output">{actions}<div>{item.text}</div></div>;
          result.push(view);
          break;
        case 'input':
          result.push(
            <div className="input">
              <ComboEditor
                onSubmit={this.addItem.bind(this)}
              />
            </div>
          );
          break;
      }
    }

    return result;
  }

  render() {
    var content;

    if(this.state.data.length) {
      content = <div >
        {this.createView()}
      </div>;
    } else {
      content = <div className="input">
        <ComboEditor
          onSubmit={this.addItem.bind(this)}
        />
      </div>;
    }
    return <div className="content">
      <div className="container">
         {content}
      </div>
    </div>;
  }
}
 
export default Builder