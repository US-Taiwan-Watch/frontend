// This should be false while you are delveloping some new feature.
// Set it to true if you are working on something to be released.
const hideDev = false;

export const showDevContent = process.env.NODE_ENV === 'development' && !hideDev;
