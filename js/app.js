(function () {
	'use strict';

	var todos = [
		{
			title: 'my first todo',
			completed: false
		},
		{
			title: 'my second todo',
			completed: true
		}
	];

	var domCache = {
		selectors: {},
		references: {},
		templates: {}
	};

	var setupCache = function()
	{
		domCache.templates.item = Handlebars.compile(document.getElementById('todo-template').innerHTML);
		domCache.templates.footer = Handlebars.compile(document.getElementById('footer-template').innerHTML);

		domCache.references.footer = document.getElementById('footer');
		domCache.references.itemList = document.getElementById('todo-list');

		domCache.references.input = document.querySelector('#input input');
		domCache.references.inputSubmit = document.querySelector('#input button');

		domCache.selectors.items = '#todo-list li';
	};

	var create = function (item){
		if(todos.filter(
				function(i){
					return i.title == item.title
				}).length === 0 && item.title && item.title != ''
			)
		todos.push(item);
		render();
	};

	var handleDeleteButton = function(e){

	};

	var handleAddButton = function(e)
	{
		var input = domCache.references.input,
			todo = {
				title: input.value,
				completed: false
			};
		create(todo);
		input.value = '';
	};


	var setupEvents = function(){
		domCache.references.inputSubmit.addEventListener('click', handleAddButton);
		var items = document.querySelectorAll(domCache.selectors.items);
		for(var i = 0; i < items.length; i++)
		{
			var currentItem = items[i];
			currentItem.addEventListener('click', function(e){
				e.preventDefault();
				//e.stopPropagation();
				var targetFunction = e.target.attributes.hasOwnProperty('data-function') ? e.target.attributes['data-function'].textContent :  null;
				switch(targetFunction)
				{
					case 'delete' :
						alert ('delete');
						break;
					case 'complete' :
						alert ('complete');
						break;
				}
			});
		}
		domCache.references.inputSubmit.addEventListener('click', handleDeleteButton);
	};

	window.create = create;

	var render = function()
	{
		var todoHtml = domCache.templates.item({todos: todos});
		var footerHtml = domCache.templates.footer({todos: todos});

		domCache.references.footer.innerHTML = footerHtml;
		domCache.references.itemList.innerHTML = todoHtml;

		//debugger;
	}

	window.addEventListener('load', function(){
		setupCache();
		render();
		setupEvents();
	});


})();