

export let $ = (sel) => {
	switch (sel.charAt(0)) {
		case '#':
			return document.getElementById(sel.substring(1));
			break;
		case '.':
			return document.querySelector(sel);
			break;
		default: 
		return document.getElementById(sel)
	}
	
	/*
	if (type == 'id')
	return document.getElementById(sel);
	if (type == 'class')
	return document.getElementsByClassName(sel);
	*/
}