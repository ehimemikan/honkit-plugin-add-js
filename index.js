const path = require('path');
const fs = require('fs');
const tmp = require('tmp');
const crypto = require('crypto');
let jsFiles = [];

module.exports = {
    hooks: {
        "init": () => {
            const book = this;
            const tmpobj = tmp.dirSync({ mode: 0755 });
            const customJs = this.config.get('pluginsConfig.add-js.js', []);
            if (!book.isLanguageBook()) {
                customJs.forEach((file) => {
                    const origin = book.resolve(file);
                    const filename = `${crypto.randomBytes(N).toString('base64').substring(0, N)}-${path.basename(origin)}`;
                    const output = path.resolve(tmpobj.name, filename);
                    const content = fs.readFileSync(origin);
                    fs.writeFileSync(output, content);

                    jsFiles.push(filename);
                });
            }
            return {
                assets: tmpobj.name,
                js: jsfiles
            };
        }
    }
}
