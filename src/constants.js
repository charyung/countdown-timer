const TIME_IN_SECS = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400
};

// According to ECMA specs, max and min time is 8640000000000 seconds to either side of the Unix Epoch.
// http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
const TIME_LIMIT = 8640000000000;

export { TIME_IN_SECS, TIME_LIMIT };
