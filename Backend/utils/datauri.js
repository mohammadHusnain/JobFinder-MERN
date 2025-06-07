import DataUriParser from "datauri/parser.js"

import path from 'path'

const getDataUri = (file) => {
    const parser = new DataUriParser()
    const extName = path.extname(file.originaname).toString()

    return parser.format(extName , file.buffer)

}

export default getDataUri; 