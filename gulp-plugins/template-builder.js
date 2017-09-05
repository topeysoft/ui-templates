const path = require('path');
const fs = require('fs');
const Stream = require('stream');

// Get file content
// Set content as property to templates object
function TscTemplateBuilder() {
    _this = this;
    _this.templates = {};
    _this.readFiles = (opt, done=()=>{}) => {
        var stream = new Stream.Transform({ objectMode: true });
        // const files = fs.readdirSync(filePattern);
        // console.log('FILES', files);
        stream._transform = function (file, unused, callback) {
            const propertyName = path.basename(file.relative);
            _this.templates[file.relative] = file._contents.toString();
            callback(null, file)
           // console.log(_this.templates);
            // console.log(Object.keys(file), file._contents.toString());

        }
        stream.on('finish', (event) => {
            var templates = `window.tscLib = window.tscLib || {}; window.tscLib['${opt.namespace}']=window.tscLib['${opt.namespace}'] || {}; window.tscLib['${opt.namespace}'].templates = ${JSON.stringify(_this.templates)};`;
            fs.writeFileSync(opt.dest, templates);
            done();
        });
        return stream;
    }

}

exports.TemplateBuilder = TscTemplateBuilder;