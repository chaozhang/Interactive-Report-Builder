

var Api = {
  getReport: (id) => {
    return $.get('repo/reports/'+id+'.json');
  }
}

export default Api