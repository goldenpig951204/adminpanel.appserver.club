const { updateOne } = require('../../models/setting');
const Site = require('../../models/sites');

module.exports = {
    /**
     * Get all the list of sites that use this nodeapp
     * @param {*} req 
     * @param { sites } res 
     */
    getSites: async (req, res) => {
        try {
            let sites = await Site.find();
            res.json(sites);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    /**
     * Get a site by id
     * @param { id } req 
     * @param { site } res 
     */
    getSite: async (req, res) => {
        try {
            let { id } = req.params;
            let site = await Site.findById(id);
            res.json(site);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    /**
     * Create a new site that use this nodeapp
     * @param { url, membershipApiKey } req 
     * @param { site } res 
     */
    createSite: async (req, res) => {
        try {
            let site = await Site.create(req.body);
            res.json(site);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    /**
     * Update an existing site by id
     * @param { id, url, membershipApiKey } req 
     * @param { site } res 
     */
    updateSite: async (req, res) => {
        try {
            let { id } = req.params;
            let result = await Site.findByIdAndUpdate(id, req.body);      
            res.json(result);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    /**
     * Delete an existing site that doesn't use anymore by id
     * @param { id } req 
     * @param { result } res 
     */
    deleteSite: async (req, res) => {
        try {
            let { id } = req.params;
            await Site.findByIdAndDelete(id);
            res.send(`delete ${id} successfully`);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
}