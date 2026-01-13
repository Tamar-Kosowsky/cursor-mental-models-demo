// This file is intentionally "bad" for a Bugbot demo.

// TODO: refactor this later (no issue reference) -> should trigger TODO/FIXME rule (non-blocking)

// (Optional) This one WOULD auto-resolve if your rule is enabled:
// TODO(#1234): convert this to a safe parser

/**
 * Very unsafe: evaluates user-provided strings as code.
 * This is exactly what the eval/exec rule should catch and block.
 */
export function runUserExpression(userInput) {
    // Simulate untrusted input coming from a request/query param:
    const expr = String(userInput);
  
    // Dangerous dynamic execution -> should trigger the security rule (blocking + label "security")
    // eslint-disable-next-line no-eval
    return eval(expr);
  }
  
  /**
   * Another unsafe pattern: building code as a string and running it.
   */
  export function runGeneratedCode(name) {
    const code = `(() => "Hello, ${name}!")()`; // still dangerous if name is untrusted
    // eslint-disable-next-line no-eval
    return eval(code);
  }
  