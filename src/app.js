'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { GoogleSheetsCMS } = require('jovo-cms-googlesheets');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb(),
    new GoogleSheetsCMS()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({

    /*
    *   Launch Intent - Default Intent when customers launch app
    */
    LAUNCH() {
        this.$speech.addText(this.t('welcome.speech'))
        this.$reprompt.addText(this.t('welcome.reprompt'))
        console.log(this.$cms.valentine["Patrick Sweetman"]) 
        this.ask(this.$speech, this.$reprompt)
    },

    /*
    *   Help Intent - Default Intent when customers ask for HELP
    */
    HelpIntent() {
        this.$speech.addText(this.t('help.global.speech'))
        this.$reprompt.addText(this.t('help.global.reprompt'))
        this.ask(this.$speech, this.$reprompt)
    },

    /*
    *   Unhandled Intent - Default Intent when customers' speech is not recognized in context
    */
    Unhandled() {
        this.$speech.addText(this.t('unhandled.global.speech'))
        this.$reprompt.addText(this.t('unhandled.global.reprompt'))
        this.ask(this.$speech, this.$reprompt)
    },

    /*
    *   End Intent - Default Intent when customers wants to exit
    */
    End() {
        this.$speech.addText(this.t('end.speech'))
        this.tell(this.$speech)
    },

    StateOne: {
        /*
        *   STATE ONE Help Intent - Default Intent when customers ask for HELP
        */
        HelpIntent() {
            this.$speech.addText(this.t('help.state.one.speech'))
            this.$reprompt.addText(this.t('help.state.one.reprompt'))
            this.ask(this.$speech, this.$reprompt)
        },

        /*
        *   STATE ONE Unhandled Intent - Default Intent when customers' speech is not recognized in context
        */
        Unhandled() {
            this.$speech.addText(this.t('unhandled.state.one.speech'))
            this.$reprompt.addText(this.t('unhandled.state.one.reprompt'))
            this.ask(this.$speech, this.$reprompt)
        },

    }
});

module.exports.app = app;
