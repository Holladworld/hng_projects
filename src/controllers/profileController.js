const catFactService = require('../services/catFactServices');
const constants = require('../config/constants');
const { getCurrentTimestamp } = require('../utils/helpers');

class ProfileController {
  constructor() {
    this.userProfile = {
      email: process.env.USER_EMAIL || 'your-email@example.com',
      name: process.env.USER_NAME || 'Your Full Name',
      stack: process.env.USER_STACK || 'Node.js/Express'
    };
  }

  async getProfile(req, res, next) {
    try {
      // Safe constant access
      const RESPONSE_MESSAGES = constants?.RESPONSE_MESSAGES || {
        SUCCESS: 'success',
        ERROR: 'error', 
        CAT_FACT_UNAVAILABLE: 'Unable to fetch cat fact',
        SERVICE_UNAVAILABLE: 'Service unavailable'
      };

      const HTTP_STATUS = constants?.HTTP_STATUS || { OK: 200 };

      // Safe timestamp
      const timestamp = (typeof getCurrentTimestamp === 'function') 
        ? getCurrentTimestamp() 
        : new Date().toISOString();

      // Safe profile check
      if (!this.isProfileConfigured()) {
        return res.status(500).json({
          status: RESPONSE_MESSAGES.ERROR,
          message: 'Server configuration incomplete'
        });
      }

      const catFactResult = await catFactService.getRandomFact();

      const response = {
        status: RESPONSE_MESSAGES.SUCCESS,
        user: { ...this.userProfile },
        timestamp: timestamp,
        fact: catFactResult?.success 
          ? catFactResult.fact 
          : RESPONSE_MESSAGES.CAT_FACT_UNAVAILABLE
      };

      // Safe logging
      if (req.log && typeof req.log.info === 'function') {
        req.log.info('Profile data fetched successfully', {
          timestamp,
          catFactSuccess: catFactResult?.success
        });
      }

      res.status(HTTP_STATUS.OK || 200).json(response);

    } catch (error) {
      console.error('Error in getProfile:', error);
      
      // Safe fallback with defaults
      const fallbackResponse = {
        status: 'success',
        user: { 
          email: this.userProfile.email,
          name: this.userProfile.name,
          stack: this.userProfile.stack
        },
        timestamp: new Date().toISOString(),
        fact: 'Unable to fetch cat fact at this time'
      };

      res.status(200).json(fallbackResponse);
    }
  }

  isProfileConfigured() {
    return this.userProfile.email && 
           this.userProfile.name && 
           this.userProfile.stack;
  }
}

module.exports = new ProfileController();