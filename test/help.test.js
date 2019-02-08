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
            let expectedSpeech = "Hi! I am cupid. I can help you with your Valentine's wishes. Do you seek a message from your valentine, or do you want to learn more?"
            let expectedReprompt = "Do you seek a message from your valentine, or do you want to learn more?"
            expect(
                responseHelpRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);

            await conversation.clearDb();
        });

        test('should return a helpful message and ask for desired action at "AMAZON.HelpIntent"', async () => {
            const conversation = testSuite.conversation();
            const helpRequest = await testSuite.requestBuilder.intent("AMAZON.HelpIntent");
            const responseHelpRequest = await conversation.send(helpRequest);
            let expectedSpeech = "Hi! I am cupid. I can help you with your Valentine's wishes. Do you seek a message from your valentine, or do you want to learn more?"
            let expectedReprompt = "Do you seek a message from your valentine, or do you want to learn more?"
            expect(
                responseHelpRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);

            await conversation.clearDb();
        });
    });
}
