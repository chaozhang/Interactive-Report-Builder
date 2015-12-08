import React from 'react'
import Router from 'react-router'
import Builder from './builder/builder.es6'
import Footer from './components/footer.es6'
import Header from './components/header.es6'
import Nav from './components/nav.es6'


var { Route, DefaultRoute, RouteHandler } = Router

var POSTURL = "http:\/\/158.85.79.185:1337/158.85.79.185:8090/jobs?appName=jobserver&classPath=com.projectx.jobserver.readVisGraph&context=readvisgraph&sync=true";
 
class App extends React.Component {
  state = { 
    data: null
  };

  render() {
    return <div className='bodywrap'>
      <Header/>
      <Nav/>
      <div id='main'>
        <RouteHandler/>
      </div>
      <Footer/>
    </div>
  }
}

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Builder}/>
  </Route>
)

Router.run(routes, (Handler) => 
  React.render(<Handler/>, document.body)
)