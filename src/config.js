// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,
 
    intentMap: {
       'AMAZON.StopIntent': 'END',
       'AMAZON.HelpIntent': 'HelpIntent',
    },
 
    db: {
         FileDb: {
             pathToFile: '../db/db.json',
         }
     },

     cms: {
        GoogleSheetsCMS: {
            spreadsheetId: '1ToUu1zhgv9ZgD1rifLKw3XaifBIl845iZZF2Bdeg2Xg',
            access: 'public',
            sheets: [
                {
                    name: 'responses',
                    type: 'Responses',
                },
            ]
        }
    },
 };
 