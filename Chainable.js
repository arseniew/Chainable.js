(function() {
    'use strict';
    var root = this;
    var previous = root.Chainable;

    root.Chainable = (function () {

        function Chainable(initialStorage) {
            var storage = initialStorage;
            if (!(this instanceof Chainable)) {
                return new Chainable(initialStorage);
            }

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