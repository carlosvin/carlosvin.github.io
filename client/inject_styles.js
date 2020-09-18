export default files => {
	return Promise.all(files.map(file => new Promise((fulfil, reject) => {
		const href = new URL(file, import.meta.url);
		let link = document.querySelector('link[rel=stylesheet][href="' + href + '"]');
		if (!link) {
			link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = href;
			document.head.appendChild(link);
		}
		if (link.sheet) {
			fulfil();
		} else {
			link.onload = () => fulfil();
			link.onerror = reject;
		}
	})));
};