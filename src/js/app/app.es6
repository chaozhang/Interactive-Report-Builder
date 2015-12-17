import React from 'react'
import Router from 'react-router'
import Builder from './builder/builder.es6'
import Footer from './components/footer.es6'
import Header from './components/header.es6'
import Nav from './components/nav.es6'


var { Route, DefaultRoute, RouteHandler } = Router
 
class App extends React.Component {
  componentWillMount() {
    // set up ocpu
    ocpu.seturl("//158.85.79.185:3602/ocpu/library/rmarkdown/R")

    // distroy TogetherJS before leaving the site
    $( window ).unload(function() {
      if (TogetherJS.require("session")) {
        TogetherJS();
      }
    });
  }

  componentDidMount() {
    if(!TogetherJS.startup.continued){
      TogetherJS();
    }     
  }

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