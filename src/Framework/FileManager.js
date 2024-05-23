const fs = require('fs');
const path = require('path');
const RESOURCES = 'resources'
const UTF8  = 'utf8'

module.exports = class FileManager{
    loadResource(fileName){
        const filePath = path.join(__dirname, '..', RESOURCES, fileName);
        return fs.readFileSync(filePath, UTF8)
    }
}