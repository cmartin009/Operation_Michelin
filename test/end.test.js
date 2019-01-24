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
            let expectedSpeech = "Namaste."
            expect(
                responseEndRequest.isTell(expectedSpeech)
            ).toBe(true);
        });
    });
}
