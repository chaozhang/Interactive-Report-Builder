var URL_DATASETS = "http:\/\/158.85.79.185:1337/158.85.79.185:8090/jobs?appName=jobserver&classPath=com.projectx.jobserver.readVisGraph&context=readvisgraph&sync=true";

var Api = {
  getReport: (id) => {
    return $.get('repo/reports/'+id+'.json');
  },

  getDatasetsGraph: (params) => {
    return $.post(URL_DATASETS, {input: params});
  }
}

export default Api