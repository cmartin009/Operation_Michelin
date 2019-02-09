'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(2000);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} LEARNMORE INTENTS` , () => {
        test('should return a more information about My Valentine at "LEARNMORE"', async () => {
            const conversation = testSuite.conversation();
            
            const getValentineRequest = await testSuite.requestBuilder.intent("LearnMoreIntent");
            const responseToGetValentineRequest = await conversation.send(getValentineRequest);
            
            // Speech Variables
            const expectedSpeech = "My Valentine allows users to present their loved ones with a audio message. "
            const actualSpeech = responseToGetValentineRequest.getSpeech();
            const expectedReprompt = "do you seek a message from your valentine, or do you want to learn more?";
            const actualReprompt = responseToGetValentineRequest.getReprompt();
            
            //Results
            expect(actualReprompt).toBe(expectedReprompt);
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);

            await conversation.clearDb();
        });

        test('should return a valentine AFTER more information about My Valentine at "LEARNMORE"', async () => {
            const conversation = testSuite.conversation();
            
            let getValentineRequest = await testSuite.requestBuilder.intent("LearnMoreIntent");
            let responseToGetValentineRequest = await conversation.send(getValentineRequest);
            
            // Speech Variables
            let expectedSpeech = "My Valentine allows users to present their loved ones with a audio message."
            let actualSpeech = responseToGetValentineRequest.getSpeech();
            let expectedReprompt = "do you seek a message from your valentine, or do you want to learn more?";
            let actualReprompt = responseToGetValentineRequest.getReprompt();
            
            //Results
            expect(actualReprompt).toBe(expectedReprompt);
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);

            getValentineRequest = await testSuite.requestBuilder.intent("GetPersonalValentineIntent", {phoneNumber: "5138505895"});
            responseToGetValentineRequest = await conversation.send(getValentineRequest);
            
            // Speech Variables
            expectedSpeech = "Let's see what your admirer has in store for you."
            actualSpeech = responseToGetValentineRequest.getSpeech();
            
            //Results
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);

            await conversation.clearDb();
        });
    });
}
