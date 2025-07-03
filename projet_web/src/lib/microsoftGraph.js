import * as msal from '@azure/msal-browser';

const requestedScopes = {
    scopes: ["User.Read"]
};

const msalInstance = new msal.PublicClientApplication({
    auth: {
        clientId: import.meta.env.VITE_APP_OAUTH_CLIENT_ID
    },
    cache: {
        cacheLocation: "sessionStorage"
    }
});

await msalInstance.initialize();

export async function signInAndGetUser() {
    const authResult = await msalInstance.loginPopup(requestedScopes);
    msalInstance.setActiveAccount(authResult.account);
    return authResult.account;
}
