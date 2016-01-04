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
  state = { 
    mode: EDITOR_MODE_SQL
  };

  componentDidMount() {
    var modeRef = "ace/mode/" + this.state.mode;

    editor = ace.edit(this.refs.editor.getDOMNode());

    editor.getSession().setMode(modeRef);
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setTabSize(2);
    editor.$blockScrolling = Infinity;
    editor.setShowPrintMargin(false);
    editor.setValue(DEFAULT_INPUT[this.state.mode], 1);
    editor.setOptions({
      maxLines: 20,
      minLines: 3
    });
  };

  onModeChange(newMode) {
    this.setState({
      mode: newMode
    }, this.componentDidMount);
  };

  onCodeSubmit(e) {
    if (this.state.mode == EDITOR_MODE_R) {
      this.submitRCode();
    } else if (this.state.mode == EDITOR_MODE_SQL) {
      this.submitSQLCode();
    } else if (this.state.mode == EDITOR_MODE_Text) {
      this.submitText();
    }
  };

  submitRCode() {
    var req = ocpu.call("rmdtext", {
      text : editor.getValue()
    }, (session) => {
      this.props.onSubmit(this.props.index, {
        type: this.state.mode,
        url: session.getFileURL("output.html")
      });
    });
  };

  submitSQLCode() {
    var def = $.post(POSTURL, {input: this.urlencode(editor.getValue())});
    def.done((res) => {
      this.props.onSubmit(this.props.index, {
        type: this.state.mode,
        data: res.result
      });
    });
  };

  submitText() {
    this.props.onSubmit(this.props.index, {
      type: this.state.mode,
      text: editor.getValue()
    });
  };

  urlencode(str) {
    //       discuss at: http://phpjs.org/functions/urlencode/
    //      original by: Philip Peterson
    //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Brett Zamir (http://brett-zamir.me)
    //      improved by: Lars Fischer
    //         input by: AJ
    //         input by: travc
    //         input by: Brett Zamir (http://brett-zamir.me)
    //         input by: Ratheous
    //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      bugfixed by: Joris
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //             note: This reflects PHP 5.3/6.0+ behavior
    //             note: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    //             note: pages served as UTF-8
    //        example 1: urlencode('Kevin van Zonneveld!');
    //        returns 1: 'Kevin+van+Zonneveld%21'
    //        example 2: urlencode('http://kevin.vanzonneveld.net/');
    //        returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    //        example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    //        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'

    str = (str + '')
      .toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
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
      <div className="left">
        <Selector
          list={[EDITOR_MODE_SQL, EDITOR_MODE_R, EDITOR_MODE_Text]}
          onChange={this.onModeChange.bind(this)}
        />
      </div>
      <div className="right"> 
        <div ref="editor"/>
        <button onClick={this.onCodeSubmit.bind(this)}>Submit</button>
      </div>
    </div>
  }
}
 
export default ComboEditor