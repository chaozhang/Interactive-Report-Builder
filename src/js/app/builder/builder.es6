import React from 'react'
import ComboEditor from '../components/comboEditor.es6'
 
class Builder extends React.Component {

  render() {
    return <div>
    	<ComboEditor/>
    	<div className="container"></div>
    </div>;
  }
}
 
export default Builder