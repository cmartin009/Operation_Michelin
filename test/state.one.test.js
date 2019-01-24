'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(2000);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} STATE ONE INTENTS` , () => {
        test('should return a helpful message and ask for desired action at "HELP"', async () => {
            const conversation = testSuite.conversation();
            const helpRequest = await testSuite.requestBuilder.intent("HelpIntent");
            helpRequest.setState('StateOne')
            const responseHelpRequest = await conversation.send(helpRequest);
            let expectedSpeech = "Welcome to the State One Help Message!"
            let expectedReprompt = "State One help reprompt"
            expect(
                responseHelpRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);
        });

        test('should return an unhandled message and ask for the desired action at "UNHANDLED"', async () => {
            const conversation = testSuite.conversation();
            const unhandledRequest = await testSuite.requestBuilder.intent("Unhandled");
            unhandledRequest.setState('StateOne')
            const responseUnhandledRequest = await conversation.send(unhandledRequest);
            let expectedSpeech = "State One unhandled speech"
            let expectedReprompt = "State One unhandled reprompt"
            expect(
                responseUnhandledRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);
        });
    });
}
