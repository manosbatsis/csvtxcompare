import Ember from "ember";


const daff = window.daff;
const fieldNames = [
  "recordNumber",
  "profileName",
  "transactionDate",
  "transactionAmount",
  "transactionNarrative",
  "transactionDescription",
  "transactionID",
  "transactionType",
  "walletReference"];

export default Ember.Component.extend({

  /**
   * Convert markoff mismatches obiect graph to a
   * two dimensional array compatible with daff
   * @param src
   * @param dest
   * @param prefix
   */
  toArrays : function(markoff){
    let arrays = [];
    arrays.push(fieldNames)
    // iterate records
    let arrayRecord;
    Ember.$.each(markoff, function( recordIndex, record ) {
      arrayRecord = [];
      Ember.$.each(fieldNames, function( fieldNameIndex, fieldName ) {
        arrayRecord.push(record[fieldName]);
      });
      arrays.push(arrayRecord)
    });
    return arrays;
  },
  didInsertElement: function() {

    //  wrap them in daff.TableView:
    var table1 = new daff.TableView(this.toArrays(this.get("model.clientMarkoff.mismatches")));
    var table2 = new daff.TableView(this.toArrays(this.get("model.tutukaMarkoff.mismatches")));

    //
    var alignment = daff.compareTables(table1,table2).align();

    // To produce a diff from the alignment,
    // we first need a table for the output:
    var data_diff = [];
    var table_diff = new daff.TableView(data_diff);

    // Using default options for the diff:
    var flags = new daff.CompareFlags();
    var highlighter = new daff.TableDiff(alignment,flags);
    highlighter.hilite(table_diff);

    // Convert this to a HTML table
    var diff2html = new daff.DiffRender();
    diff2html.render(table_diff);
    var daffTableHtml = diff2html.html();

    // write HTML
    this.$('#daff-container').html(daffTableHtml);
  }
});

