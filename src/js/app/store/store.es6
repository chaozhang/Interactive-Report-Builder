import Api from './api.es6'

var _store = {
  reports: {},
  datasets: {}
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

    if(_store.datasets[params]) {
      def.resolve(_store.datasets[params]);
    } else {
      Api.getDatasetsGraph(params).done( (data) => {
        _store.datasets[params] = data;
        def.resolve(_store.datasets[params]);
      });
    }
  }
}

export default Store