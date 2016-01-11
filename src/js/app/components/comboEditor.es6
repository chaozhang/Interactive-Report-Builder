import React from 'react'
import Selector from './selector.es6'

const EDITOR_MODE_SQL = 'sql';
const EDITOR_MODE_R = 'r';
const EDITOR_MODE_Text = 'text';

var editor;
var POSTURL = "http:\/\/158.85.79.185:1337/158.85.79.185:8090/jobs?appName=jobserver&classPath=com.projectx.jobserver.sqlRelay&context=sqlquery&sync=true";

const DEFAULT_INPUT = {
  sql: "select * from Crime limit 20",
  r: "```{r block1}\n# this is the r block\nrequire(astsa)\nplot(jj, ylab=\"Earnings per Share\", main=\"Johnson & Johnson\")\n```",
  text: "Please enter your text here..."
}

class ComboEditor extends React.Component {
  componentDidMount() {
    var modeRef = "ace/mode/" + this.props.mode;

    editor = ace.edit(this.refs.editor.getDOMNode());

    editor.getSession().setMode(modeRef);
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setTabSize(2);
    editor.$blockScrolling = Infinity;
    editor.setShowPrintMargin(false);
    editor.setValue(DEFAULT_INPUT[this.props.mode], 1);
    editor.setOptions({
      maxLines: 20,
      minLines: 3
    });
  };

  onCodeSubmit(e) {
    if (this.props.mode == EDITOR_MODE_R) {
      this.submitRCode();
    } else if (this.props.mode == EDITOR_MODE_SQL) {
      this.submitSQLCode();
    } else if (this.props.mode == EDITOR_MODE_Text) {
      this.submitText();
    }
  };

  submitRCode() {
    var req = ocpu.call("rmdtext", {
      text : editor.getValue()
    }, (session) => {
      this.props.onSubmit(this.props.index, {
        type: this.props.mode,
        url: session.getFileURL("output.html")
      });
    });
  };

  submitSQLCode() {
    var def = $.post(POSTURL, {input: this.urlencode(editor.getValue())});
    def.done((res) => {
      this.props.onSubmit(this.props.index, {
        type: this.props.mode,
        data: res.result
      });
    });
  };

  submitText() {
    this.props.onSubmit(this.props.index, {
      type: this.props.mode,
      text: editor.getValue()
    });
  };

  urlencode(str) {
    var str = (str + '').toString();

    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+');
  };

  render() {
    return <div className="combo-editor">
      <div className="right">
        <div>{this.props.mode} Editor:</div>
        <div ref="editor"/>
        <button onClick={this.onCodeSubmit.bind(this)}>Submit</button>
      </div>
    </div>
  }
}
 
export default ComboEditor