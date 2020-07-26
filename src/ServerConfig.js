export const defaultConfigValues = {
    requestCallButtonText: 'Request a call',
    phoneNumberInputPlaceholderText: 'Enter a phone number',
    phoneNumberInputDefaultCountry: 'US',
    scheduleCallCheckboxText: 'Schedule a call',
    scheduleCallTimePlaceholerTest: 'Select time',
    communicationPlatforms: {
        'phone': 'Phone',
        'whatpsapp': 'WhatsApp',
        'viber': 'Viber',
        'telegram': 'Telegram',
    },
    showCommunicationMethods: true,
    modalTitle: 'Request a callback',
    prefferedCommunicationMethod: 'Preffered communication method:',
    successMessage: 'Thank you! We\ll get back to you soon.',
};

export const getServerConfig = async () => {
    return new Promise(resolve => resolve(defaultConfigValues))
};