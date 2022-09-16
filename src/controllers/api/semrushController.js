const crypto = require('node:crypto');
const { get } = require('lodash');
const { serverLog } = require('../../services/logger');
const DvAxios = require('devergroup-request').default;

const axios = new DvAxios({
    axiosOpt: {
        timeout: 30 * 1000
    }
});
const Setting = require('../../models/setting');
const Site = require('../../models/sites');
const config = require('../../services/config');

module.exports = {
    /**
     * Login to www.semrush.com using proxy and set cookie based on the cookie of the semrush.com
     * @param { email, password } req 
     * @param { result } res 
     */
    login: async (req, res) => { 
        let { email, password } = req.body;
        try {
            let body = {
                email,
                password,
                'locale': 'en',
                'source': 'semrush',
                'g-recaptcha-response': '',
                'user-agent-hash': crypto.createHash('sha1').update(email).digest('hex').substring(0, 32)
            }
            await axios.instance.post(
                'https://www.semrush.com/sso/authorize',
                JSON.stringify(body),
                {
                    headers: {
                        'user-agent': '',
                        'accept': 'application/json, text/plain, */*',
                        'content-type': 'application/json;charset=UTF-8',
                        'content-length': Buffer.from(JSON.stringify(body), 'utf-8')
                    }
                }
            );
            let cookie = axios.cookieJar.getCookieStringSync('https://www.semrush.com');
            await Setting.updateOne(null, { cookie });
            let conf = await Setting.findOne();
            config.setConfig(conf);
            serverLog.info(`start session with ${email} successfully`);
            res.send('Login successfully');
        } catch (err) {
            serverLog.error(`start session with ${email} failed: ${get(err, "response.data.message") || err.toString()}`);
            res.status(500).send(get(err, 'response.data.message') || err.toString());
        }
    },
    /**
     * Get all the settings to access to www.semrush.com
     * @param {*} req 
     * @param { setting } res 
     */
    getSetting: async (req, res) => {
        try {
            let setting = await Setting.findOne();
            res.json(setting);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    /**
     * Set all the settings to access to www.semrush.com
     * @param { keywordOverview, domainOverviewLimit, membershipLids, membershipApiKey, userAgent, cookie } req 
     * @param { setting } res 
     */
    setSetting: async (req, res) => {
        try {
            let {
                keywordOverviewLimit,
                domainOverviewLimit,
                membershipLids,
            } = req.body;

            let setting = await Setting.updateOne(null, {
                ...req.body,
                keywordOverviewLimit: Number(keywordOverviewLimit),
                domainOverviewLimit: Number(domainOverviewLimit),
                membershipLids: membershipLids.split(",").map((t) => Number(t))
            });
            let conf = await Setting.findOne();
            config.setConfig(conf);
            res.json(setting);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
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
    }
}