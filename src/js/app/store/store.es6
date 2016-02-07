import Api from './api.es6'

var _store = {
  reports: {},
  datasets: {
    graph: {},
    names: [],
    relations: []
  }
}

var Store = {
  getReport: (id) => {
    var def = $.Deferred();

    if(_store.reports[id]) {
      def.resolve(_store.reports[id]);
    } else {
      Api.getReport(id).done( (data) => {
        _store.reports[id] = data;
        def.resolve(_store.reports[id]);
      });
    }

    return def;
  },

  updateReport: (id, data) => {
    // TODO: implement soon
  },

  createReport: (data) => {
    // TODO: implement soon
  },

  getDatasetsGraph: (params) => {
    var def = $.Deferred();

    if(_store.datasets.graph[params]) {
      def.resolve(_store.datasets.graph[params]);
    } else {
      Api.getDatasetsGraph(params).done( (data) => {
        _store.datasets.graph[params] = JSON.parse(data.result);

        if(!_store.datasets.names.length){
          _store.datasets.names = _store.datasets.graph[params].groups.map((item) => {return item.name;});
        }

        if(!_store.datasets.relations.length){
          _store.datasets.relations = $.unique(_store.datasets.graph[params].links.map((item) => {return item.type;})); 
        }

        def.resolve(_store.datasets.graph[params]);
      });
    }

    return def;
  },

  getDatasetRelations: () => {
    return _store.datasets.relations;
  },

  getDatasetNames: () => {
    return _store.datasets.names;
  }

}

export default Store