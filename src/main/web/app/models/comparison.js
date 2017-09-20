import Ember from "ember";
import DS from "ember-data";

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

export default DS.Model.extend({
  //store: Ember.inject.service(),

  clientMarkoff: DS.attr(),
  tutukaMarkoff: DS.attr(),

  /**
   * Copy the source properties to the destination hash using the given prefix, if any
   * @param src
   * @param dest
   * @param prefix
   */
  copyRecordProperties : function(source, dest, prefix){
    prefix = prefix || "";
    Ember.$.each(fieldNames, function( fIndex, fieldName ) {
      dest[prefix + fieldName] = source[fieldName];
    });
  },


  getBlankRecord : function(){
    return {
      recordNumber: null,
      recordComment: null,
      transactionID: null,
      profileName: null,
      transactionDate: null,
      transactionNarrative: null,
      transactionDescription: null,
      transactionType: null,
      walletReference: null,
      transactionAmount: null
    };
  },

  /**
   * Get suggestions on possible/closest matches between client and tutuka markoff files.
   * @return the suggestions as two arrays with best matches implied by index
   */
  suggestions: Ember.computed('matchingScores', function() {

    // flatten scores, sort by score value, descending
    let sortedScores = [].concat.apply([], this.get("matchingScores")).sort(function(a,b) {
      return b.score - a.score;
    });

    // suggestions
    var suggestions = [];

    // convenient note on used record indexes
    var suggested = {client : [], tutuka : []};

    // iterate to pick the best suggestions
    const clientMarkoffMismatches = this.get("clientMarkoff.mismatches");
    const tutukaMarkoffMismatches = this.get("tutukaMarkoff.mismatches");
    let scoreRecord;
    for(var i = 0; i < sortedScores.length;  i++){
      scoreRecord = sortedScores[i];

      // ensure records from neither side have already been suggested
      const bSuggested = Ember.$.inArray(scoreRecord.clientMarkoffIndex, suggested.client) >= 0
        || Ember.$.inArray(scoreRecord.tutukaMarkoffIndex, suggested.tutuka) >= 0;
      if(!bSuggested){

        // get matched records
        const clientRecord = clientMarkoffMismatches[scoreRecord.clientMarkoffIndex] || this.getBlankRecord();
        const tutukaRecord = tutukaMarkoffMismatches[scoreRecord.tutukaMarkoffIndex] || this.getBlankRecord();

        // build a joint record
        let suggestion = {};
        this.copyRecordProperties(clientRecord, suggestion, "client_");
        this.copyRecordProperties(tutukaRecord, suggestion, "tutuka_");
        suggestion.score = scoreRecord.score;

        // add suggestion
        suggestions.push(this.get('store').createRecord('suggestion', suggestion));

        // stop if we have gathered sugestions for all records
        if(suggestions.length >= clientMarkoffMismatches.length
          && suggestions.length >= tutukaMarkoffMismatches.length){
          break;
        }
        // else, note used
        else{
          suggested.client.push(scoreRecord.clientMarkoffIndex);
          suggested.tutuka.push(scoreRecord.tutukaMarkoffIndex);
        }

      }
    }

    return suggestions;

  }),

  /**
   * Calculate and return the matching scores between client and tutuka markoff records.
   * Records are compared field by field. Each match is awarded with a score of 1.0.
   * The only exception is the record number, where a threshold of extra/missing records
   * allows for awarding 0.5. No other special semantics/logic/weights are applied.
   * @return the matching scores as an array of objects, each having t6he following fields:
   * clientMarkoffIndex, tutukaMarkoffIndex, clientRecordRecordNumber, tutukaRecordRecordNumber, score
   */
  matchingScores: Ember.computed('clientMarkoff', 'tutukaMarkoff', function() {

    // clone client/tutuka mismatched records
    const clientMismatches = this.get("clientMarkoff.mismatches").slice(0);
    const tutukaMismatches = this.get("tutukaMarkoff.mismatches").slice(0);


    // get the difference in record count between the files if any,
    // useful when comparing record numbers
    const recordCountDifference = Math.abs(clientMismatches.length - tutukaMismatches.length);

    // add blanks for unbalanced record counts
    while(clientMismatches.length < tutukaMismatches.length){
      clientMismatches.push({recordNumber: "-"});
    }
    while(clientMismatches.length > tutukaMismatches.length){
      tutukaMismatches.push({recordNumber: "-"});
    }

    // Evaluate close match scores
    let scores = [];
    // Compare each client markoff record...
    Ember.$.each(clientMismatches, function( cIndex, clientRecord ) {
      let tutukaScores = [];
      // ...with each tutuka markof record's ...
      Ember.$.each(tutukaMismatches, function( tIndex, tutukaRecord ) {
        let score = 0.0;
        // ...fields
        Ember.$.each(fieldNames, function( fIndex, fieldName ) {
          // Add a point for any field match
          if(clientRecord[fieldName] == tutukaRecord[fieldName]){
            score = score + 1.0;
          }
          // Friendlier handling for record number,
          // award some points if difference is lesser than the
          // difference of record counts between markoff files
          else if(fieldName == "recordNumber" && recordCountDifference > 0){
            const clientRecordNumber = clientRecord[fieldName];
            const tutukaRecordNumber = tutukaRecord[fieldName];
            // TODO: this does not take into account
            // which side has more records
            // or how many "extra" records have been processed
            if(clientRecordNumber && tutukaRecordNumber
                && !isNaN(clientRecordNumber) && !isNaN(tutukaRecordNumber)
                && Math.abs(clientRecordNumber - tutukaRecordNumber) <= recordCountDifference){
              score = score + 0.5;
            }
          }
        });
        // add total score for records combo
        let oScore = {
          clientMarkoffIndex : cIndex,
          tutukaMarkoffIndex : tIndex,
          clientRecordNumber : clientRecord.recordNumber,
          tutukaRecordNumber : tutukaRecord.recordNumber,
          score : score
        };
        tutukaScores.push(oScore);
      });
      scores.push(tutukaScores);
    });
    return scores;
  })

});
