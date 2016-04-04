(function () {
	'use strict';

	var todos= [
		{
			title: 'My first todo',
			completed: false
		}	,
		{
			title: 'My second todo',
			completed: true
		}
	];

	var domCache = {
		selectors: {},
		references: {},
		templates:{}
	};

	var create = function(item)
	{
		if (todos.filter(function(i){return i.title == item.title}).length == 0 &&  item.title && item.title !== '')
		{
		todos.push(item);
		render();
	}}

	window.create = create;

	var setupCache = function()
	{
		domCache.templates.item = Handlebars.compile(document.getElementById('todo-template').innerHTML);
		domCache.templates.footer = Handlebars.compile(document.getElementById('footer-template').innerHTML);
		domCache.references.footer = document.getElementById('footer');
		domCache.references.itemList = document.getElementById('todo-list');
		domCache.references.btnAdd = document.getElementById('btnAdd');
		domCache.references.inputText = document.getElementById('inputText');

		domCache.selectors.items = "#todo-list li";
	}

	var handleAddBtn = function(e)
	{
		var input = domCache.references.inputText,
			todo = {title: input.value,
				completed: false};
		create(todo);
		input.value = '';
	};

	var handleDeleteBtn = function(e)
	{

	};

var handleItemEvent = function(currentItem)
{
	currentItem.addEventListener('click', function(e)
	{
		e.preventDefault();
		var targetFunction = e.target.attributes.hasOwnProperty('data-function') ? e.target.attributes['data-function'].textContent : null;
		switch(targetFunction)
		{
			case  'delete':
				alert('delete');
				break;
			case 'complete':
				alert('complete');
				break;
		}
	});
}


	var setupEvents = function()
  {
	  domCache.references.btnAdd.addEventListener('click', handleAddBtn);
	  var items = document.querySelectorAll(domCache.selectors.items);
	  for(var i =0; i < items.length; i++) {
		  var currentItem = items[i];
		  handleItemEvent(currentItem);
	  }
  }


	var render = function()
	{
		var todoHTML = domCache.templates.item({todos: todos});
		var footerHTML = domCache.templates.footer({todos: todos});

		domCache.references.footer.innerHTML = footerHTML;
		domCache.references.itemList.innerHTML = todoHTML;
	}

	window.addEventListener('load', function(){
		setupCache();
		render();
		setupEvents();
	});



})();