import Ember from "ember";


/**
 * Provides a Datatable component for markoff record match suggestions
 */
export default Ember.Component.extend({
  didInsertElement: function() {

    // init datatable
    var table = this.$('#suggestions-table').DataTable( {
      "paging": false,
      "searching": false,
      "columns": [
        { "visible": true, "type": "num"  },
        { "visible": false },
        { "visible": true },
        { "visible": true, "type": "num" },
        { "visible": false },
        { "visible": false },
        { "visible": false },
        { "visible": false },
        { "visible": false },
        { "visible": true, "type": "num" },
        { "visible": true, "type": "num" },
        { "visible": false },
        { "visible": true },
        { "visible": true, "type": "num"  },
        { "visible": false },
        { "visible": false },
        { "visible": false },
        { "visible": false },
        { "visible": false },
      ]
    });

    this.$('a.toggle-vis').on( 'click', function (e) {
      e.preventDefault();

      // Get the column API object
      let dataColumn = Ember.$(this).attr('data-column')
      dataColumn = dataColumn.split(",");

      // Toggle the visibility
      let column;
      for(let i=0; i < dataColumn.length; i++){
        column = table.column(dataColumn[i]);
        column.visible(!column.visible());
      }

    });
  }
});
