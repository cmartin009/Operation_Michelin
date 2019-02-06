'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(2000);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return a welcome message and ask for the name at "LAUNCH"', async () => {
            const conversation = testSuite.conversation();
            const launchRequest = await testSuite.requestBuilder.launch();
            const responseLaunchRequest = await conversation.send(launchRequest);

            // Speech Variables
            const expectedSpeech = "do you seek a message from your valentine"
            const expectedReprompt = 'Just say "secret admirer"'
            const actualSpeech = responseLaunchRequest.getSpeech();
            const actualReprompt = responseLaunchRequest.getReprompt();
            
            //Results
            expect(actualReprompt).toBe(expectedReprompt);
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);
        });
    });
}
