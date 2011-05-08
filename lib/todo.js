TD = (function () {
    var pub = {};

    function nieuweTodo() {
        return {
            text: ko.observable(''),
            isDone:ko.observable(false)
        };
    }

    pub.viewmodel = function () {
        var alleTodos = ko.observableArray([nieuweTodo()]);

        var model = {
            todos : ko.dependentObservable(function () {
                return alleTodos().filter(function (aTodo) {return !aTodo.isDone()});
            }),
            afgewerkteTodos: ko.dependentObservable(function () {
                return alleTodos().filter(function (aTodo) {return aTodo.isDone()});
            }),
            addNieuweTodo: function () {
                alleTodos.push(nieuweTodo());
            },
            keyPressAddTodo: function (e) {
                if (e.keyCode === 13) {
                    this.addNieuweTodo();
                    return false;
                }
                return true;
            },
            verwijder: function (todo) {
                alleTodos.remove(todo);
            }
        };

        return model;
    };

    return pub;
}());

ANIM = (function () {

    return {
        toevoegen: function (elem) {
            $(elem).hide().slideDown(150).find('input[type*="text"]').focus();
        },
        verwijderen: function (elem) {
            $('input[type*="text"]:first').focus();
            $(elem).slideUp(150);
        }
    }
}());