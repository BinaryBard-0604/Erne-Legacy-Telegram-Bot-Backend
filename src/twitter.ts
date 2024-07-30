const axios = require('axios')
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const getAccessToken = async () => {
    try {
        const resp = await axios.post(
            'https://api.twitter.com/oauth2/token',
            '',
            {
                params: {
                    'grant_type': 'client_credentials'
                },
                auth: {
                    username: process.env.TWITTER_API_KEY,
                    password: process.env.TWITTER_API_SECRET
                }
            }
        );
        return Promise.resolve(resp.data.access_token);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};
const getFollowers = async (token:any, user_id:any, max_number:any) => {
    try {
        const resp = await axios.get(
            `https://api.twitter.com/2/users/${user_id}/followers`,
            {
                headers: {
                    'Authorization': 'Bearer '+ token,
                },
                params: {
                    'user.fields': 'name,username',
                    'max_results': max_number
                }
            }
        );
        return Promise.resolve(resp.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

getAccessToken()
    .then((token) => {
        getFollowers(token, '415859364', 1000)
            .then((result) => {
                console.log(JSON.stringify(result, null, 4));
            })
            .catch(error => console.log(JSON.stringify(error)));
    })
    .catch(error => console.log(JSON.stringify(error)));