import DS from "ember-data";

export default DS.Model.extend({
  recordNumber: DS.attr(),
  recordComment: DS.attr(),
  transactionID: DS.attr(),
  profileName: DS.attr(),
  transactionDate: DS.attr(),
  transactionNarrative: DS.attr(),
  transactionDescription: DS.attr(),
  transactionType: DS.attr(),
  walletReference: DS.attr(),
  transactionAmount: DS.attr(),

});
