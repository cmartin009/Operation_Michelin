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
            let expectedSpeech = "I'm sorry, I missed that. Do you seek a message from your valentine, or do you want to learn more?"
            let expectedReprompt = "Do you seek a message from your valentine, or do you want to learn more?"
            expect(
                responseUnhandledRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);

            await conversation.clearDb();
        });
    });
}
