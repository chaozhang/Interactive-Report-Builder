import React from 'react'
 
class Data extends React.Component {
  componentDidMount() {
    var editor = ace.edit(this.refs.container.getDOMNode());
    editor.getSession().setMode("ace/mode/json");
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setTabSize(2);
    editor.$blockScrolling = Infinity;
    editor.setShowPrintMargin(false);

    if(this.props.data){
      editor.setValue(JSON.stringify(this.props.data, null, '\t'), 1);
    }
  }

  render() {
    return <div className="content" ref="container"/>;
  }
}
 
export default Data