const catFactService = require('../services/catFactServices');
const constants = require('../config/constants');
const { getCurrentTimestamp } = require('../utils/helpers');

class ProfileController {
  constructor() {
    this.userProfile = {
      email: process.env.USER_EMAIL,
      name: process.env.USER_NAME,
      stack: process.env.USER_STACK
    };
  }

  async getProfile(req, res, next) {
    try {
      // Validate that user profile is configured
      if (!this.isProfileConfigured()) {
        return res.status(500).json({
          status: constants.RESPONSE_MESSAGES.ERROR,
          message: 'Server configuration incomplete'
        });
      }

      const timestamp = getCurrentTimestamp();
      const catFactResult = await catFactService.getRandomFact();

      const response = {
        status: constants.RESPONSE_MESSAGES.SUCCESS,
        user: { ...this.userProfile },
        timestamp: timestamp,
        fact: catFactResult.success 
          ? catFactResult.fact 
          : constants.RESPONSE_MESSAGES.CAT_FACT_UNAVAILABLE
      };

      // Log successful request
      req.log.info('Profile data fetched successfully', {
        timestamp,
        catFactSuccess: catFactResult.success
      });

      res.status(constants.HTTP_STATUS.OK).json(response);

    } catch (error) {
      // Log the error
      req.log.error('Error in getProfile controller', { error: error.message });
      
      // Fallback response to ensure endpoint always returns data
      const fallbackResponse = {
        status: constants.RESPONSE_MESSAGES.SUCCESS,
        user: { ...this.userProfile },
        timestamp: getCurrentTimestamp(),
        fact: constants.RESPONSE_MESSAGES.SERVICE_UNAVAILABLE
      };

      res.status(constants.HTTP_STATUS.OK).json(fallbackResponse);
    }
  }

  isProfileConfigured() {
    return this.userProfile.email && 
           this.userProfile.name && 
           this.userProfile.stack;
  }

  // Method to update profile (useful for testing)
  updateProfile(newProfile) {
    this.userProfile = { ...this.userProfile, ...newProfile };
  }
}

module.exports = new ProfileController();