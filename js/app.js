(function () {
    'use strict';

    var todos = [
        {
            title: 'My first todo',
            completed: false
        },
        {
            title: 'My 2nd todo',
            completed: true
        }
    ];

    var domCache = {
        selectors: {},
        references: {},
        templates: {}
    };

    var create = function (item) {
        if (item && item.title !== '') {
            todos.push(item);
            render();
        }
    };

    window.create = create;

    var setupCache = function () {
        domCache.templates.item =
            Handlebars.compile(document.getElementById('todo-template').innerHTML);
        domCache.templates.footer =
            Handlebars.compile(document.getElementById('footer-template').innerHTML);

        domCache.references.input = document.querySelector('#input input');
        domCache.references.inputSubmit = document.querySelector('#input button');

        domCache.selectors.items = '#todo-list li';
    }

    var render = function () {
        console.log('rendering...');
        var todoHtml = domCache.templates.item({todos: todos});
        var footerHtml = domCache.templates.footer({todos: todos});

        console.log('todoHtml = ' + todoHtml);
        document.getElementById('todo-list').innerHTML = todoHtml;
        console.log('todo html rendered');
        document.getElementById('footer').innerHTML = footerHtml;
        console.log('footer html rendered');
        console.log('todoHtml = ' + footerHtml);
    };

    window.addEventListener('load', function () {
        setupCache();
        render();
        setupEvents();
    });

    var handleItemEvent = function (e) {
        debugger;
        e.preventDefault();
        var targetFunction = e.target.attributes.hasOwnProperty('data-function') ? e.target.attributes['data-function'].textContent : null;
        switch (targetFunction) {
            case 'delete':
                alert('test delete');
                break;
            case 'compete':
                alert('test compete');
                break;
        }
    }
    var handleDeleteButton = function (e) {

    };

    var setupEvents = function () {
        domCache.references.inputSubmit.addEventListener('click',
            function (e) {
                var input = domCache.references.input;
                var todo = {
                    title: input.value,
                    completed: false
                };
                create(todo);
            });
        var items = document.querySelectorAll(domCache.selectors.items);
        for (var i = 0; i < items.length; i++) {
            var currentItem = document.querySelectorAll(domCache.selectors.items)[i];
            currentItem.addEventListener('click', handleItemEvent);
        }
        domCache.references.inputSubmit.addEventListener('click', handleDeleteButton);
    }
})();