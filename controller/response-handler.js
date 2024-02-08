export const setResponse = (successCode, response, successMessage, userDetails = null) => {
  switch (successCode) {
    case '200': {
      response.status(200).json({
        message: successMessage ? successMessage : "Request Successful"
    });
      break;
    }
    case '201': {
      response.status(201).json({
        message: successMessage ? successMessage : "Created Successful"
    });
      break;
    }
    case '204': {
      response.status(204);
      response.send();
      break;
    }
    default:{
      response.status(500).json({
        message:  errorMessage ? errorMessage : "Internal Server Error."
    });
    }
  }
  };

export const setErrorResponse = (errorCode, response, errorMessage) => {
    switch (errorCode) {
      case '400': {
        response.status(400).json({
          message: errorMessage ? errorMessage : "Invalid request, check the payload."
        });
        break;
      }
      case '401': {
        response.status(401).json({
          message: errorMessage ? errorMessage : "Authorization failed, check credentials"
        });
        break;
      }
      case '405': {
        response.status(405).json({
          message: errorMessage ? errorMessage : "Invalid request, only GET method is allowed."
        });
        break;
      }
      case '503': {
        response.status(503).json({
          message: errorMessage ? errorMessage : "Service Unavailable. Connection to database is unsuccessful."
        });
        break;
      }
      default:{
        response.status(500).json({
          message:  errorMessage ? errorMessage : "Internal Server Error."
      });
      }
    }
  };
