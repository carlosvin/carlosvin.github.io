import pkg from '@asciidoctor/core';
const Processor = pkg;
import path from 'path';
import hlExt from 'asciidoctor-highlight.js';

export class Adoc {
	private readonly _processor;

	constructor() {
		this._processor = Processor();
		hlExt.register(this._processor.Extensions);
	}

	load(filePath: string, content: string) {
		return this._processor.load(content, {
			mkdirs: true,
			base_dir: path.dirname(filePath),
			safe: 'unsafe',
			catalog_assets: true,
			attributes: {
				'source-highlighter': 'highlightjs-ext',
				//'source-highlighter': 'highlightjs'
			}
		});
	}
}
