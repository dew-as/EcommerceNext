// Function for registering a new user via API
export const login = async (formData) => {
  try {
    // Making a POST request to the "/api/login" endpoint
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Parsing and returning the response data
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("error", e);
  }
};

//   Use
//   The login function is intended for use on the client side to make a POST request to the user login API endpoint.
