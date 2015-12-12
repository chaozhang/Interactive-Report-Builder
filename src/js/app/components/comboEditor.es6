import React from 'react'
import Button from 'react-button'
import Selector from './selector.es6'

const EDITOR_MODE_SQL = 'sql';
const EDITOR_MODE_R = 'r';
const EDITOR_MODE_Text = 'text';

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
    var editor = ace.edit(this.refs.editor.getDOMNode());
    var modeRef = "ace/mode/" + this.state.mode;

    editor.getSession().setMode(modeRef);
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setTabSize(2);
    editor.$blockScrolling = Infinity;
    editor.setShowPrintMargin(false);
    editor.setValue(DEFAULT_INPUT[this.state.mode], 1);
  }

  onModeChange(newMode) {
    this.setState({
      mode: newMode
    }, this.componentDidMount);
  }

  onCodeSubmit() {
    if (this.state.mode == EDITOR_MODE_R) {
      submitRCode();
    }
  }

  submitRCode() {
    
  }

  render() {
    return <div className="combo-editor">
        <Selector
          list={[EDITOR_MODE_SQL, EDITOR_MODE_R, EDITOR_MODE_Text]}
          onChange={this.onModeChange.bind(this)}
        />
        <Button onClick={this.onCodeSubmit.bind(this)}>Submit</Button>
        <div ref="editor"/>
      </div>
  }
}
 
export default ComboEditor