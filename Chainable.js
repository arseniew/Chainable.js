(function () {
    'use strict';
    var root = this;
    var previous = root.Chainable;

    function copyShallow(source) {
        var
            objCopy = {},
            prop;
        if (typeof source !== 'object') {
            return source;
        }
        else if (Object.prototype.toString.call(source) === '[object Array]') {
            return source.slice();
        }
        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                objCopy[prop] = source[prop];
            }
        }
        return objCopy;
    }

    root.Chainable = (function () {

        function Chainable(initialStorage) {
            var storage;
            if (!(this instanceof Chainable)) {
                return new Chainable(initialStorage);
            }
            storage = copyShallow(initialStorage);

            this.chain = function (cb, extraArguments, context) {
                storage = cb.apply(context || this, [storage].concat(extraArguments));
                return this;
            };
            this.value = function () {
                return storage;
            };
        }

        Chainable.prototype.noConflict = function () {
            root.Chainable = previous;
        };

        return Chainable;

    })();
}).call(this);
