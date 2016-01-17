import React from 'react'
import Router from 'react-router'
import Builder from './builder/builder.es6'
import Reports from './reports/reports.es6'
import Datasets from './datasets/datasets.es6'
import Footer from './components/footer.es6'
import Header from './components/header.es6'
import Nav from './components/nav.es6'


var { Route, DefaultRoute, RouteHandler } = Router
 
class App extends React.Component {
  componentDidMount() {
    // set up ocpu
    ocpu.seturl("//158.85.79.185:4515/ocpu/library/rmarkdown/R")

    // distroy TogetherJS before leaving the site
    $( window ).unload(function() {
      if (TogetherJS.require("session")) {
        TogetherJS();
      }
    });
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
    <DefaultRoute handler={Reports}/>
    <Route name="builder" handler={Builder}/>
    <Route name="datasets" handler={Datasets}/>
  </Route>
)

Router.run(routes, (Handler) => 
  React.render(<Handler/>, document.body)
)