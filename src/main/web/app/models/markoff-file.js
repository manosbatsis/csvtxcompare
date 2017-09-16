import DS from "ember-data";

export default DS.Model.extend({

  fileName: DS.attr(),
  fileSize: DS.attr(),
  totalRecordsCount: DS.attr(),
  matchedRecordsCount: DS.attr(),
  mismatchedRecordsCount: DS.attr(),
  mismatches: DS.attr(),

});
