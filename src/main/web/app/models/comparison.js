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

  clientMarkoff: DS.attr(),
  tutukaMarkoff: DS.attr(),

  /**
   * Get suggestions on possible/closest matches between client and tutuka markoff files.
   * @return the suggestions as two arrays with best matches implied by index
   */
  suggestions: Ember.computed('clientMarkoff', 'tutukaMarkoff', function() {

    // clone scores, sort by score value descending
    let sortedScores = this.get("matchingScores").slice(0).sort(function(a,b) {
      return a.score - b.score;
    });

    console.log("sortedScores:", sortedScores);
    let suggestions = {
      clientRecords: [],
      tutukaRecords: []
    }

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

    // get client/tutuka mismatched records
    const clientMismatches = this.get("clientMarkoff.mismatches");
    const tutukaMismatches = this.get("tutukaMarkoff.mismatches");

    // get the difference in record count between the files if any,
    // useful when comparing record numbers
    const recordCountDifference = Math.abs(clientMismatches.length - tutukaMismatches.length);

    // Evaluate close match scores
    let scores = [];
    // Compare each client markoff record...
    $.each(clientMismatches, function( cIndex, clientRecord ) {
      let tutukaScores = [];
      // ...with each tutuka markof record's ...
      $.each(tutukaMismatches, function( tIndex, tutukaRecord ) {
        let score = 0.0;
        // ...fields
        $.each(fieldNames, function( fIndex, fieldName ) {
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
              && Math.abs(clientRecordNumber - tutukaRecordNumber) <= recordCountDifference){
              score = score + 0.5;
            }
          }
        });
        // add total score for records combo
        tutukaScores.push({
          clientMarkoffIndex : cIndex,
          tutukaMarkoffIndex : tIndex,
          clientRecordRecordNumber : clientRecord.recordNumber,
          tutukaRecordRecordNumber : tutukaRecord.recordNumber,
          score : score
        });
      });
      scores.push(tutukaScores);
    });

    return scores;
  })
/*
 */
});
