// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,
 
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
                    position: 1,
                },
                {
                    name: 'valentine',
                    type: 'KeyValue',
                    position: 2,
                },
            ]
        }
    },
 };
 