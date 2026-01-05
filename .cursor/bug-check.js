/**
 * Test file for Bugbot Rules validation
 */

// 1. TODO/FIXME detection (Should trigger non-blocking bugs)
// TODO: implement proper logging here
const testFunction = () => {
    /* FIXME: missing error handling in this block */
    console.log("Testing Bugbot detection...");
};

// 2. Dangerous Dynamic Execution (Should BLOCK the merge!)
function processData(input) {
    // This line matches the blocking rule and should apply "security" label
    return eval(input); 
}

// 3. Auto-resolve test (Should NOT trigger a bug)
// TODO(#5678): this task is already tracked, so the bot should ignore it