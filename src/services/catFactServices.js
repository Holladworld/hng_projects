const axios = require('axios');
const constants = require('../config/constants');

class CatFactService {
  constructor() {
    this.apiUrl = constants.CAT_FACT_API.URL;
    this.timeout = constants.CAT_FACT_API.TIMEOUT;
    this.axiosInstance = axios.create({
      timeout: this.timeout,
      headers: {
        'User-Agent': 'DynamicProfileAPI/1.0'
      }
    });
  }

  async getRandomFact() {
    try {
      const response = await this.axiosInstance.get(this.apiUrl);

      if (response.data && response.data.fact) {
        return {
          success: true,
          fact: response.data.fact.trim(),
          length: response.data.length
        };
      } else {
        return {
          success: false,
          error: 'Invalid response format from Cat Facts API'
        };
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    let errorMessage = 'Failed to fetch cat fact';

    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Cat Facts API request timeout';
    } else if (error.response) {
      // Server responded with error status
      errorMessage = `Cat Facts API error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // Request made but no response received
      errorMessage = 'No response from Cat Facts API';
    } else {
      // Something else happened
      errorMessage = error.message;
    }

    console.error('Cat Facts Service Error:', errorMessage);
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

module.exports = new CatFactService();