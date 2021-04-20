import Processor, { Asciidoctor } from 'asciidoctor';
import path from "path";

export class Adoc {

    private readonly _processor = Processor();

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
