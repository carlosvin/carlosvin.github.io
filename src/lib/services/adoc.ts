import Processor, { Asciidoctor } from 'asciidoctor';
import path from "path";

export class Adoc {

    private readonly _processor: Asciidoctor;

    constructor() {
        this._processor = Processor();
        this.reg();
    }

    // TODO we should wait for this to be registered
    private async reg() {
        const hlExt = await import('asciidoctor-highlight.js');
        hlExt.default.register(this._processor.Extensions);
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
                    //'highlightjsdir': '/node_modules/highlight.js'
                }
            });
    }
}
