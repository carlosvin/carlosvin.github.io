import Processor, { Asciidoctor } from 'asciidoctor';
import path from "path";
import hlExt from 'asciidoctor-highlight.js';

export class Adoc {

    private readonly _processor: Asciidoctor;

    constructor() {
        this._processor = Processor();
        hlExt.register(this._processor.Extensions);
    }

    load(filePath: string): Asciidoctor.Document {
        return this._processor.loadFile(filePath,
            {
                mkdirs: true,
                base_dir: path.dirname(filePath),
                safe: 'unsafe',
                catalog_assets: true,
                'attributes': {
                    'source-highlighter': 'highlightjs-ext',
                }
            });
    }
}
