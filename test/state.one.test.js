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
            
            // Speech Variables
            const expectedSpeech = "help.state.one.speech"
            const expectedReprompt = "help.state.one.reprompt"
            const actualSpeech = responseHelpRequest.getSpeech();
            const actualReprompt = responseHelpRequest.getReprompt();
            
            console.log(expectedSpeech)
            console.log(actualSpeech)
            //Results
            expect(actualReprompt.includes(expectedReprompt)).toBe(true)
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);
        });

        test('should return an unhandled message and ask for the desired action at "UNHANDLED"', async () => {
            const conversation = testSuite.conversation();
            const unhandledRequest = await testSuite.requestBuilder.intent("Unhandled");
            unhandledRequest.setState('StateOne')
            const responseUnhandledRequest = await conversation.send(unhandledRequest);

            // Speech Variables
            const expectedSpeech = "unhandled.state.one.speech"
            const expectedReprompt = "unhandled.state.one.reprompt"
            const actualSpeech = responseUnhandledRequest.getSpeech();
            const actualReprompt = responseUnhandledRequest.getReprompt();
            
            //Results
            expect(actualReprompt.includes(expectedReprompt)).toBe(true)
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);
        });
    });
}
