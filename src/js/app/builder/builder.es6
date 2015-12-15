import React from 'react'
import Iframe from 'react-iframe'
import ComboEditor from '../components/comboEditor.es6'
 
class Builder extends React.Component {

  render() {
    return <div>
    	<ComboEditor/>
    	<div className="container">
		   <Iframe/>
    	</div>
    </div>;
  }
}
 
export default Builder