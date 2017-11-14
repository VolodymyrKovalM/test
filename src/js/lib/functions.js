export const lib = {
	/**
		* Adds class to element
	*/
	addClass(el, className) {
		if(el.classList) {
			el.classList.add(className);			
		} else {
			el.className += (el.className ? ' ' : '') + className;
		}
	},

	/**
		* Removes class to element
	*/
	removeClass(el, className) {
		if(el.classList) {
			el.classList.remove(className);			
		} else {
			let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');	
		}
	},

	/**
    	* Adds event listeners on multile or single DOM elements
    	* @param {DOM nodes}    elements    Any DOM Node or collection of DOM Nodes
    	* @param {String}       event       Event type that needs to be added
    	* @param {Function}     callback    callback function
	*/
	addEvents(elements, event, callback) {
    	if(elements.length) {
        	for(let i = 0, n = elements.length; i < n; i++) {
            	elements[i].addEventListener(event, callback);
        	}
    	} else {
        	elements.addEventListener(event, callback);
    	}
	}
}