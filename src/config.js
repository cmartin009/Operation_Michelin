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
            spreadsheetId: '1jnGa1vSRA6Yju_PLnnwUezCQGRGhW1GUCqjRSPr9yYw',
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
 