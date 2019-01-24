'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(2000);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} HELP INTENTS` , () => {
        test('should return a helpful message and ask for desired action at "HELP"', async () => {
            const conversation = testSuite.conversation();
            const helpRequest = await testSuite.requestBuilder.intent("HelpIntent");
            const responseHelpRequest = await conversation.send(helpRequest);
            let expectedSpeech = "I am your yoga assistant. I can help you learn class times, take a mindful minute, or take a quiz to find the class that's right for me! How can I help you?"
            let expectedReprompt = "I can help you learn class times, take a mindful minute, or take a quiz to find the class that's right for me! How can I help you?"
            expect(
                responseHelpRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);
        });
    });
}
