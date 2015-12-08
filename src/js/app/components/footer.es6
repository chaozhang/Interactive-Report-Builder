import React from 'react'
 
class Footer extends React.Component {
  static defaultProps = {
    git: {
      userName: 'chaozhang',
      repoName: 'Force-Directed-Graph',
      btnTypes: [
        {
          name: 'follow',
          size: '170px'
        },
        {
          name: 'star',
          size: '90px'
        },
        {
          name: 'fork',
          size: '90px'
        },
        {
          name: 'watch',
          size: '100px'
        }                        
      ]
    }
  }

  buildGitBtn(type) {
    var user = this.props.git.userName,
        repo = this.props.git.repoName,
        name = type.name,
        width = type.size,
        src = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=${name}&count=true&v=2`;

    return <iframe src={src} frameborder="0" scrolling="0" width={width} height="20px"></iframe>;
  }

  render() {
    var gitBtns = [];
    var currentYear = (new Date()).getFullYear();

    for(var type of this.props.git.btnTypes) {
      gitBtns.push(this.buildGitBtn(type));
    }

    return <footer>
      <div className="social">{gitBtns}</div>
      <p>Copyright &copy; {currentYear}, All rights reserved.</p>
      <p>Created and maintained by <a href="https://github.com/chaozhang/" target="_blank">Chao Zhang</a> (Analytics Engineer at Salesforce).</p>
    </footer>
  }
}
 
export default Footer