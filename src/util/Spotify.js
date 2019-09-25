let accessToken;
const redirectUri = 'http://localhost:3000/';
const clientId = 'b14de9fe7da744dba3bd803d7e62881f';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        // Check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); // The page URL (window.location.href)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // Clears the parameters from the URL to grab a new access token
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    }
};

export default Spotify;