var inititalize = function() {
    var ParseModule = require('https://www.parsecdn.com/js/parse-1.1.15.min.js');
    ParseModule.Parse.initialize("XDnTN3cpdPIhzRua58wPlXAJE41vKCHNlAmqAchK",
                                 "IIZqLo8MNAQOv3sXANbAs2K2fojb2qPAkOb5CrqK");
    return ParseModule.Parse;
};

exports.ParseInitialize = inititalize();