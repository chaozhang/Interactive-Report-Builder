import React from 'react'
import ComboEditor from '../components/comboEditor.es6'
 
class Builder extends React.Component {
  state = { 
    mode: EDITOR_MODE_SQL
  };

  render() {
    return <div className="content">
      <ComboEditor/>
      <div className="container">
         <iframe/>
      </div>
    </div>;
  }
}
 
export default Builder