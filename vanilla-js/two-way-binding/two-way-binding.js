(function() {
    'use strict'

    var updateView = function() {
        var viewElements = document.querySelectorAll('span[data-bind]'),
            inputValue = this.value;

        viewElements.forEach(function(view) {
            view.innerHTML = inputValue;
        })
    };

    var bindEvents = function() {
        var inputElement = document.querySelectorAll('input');

        inputElement.forEach(function(el) {
            el.addEventListener('keyup', updateView);
        })
    };

    var init = function() {
        bindEvents();
    };

    init();
})()