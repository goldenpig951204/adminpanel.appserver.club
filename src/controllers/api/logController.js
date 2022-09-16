const fs = require('fs');
const path = require('path');

module.exports = {
    /**
     * Get all the logs of activties where occured on this nodeapp 
     * @param { * } req 
     * @param { logs } res 
     */
    getLogs: async (req, res) => {
        try {
            let logs = [];
            fs.readdirSync(path.join(__dirname, '../../public/logs/')).forEach(file => {
                if (path.extname(file) == '.log') logs.push({name: path.basename(file)});
            });
            res.json(logs);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
}