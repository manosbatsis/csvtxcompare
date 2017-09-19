import DS from "ember-data";

export default DS.Model.extend({
  client_recordNumber: DS.attr(),
  client_recordComment: DS.attr(),
  client_transactionID: DS.attr(),
  client_profileName: DS.attr(),
  client_transactionDate: DS.attr(),
  client_transactionNarrative: DS.attr(),
  client_transactionDescription: DS.attr(),
  client_transactionType: DS.attr(),
  client_walletReference: DS.attr(),
  client_transactionAmount: DS.attr(),
  score: DS.attr(),
  tutuka_recordNumber: DS.attr(),
  tutuka_recordComment: DS.attr(),
  tutuka_transactionID: DS.attr(),
  tutuka_profileName: DS.attr(),
  tutuka_transactionDate: DS.attr(),
  tutuka_transactionNarrative: DS.attr(),
  tutuka_transactionDescription: DS.attr(),
  tutuka_transactionType: DS.attr(),
  tutuka_walletReference: DS.attr(),
  tutuka_transactionAmount: DS.attr(),

});
