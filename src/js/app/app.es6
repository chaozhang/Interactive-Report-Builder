import React from 'react'
import Router from 'react-router'
import Builder from './builder/builder.es6'
import Footer from './components/footer.es6'
import Header from './components/header.es6'
import Nav from './components/nav.es6'


var { Route, DefaultRoute, RouteHandler } = Router
 
class App extends React.Component {
  componentWillMount() {
    // set up together js
    TogetherJSConfig_autoStart = true;
    TogetherJSConfig_suppressJoinConfirmation = true;
    TogetherJSConfig_dontShowClicks = true;
    TogetherJSConfig_disableWebRTC = true;
    TogetherJSConfig_toolName = " Collaboration";
    TogetherJSConfig_siteName = "projectx";
    TogetherJSConfig_cloneClicks = false;
    TogetherJSConfig_on_ready = function () {};
    TogetherJSConfig_getUserName = function () {
      return 'Your Name...';
    };

    // set up ocpu
    ocpu.seturl("//158.85.79.185:3602/ocpu/library/rmarkdown/R")
  }

  componentWillUnmount() {
    if (TogetherJS.require("session")) {
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