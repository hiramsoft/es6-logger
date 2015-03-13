/**
 * This is the AngularJS $logProvider pulled out into a module that JSPM ES6
 * can use as a dependency
 * @ngdoc provider
 * @name $logProvider
 * @description
 * Use the `$logProvider` to configure how the application logs messages
 */
class Log {
    static factory() {
        return new Log();
    }

    constructor() {
        this._debug = false;
    }

    /**
     * @ngdoc method
     * @name $logProvider#debugEnabled
     * @description
     * @param {boolean=} flag enable or disable debug level messages
     * @returns {*} current value if used as getter or itself (chaining) if used as setter
     */
    debugEnabled(flag) {
        if (flag !== undefined && flag !== null) {
            this._debug = flag;
            return this;
        } else {
            return this._debug;
        }
    }

    /**
     * @ngdoc method
     * @name $log#log
     *
     * @description
     * Write a log message
     */
    log(...args) {
        this.consoleLog('log', args);
    }

    /**
     * @ngdoc method
     * @name $log#info
     *
     * @description
     * Write an information message
     */
    info(...args) {
        this.consoleLog('info', args);
    }

    /**
     * @ngdoc method
     * @name $log#warn
     *
     * @description
     * Write a warning message
     */
    warn(...args) {
        this.consoleLog('warn', args);
    }

    /**
     * @ngdoc method
     * @name $log#error
     *
     * @description
     * Write an error message
     */
    error(...args) {
        this.consoleLog('error', args);
    }

    /**
     * @ngdoc method
     * @name $log#debug
     *
     * @description
     * Write a debug message
     */
    debug(...args) {
        if (this._debug) {
            this.consoleLog('debug', args);
        }
    }

    formatError(arg) {
        if (arg instanceof Error) {
            if (arg.stack) {
                arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
                    ? 'Error: ' + arg.message + '\n' + arg.stack
                    : arg.stack;
            } else if (arg.sourceURL) {
                arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
        }
        return arg;
    }

    noop() {
        // as the name implies
    }

    consoleLog(type, args) {
        let c = window.console || {},
            logFn = c[type] || c.log || this.noop,
            hasApply = false;

        // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
        // The reason behind this is that console.log has type "object" in IE8...
        try {
            hasApply = !!logFn.apply;
        } catch (e) {
        }

        if (hasApply) {
            var _args = [];
            args.forEach((arg) => {
                _args.push(this.formatError(arg));
            });
            logFn.apply(c, _args);
        }
        else {
            // we are IE which either doesn't have window.console => this is noop and we do nothing,
            // or we are IE where console.log doesn't have apply so we log at least first 2 args
            logFn(args[0], args[1] == null ? '' : args[1]);
        }

    }

}

Log.factory.$inject = [];

let _instance = Log.factory();

export default _instance;