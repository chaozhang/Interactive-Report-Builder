import React from 'react'
import QueryEditor from '../components/queryEditor.es6'
import SqlWidget from './sqlWidget.es6'
import Store from '../store/store.es6'

const DEFAULT_INPUT = {
  sql: "select * from Crime limit 20",
  r: "```{r block1}\n# this is the r block\nrequire(astsa)\nplot(jj, ylab=\"Earnings per Share\", main=\"Johnson & Johnson\")\n```",
  text: "Please enter your text here..."
}

const EMPTY_MESSAGE = "Please create a query from left pannel.";

const POSTURL = "http:\/\/158.85.79.185:1337/158.85.79.185:8090/jobs?appName=jobserver&classPath=com.projectx.jobserver.sqlRelay&context=sqlquery&sync=true";
 
class Builder extends React.Component {
  state = { 
    data: [],
    selected: -1
  }

  componentDidMount() {
    var reportId = this.props.query.id;

    if(reportId) {
      Store.getReport(reportId).done((res) => {
        this.setState({
          data: res.data
        });
      });
    }
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

  editItem(e) {
    var index = this.getIndex(e),
        data = this.state.data,
        editing = data[index]['editing'];

    e.stopPropagation();
    data[index]['editing'] = !editing;

    this.setState({
      data: data
    });
  }

  removeItem(e) {
    var index = this.getIndex(e),
        data = this.state.data;

    e.stopPropagation();
    data.splice(index, 1);

    this.setState({
      data: data,
      selected: -1
    });
  }

  addNewItem(type) {
    var index = this.state.selected,
        data = this.state.data,
        newIndex = (index == -1) ? data.length-1 : index;

    data.splice(newIndex + 1, 0, {
      type: type,
      editing: true,
      query: DEFAULT_INPUT[type]
    });

    this.setState({
      data: data,
      selected: newIndex + 1
    });
  }

  getIndex(e) {
    var $section = $(e.target).closest(".section");

    return $(".main .section").index($section[0]);
  }

  createActions(output, editing) {
    let editBtn, removeBtn;

    if(output) {
      editBtn = <button onClick={this.editItem.bind(this)}>Edit</button>;
      if(!editing) {
        removeBtn = <button onClick={this.removeItem.bind(this)}>Delete</button>;
      }     
    }

    return <div className="actions">
      {editBtn}
      {removeBtn}
    </div>
  }

  runQuery(type, query, index) {
    if(type == 'r') {
      ocpu.call("rmdtext", {
        text: query
      }, (session) => {
        this.addOutput(index, {
          type: type,
          url: session.getFileURL("output.html"),
          query: query
        });
      });
    } else if(type == 'sql') {
      let def = $.post(POSTURL, {input: this.urlencode(query)});

      def.done((res) => {
        this.addOutput(index, {
          type: type,
          data: res.result,
          query: query
        });
      });
    }
  }

  urlencode(str) {
    var str = (str + '').toString();

    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+');
  }

  createMainView() {
    var items = this.state.data,
        results = [],
        actions;

    items.forEach((item, index) => {
      let view,
          output,
          input,
          className = "section";

      switch (item.type) {
        case 'sql':
          if(item.data) {
            output = <SqlWidget
              data={item.data}
            />;        
          } else if(item.query && !item.editing) {
            this.runQuery(item.type, item.query, index);
          }
          break;
        case 'r':
          if(item.url) {
            output = <div>
              <iframe src={item.url}></iframe>
            </div>;      
          } else if(item.query && !item.editing) {
            this.runQuery(item.type, item.query, index);
          }
          break;
        case 'text':
          if(item.text || item.text == "") {
            output = <div>
              {item.text}
            </div>;     
          }
          break;
      }

      if(item.editing) {
        input = <QueryEditor
          onSubmit={this.addOutput.bind(this)}
          index={index}
          mode={item.type}
          query={item.query}
        />;
      }

      actions = this.createActions(output, item.editing);

      if(index === this.state.selected) {
        className += " selected";
      }

      view = <div 
        className={className}
        onClick={this.selectItem.bind(this)}>
        {actions}
        <div>
          {input}
          {output}
        </div>
      </div>;    

      results.push(view);
    });

    if(items.length == 0){
      results.push(<div className="empty">{EMPTY_MESSAGE}</div>)
    }

    return results;
  }

  render() {
    return <div className="content builder">
      <div className="left-pannel">
        <div className="toolbox">
          <div onClick={this.addNewItem.bind(this, 'sql')}>
            <span>SQL</span>
          </div>
          <div onClick={this.addNewItem.bind(this, 'r')}>
            <span>R</span>
          </div>
          <div onClick={this.addNewItem.bind(this, 'text')}>
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