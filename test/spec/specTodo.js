describe("Viewmodel kan todos beheren", function() {
    var viewmodel;

    beforeEach(function () {
        viewmodel = TD.viewmodel();
        this.addMatchers({
            toHaveAsText: function (text) {
                return this.actual.text() === text;
            },
            isNotYetDone: function () {
                return !this.actual.isDone();
            }
        });
    });

    it("viewmodel heeft standaard 1 lege todo", function () {
        var todos = viewmodel.todos();

        expect(todos.length).toEqual(1);
        expect(todos[0]).toHaveAsText('');
        expect(todos[0]).isNotYetDone();
    });

    it("kan een todo toevoegen", function () {
        viewmodel.addNieuweTodo();
        expect(viewmodel.todos().length).toEqual(2);
        expect(viewmodel.todos()[1]).toHaveAsText('');
        expect(viewmodel.todos()[1]).isNotYetDone();
    });

    it("als een todo af is, dan zit het niet meer bij de todos", function () {
        expect(viewmodel.todos().length).toEqual(1);
        viewmodel.todos()[0].isDone(true);
        expect(viewmodel.todos().length).toEqual(0);
    });

    it("houdt afgewerkte todos bij", function () {
        expect(viewmodel.afgewerkteTodos().length).toEqual(0);
        viewmodel.todos()[0].isDone(true);
        expect(viewmodel.afgewerkteTodos().length).toEqual(1);
    });

    it("als gebruiker enter duwt dan wordt todo toegevoegd", function () {
        viewmodel.keyPressAddTodo({keyCode:13});
        expect(viewmodel.todos().length).toEqual(2);
        expect(viewmodel.todos()[1]).toHaveAsText('');
        expect(viewmodel.todos()[1]).isNotYetDone();
    });

    it("als gebruiker iets anders typt dan wordt geen todo toegevoegd", function () {
        viewmodel.keyPressAddTodo({keyCode:54});
        expect(viewmodel.todos().length).toEqual(1);
    });

    it("als gebruiker enter duwt dan mag event niet gepropageerd worden", function () {
        expect(viewmodel.keyPressAddTodo({keyCode:13})).toBeFalsy();
    });

    it("als gebruiker iets anders typt dan mag event wel gepropageerd worden", function () {
        expect(viewmodel.keyPressAddTodo({keyCode:54})).toBeTruthy();
    });

    it("todo kan verwijderd worden", function () {
        expect(viewmodel.todos().length).toEqual(1);
        viewmodel.verwijder(viewmodel.todos()[0]);
        expect(viewmodel.todos().length).toEqual(0);
    });

});