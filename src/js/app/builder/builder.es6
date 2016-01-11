import React from 'react'
import ComboEditor from '../components/comboEditor.es6'
import SqlWidget from './sqlWidget.es6'

const DATA_INPUT = {
  type: "input"
}
 
class Builder extends React.Component {
  state = { 
    data: [DATA_INPUT],
    selected: 0
  }

  addOutput(index, newItem) {
    var data = this.state.data;
    data[index] = newItem;

    this.setState({
      data: data
    });
  }

  selectItem(e) {
    this.setState({
      selected: this.getIndex(e)
    });
  }

  removeItem(e) {
    var index = this.getIndex(e),
        data = this.state.data;
    data.splice(index, 1);

    if (data.length == 0) {
      data.push(DATA_INPUT);
    }

    this.setState({
      data: data,
      selected: -1
    });
  }

  addNewItem(e) {
    var index = this.getIndex(e),
        data = this.state.data;
    data.splice(index+1, 0, DATA_INPUT);

    this.setState({
      data: data
    });
  }

  getIndex(e) {
    var $section = $(e.target).closest(".section");

    return $(".main .section").index($section[0]);
  }

  createActions() {
    return <div className="actions">
      <button>Edit</button>
      <button onClick={this.removeItem.bind(this)}>Delete</button>
    </div>
  }

  createMainView() {
    var items = this.state.data,
        results = [],
        actions = this.createActions();

    items.forEach((item, index) => {
      let view,
          content,
          className = "section";

      switch (item.type) {
        case 'sql':
          content = <SqlWidget
            data={item.data}
          />;
          break;
        case 'r':
          content = <div>
            <iframe src={item.url}></iframe>
          </div>;
          break;
        case 'text':
          content = <div>
            {item.text}
          </div>;
          break;
        case 'input':
          content = <ComboEditor
            onSubmit={this.addOutput.bind(this)}
            index={index}
            mode='r'
          />;
          break;
      }

      if(index === this.state.selected) {
        className += " selected";
      }

      view = <div 
        className={className}
        onClick={this.selectItem.bind(this)}>
        {actions}
        {content}
      </div>;    

      results.push(view);
    });

    return results;
  }

  render() {
    return <div className="content builder">
      <div className="left-pannel">
        <div className="toolbox">
          <div>
            <span>SQL</span>
          </div>
          <div>
            <span>R</span>
          </div>
          <div>
            <span>Text</span>
          </div>
        </div>
      </div>
      <div className="main">
        {this.createMainView()}
      </div>
      <div className="right-pannel">
      </div>
    </div>;
  }
}
 
export default Builder