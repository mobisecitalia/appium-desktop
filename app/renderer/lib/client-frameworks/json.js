import Framework from './framework';

class JsonFramework extends Framework {

  get language () {
    return 'json';
  }

  getCodeString (includeBoilerplate = false) {
    let str = '';
    let i = 0;
    for (let {action, params} of this.actions) {
      let genCodeFn = `codeFor_${action}`;
      if (!this[genCodeFn]) {
        throw new Error(`Need to implement 'codeFor_${action}()'`);
      }
      let code = this[genCodeFn](...params);

      if (i === 0) {
        str += `[\n`;
      }
      if (code) {
        str += `${code}`;
        if (i < this.actions.length - 1) {
          str += `,\n`;
        } else {
          str += `\n`;
        }
      }

      if (i === this.actions.length - 1) {
        str += `]\n`;
      }
      i++;
    }
    if (includeBoilerplate) {
      return this.wrapWithBoilerplate(str);
    }
    return str;
  }

  wrapWithBoilerplate (code) {
    return `# This sample code uses the Appium json client
    ${code}
    `;
  }

  codeFor_findAndAssign () {
    return null;
  }

  codeFor_click (varName, varIndex, strategy, identifier) {

    let result = {
      'action': 'click',
      strategy,
      identifier
    };

    return JSON.stringify(result);
  }

  codeFor_clear () {

    let result = {
      'action': 'clear'
    };

    return JSON.stringify(result);
  }

  codeFor_sendKeys (varName, varIndex, text, strategy, identifier) {
    let result = {
      'action': 'sendKeys',
      'value': text,
      strategy,
      identifier
    };

    return JSON.stringify(result);
  }

  codeFor_back () {
    let result = {
      'action': 'back'
    };

    return JSON.stringify(result);
  }

  codeFor_tap (varNameIgnore, varIndexIgnore, x, y) {
    let result = {
      'action': 'tap',
      x,
      y
    };

    return JSON.stringify(result);
  }

  codeFor_swipe (varNameIgnore, varIndexIgnore, x1, y1, x2, y2) {
    let result = {
      'action': 'swipe',
      x1,
      y1,
      x2,
      y2
    };

    return JSON.stringify(result);
  }
}

JsonFramework.readableName = 'Json';

export default JsonFramework;
