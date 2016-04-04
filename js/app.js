(function () {
	'use strict';
	var todos = [
		{
			title: 'My first todo',
			completed: false
		},
		{
			title: 'My second todo',
			completed: true
		}
	];

	var domCache ={
		selectors:{},
		references:{},
		templates:{}
	};

	var setupCache = function(){
		domCache.templates.item = Handlebars.compile(document.getElementById('todo-template').innerHTML);
		domCache.templates.footer = Handlebars.compile(document.getElementById('footer-template').innerHTML);

		domCache.references.itemList = document.getElementById('todo-list');
		domCache.references.footer = document.getElementById('footer');

		domCache.references.input = document.querySelector('#input input');
		domCache.references.inputSubmit = document.querySelector('#input button');

		domCache.selectors.items = '#todo-list li';
	};

	var render = function(){
		var todoHtml = domCache.templates.item({todos: todos});
		var footerHtml = domCache.templates.footer({todos: todos});

		//set footer inner html to my template...
		domCache.references.itemList.innerHTML = todoHtml;
		domCache.references.footer.innerHTML = footerHtml;
	};

	var setupEvents = function(){
		domCache.references.inputSubmit.addEventListener('click', handleAddButton); //attach add logic

		var items = document.querySelectorAll(domCache.selectors.items); //list of items

		for(var i = 0; i < items.length; i++){ //attach delete and completed event for each li item
			var currItem = items[i];
			currItem.addEventListener('click', function(e){
				e.preventDefault();
				var targetFunction = e.target.attributes.hasOwnProperty('data-function') ? e.target.attributes['data-function'].textContent : null;
				switch(targetFunction){
					case 'delete':
						alert("test delete");
						break;
					case 'complete':
						alert("test complete");
						break;
				}
			});
		}
	};

	var create = function(item){
		if(todos.filter(function(i){return i.title == item.title}).length == 0 && //check for duplicate items
			item.title && item.title !== "") { //check if item is not empty
			todos.push(item);
			render();
		}
	};

	var handleAddButton = function(e){  //handles the logic of the add button
		var input = domCache.references.input,
			todo = {
				title: input.value,
				completed: false
			}
		create(todo);
		input.value = '';
	};

	var handleDeleteButton = function(e){ //handles the logic of the delete
	};

	var handleCompleteButton = function(e){ //handles the logic of the delete
	};

	window.addEventListener('load', function(){
		setupCache();
		render();
		setupEvents();
	});
})();