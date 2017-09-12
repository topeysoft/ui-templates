const path = require('path');
const fs = require('fs');
var through = require('through2');
var Stream = require('stream');

// Get file content
// Set content as property to templates object
function TemplateBuilder(namespace, destination, done = () => { }) {
    this.templates = [];
    // this.templates[namespace] ={};
       this.stream = new Stream.Transform({ objectMode: true });
        // this.stream = through.obj( (file, unused, callback) =>{
         this.stream._transform =  (file, unused, callback) =>{
            const propertyName = path.basename(file.relative);
            console.log(`Bundling template -- ${propertyName} --- for ${namespace}`);
                this.templates.push({
                    filename:(path.basename(file.relative)),
                    path:file.relative.replace(path.basename(file.relative), ''),
                    full_path:file.relative,
                    content:file._contents.toString()
                });
                this.templates[file.relative] = file._contents.toString();
            callback(null, file)
        // });
        }
        this.stream.on('finish', (event) => {
            var templates = `window.tscLib = window.tscLib || {}; window.tscLib['${namespace}']=window.tscLib['${namespace}'] || {}; window.tscLib['${namespace}'].templates = ${JSON.stringify(this.templates)};`;
            fs.writeFileSync(destination, templates);
            done();
        });
    return this.stream;
}
exports.TemplateBuilder = TemplateBuilder;