const express = require('express');
const {
    getSites,
    getSite,
    createSite,
    updateSite,
    deleteSite
} = require('../../controllers/api/siteController');
const apiSitesRouter = express.Router();
/**
 * Set wordpress sites-related routes.
 */
apiSitesRouter.get('/', getSites);
apiSitesRouter.get('/:id', getSite);
apiSitesRouter.post('/', createSite);
apiSitesRouter.put('/:id', updateSite);
apiSitesRouter.delete('/:id', deleteSite);

module.exports = apiSitesRouter;