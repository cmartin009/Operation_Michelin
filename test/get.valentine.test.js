'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(2000);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} GETPERSONALVALENTINE INTENTS` , () => {
        test('should return a valentine message at "GETPERSONALVALENTINE" with phone number', async () => {
            const conversation = testSuite.conversation();
            
            const getValentineRequest = await testSuite.requestBuilder.intent("GetPersonalValentineIntent", {phoneNumber: "5138505895"});
            const responseToGetValentineRequest = await conversation.send(getValentineRequest);
            
            // Speech Variables
            const expectedSpeech = "Let's see what your admirer has in store for you."
            const actualSpeech = responseToGetValentineRequest.getSpeech();
            
            //Results
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);
            await conversation.clearDb();
        });

        test('should return a valentine message at "GETPERSONALVALENTINE" without key', async () => {
            const conversation = testSuite.conversation();
            
            const getValentineRequest = await testSuite.requestBuilder.intent("GetPersonalValentineIntent");
            const responseToGetValentineRequest = await conversation.send(getValentineRequest);
            
            let expectedSpeech = "Let's find your valentine. Please say your phone number now."
            let expectedReprompt = "Please say your phone number now."
            
            expect(
                responseToGetValentineRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);

            await conversation.clearDb();
        });

        test('should return a valentine message after requesting phone number "GETPERSONALVALENTINE" without key (1st attempt)', async () => {
            const conversation = testSuite.conversation();
            
            let getValentineRequest = await testSuite.requestBuilder.intent("GetPersonalValentineIntent");
            let responseToGetValentineRequest = await conversation.send(getValentineRequest);

            let expectedSpeech = "Let's find your valentine. Please say your phone number now."
            let expectedReprompt = "Please say your phone number now."
            
            expect(
                responseToGetValentineRequest.isAsk(expectedSpeech, expectedReprompt)
            ).toBe(true);
        
            getValentineRequest = await testSuite.requestBuilder.intent("GetPersonalValentineIntent", {phoneNumber: "5138505895"});
            responseToGetValentineRequest = await conversation.send(getValentineRequest);
            
            // Speech Variables
            expectedSpeech = "Let's see what your admirer has in store for you."
            const actualSpeech = responseToGetValentineRequest.getSpeech();
            
            //Results
            expect(actualSpeech.includes(expectedSpeech)).toBe(true);

            await conversation.clearDb();
        });
    });
}
