'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(2000);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} UNHANDLED INTENTS` , () => {
        test('should return an unhandled message and ask for the desired action at "UNHANDLED"', async () => {
            const conversation = testSuite.conversation();
            const unhandledRequest = await testSuite.requestBuilder.intent("Unhandled");
            const responseUnhandledRequest = await conversation.send(unhandledRequest);
            let expectedSpeech = "I am sorry, I did not understant that. I can help you learn class times, take a mindful minute, or take a quiz to find the class that's right for me! How can I help you?"
            let expectedReprompt = "I can help you learn class times, take a mindful minute, or take a quiz to find the class that's right for me! How can I help you?"
            expect(
                responseUnhandledRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);
        });
    });
}
