import React from 'react'
import Button from 'react-button'
import Selector from './selector.es6'

const EDITOR_MODE_SQL = 'sql';
const EDITOR_MODE_R = 'r';
const EDITOR_MODE_Text = 'text';

var editor;
var POSTURL = "http:\/\/158.85.79.185:1337/158.85.79.185:8090/jobs?appName=jobserver&classPath=com.projectx.jobserver.sqlRelay&context=sqlquery&sync=true";

const DEFAULT_INPUT = {
  sql: "SELECT city, COUNT(id) AS users_count\nFROM users\nWHERE group_name = 'salesman'\NAND created > '2011-05-21'\nGROUP BY 1\nORDER BY 2 DESC",
  r: "Call:\nlm(formula = y ~ x)\n\nResiduals:\n1       2       3       4       5       6\n3.3333 -0.6667 -2.6667 -2.6667 -0.6667  3.3333\n\nCoefficients:\n           Estimate Std. Error t value Pr(>|t|)\n(Intercept)  -9.3333     2.8441  -3.282 0.030453 *\nx             7.0000     0.7303   9.585 0.000662 ***\n---\nSignif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1\n\nResidual standard error: 3.055 on 4 degrees of freedom\n> par(mfrow=c(2, 2))     # Request 2x2 plot layout\n> plot(lm_1)             # Diagnostic plot of regression model",
  text: "Please type your text here..."
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
      minLines: 1
    });
  }

  onModeChange(newMode) {
    this.setState({
      mode: newMode
    }, this.componentDidMount);
  }

  onCodeSubmit() {
    if (this.state.mode == EDITOR_MODE_R) {
      this.submitRCode();
    } else if (this.state.mode == EDITOR_MODE_SQL) {
      this.submitSQLCode();
    }
  }

  domarkdown() {
    var req = ocpu.call("rmdtext", {
      text : editor.getValue()
    }, function(session){
      $("iframe").attr('src', session.getFileURL("output.html"));
    }).fail(function(text){
      alert("Error: " + req.responseText);
    });
  }

  submitRCode() {
    this.domarkdown();
  }

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
  }
  submitSQLCode() {
    var def = $.post(POSTURL, {input: this.urlencode(editor.getValue())});
    def.done( (res) => {
      alert(res.status);
    });
  }

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
        <Button onClick={this.onCodeSubmit.bind(this)}>Submit</Button>
      </div>
    </div>
  }
}
 
export default ComboEditor