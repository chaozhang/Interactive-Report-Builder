import React from 'react'
import Selector from './selector.es6'

const EDITOR_MODE_SQL = 'sql';
const EDITOR_MODE_R = 'r';
const EDITOR_MODE_Text = 'text';

const POSTURL = "http:\/\/158.85.79.185:1337/158.85.79.185:8090/jobs?appName=jobserver&classPath=com.projectx.jobserver.sqlRelay&context=sqlquery&sync=true";

class QueryEditor extends React.Component {
  componentDidMount() {
    var modeRef = "ace/mode/" + this.props.mode;

    this.editor = ace.edit(this.refs.editor.getDOMNode());

    this.editor.getSession().setMode(modeRef);
    this.editor.getSession().setUseWrapMode(true);
    this.editor.getSession().setTabSize(2);
    this.editor.$blockScrolling = Infinity;
    this.editor.setShowPrintMargin(false);
    this.editor.setValue(this.props.query, 1);

    this.editor.setOptions({
      maxLines: 20,
      minLines: 3
    });
  };

  onCodeSubmit(e) {
    e.stopPropagation();

    if (this.props.mode == EDITOR_MODE_R) {
      this.submitRCode();
    } else if (this.props.mode == EDITOR_MODE_SQL) {
      this.submitSQLCode();
    } else if (this.props.mode == EDITOR_MODE_Text) {
      this.submitText();
    }
  };

  submitRCode() {
    var query = this.editor.getValue();

    ocpu.call("rmdtext", {
      text: query
    }, (session) => {
      this.props.onSubmit(this.props.index, {
        type: this.props.mode,
        url: session.getFileURL("output.html"),
        query: query
      });
    });
  };

  submitSQLCode() {
    var query = this.editor.getValue(),
        def = $.post(POSTURL, {input: this.urlencode(query)});

    def.done((res) => {
      this.props.onSubmit(this.props.index, {
        type: this.props.mode,
        data: res.result,
        query: query
      });
    });
  };

  submitText() {
    var query = this.editor.getValue();

    this.props.onSubmit(this.props.index, {
      type: this.props.mode,
      text: query,
      query: query
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
    return <div className="query-editor">
      <div ref="editor"/>
      <div className="submitBtn" onClick={this.onCodeSubmit.bind(this)}>Submit</div>
    </div>
  }
}
 
export default QueryEditor