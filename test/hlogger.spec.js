import $log from '../src/hiram-logger'

class TestObj{
    constructor(){
        this.var1 = "Var1";
        this.var2 = ["Var2a", "Var2b"];
    }
}

describe('The Synopsis Test', () => {
    it('should have $log defined and print 5 messages in the console', () => {
        expect($log).not.toBe(null);
        expect($log.info).not.toBe(null);
        expect($log.debug).not.toBe(null);
        expect($log.error).not.toBe(null);
        expect($log.warn).not.toBe(null);
        expect($log.log).not.toBe(null);

        $log.debug('A debug message');
        $log.info('An info message');
        $log.log('An info message synonym');
        $log.warn('A warning message');
        $log.error('An error message');
    });

    it('should allow passing in variables', () => {
        let obj1 = new TestObj();
        let obj2 = {
            "var1" : "Var1",
            "var2" : ["Var2a", "Var2b"]
        };

        $log.debug('A debug message (1)', obj1);
        $log.info('An info message (1)', obj1);
        $log.log('An info message synonym (1)', obj1);
        $log.warn('A warning message (1)', obj1);
        $log.error('An error message (1)', obj1);

        $log.debug('A debug message (2)', obj2);
        $log.info('An info message (2)', obj2);
        $log.log('An info message synonym (2)', obj2);
        $log.warn('A warning message (2)', obj2);
        $log.error('An error message (2)', obj2);
    })
});