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
            let expectedSpeech = "Welcome to Yoga on High! We want to improve community access to minfulness. I can help you learn class times, take a mindful minute, or take a quiz to find the class that's right for me! How can I help you?"
            let expectedReprompt = "I can help you learn class times, take a mindful minute, or take a quiz to find the class that's right for me! How can I help you?"
            expect(
                responseLaunchRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);
        });
    });
}
