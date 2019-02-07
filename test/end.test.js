'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(2000);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} END INTENTS` , () => {
        test('should return an exit message at "END"', async () => {
            const conversation = testSuite.conversation();
            const endRequest = await testSuite.requestBuilder.intent("End");
            const responseEndRequest = await conversation.send(endRequest);
<<<<<<< HEAD
            let expectedSpeech = "Thank You for using my valentine voice app by Voice First Tech. You can create your own message and upload at voicefirsttech.com/myvalentine"
            expect(
                responseEndRequest.isTell(expectedSpeech)
            ).toBe(true);

            await conversation.clearDb();
=======
            
            // Speech Variables
            const expectedSpeech = "Thank You for using my valentine voice app by Voice First Tech. You can create your own message and upload at voicefirsttech.com/myvalentine"
            const actualSpeech = responseEndRequest.getSpeech();
            
            //Results
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);
>>>>>>> f7fa2d82b30e47a98d54a0c6c96fa656c4e2892a
        });
    });
}
