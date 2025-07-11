import * as msal from '@azure/msal-browser'
import store from '../store'  // <-- importe ton store Vuex

const msalInstance = new msal.PublicClientApplication({
    auth: {
        clientId: import.meta.env.VITE_APP_OAUTH_CLIENT_ID,
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "sessionStorage"
    }
});

let msalInitialized = false;

export async function initializeMsal() {
    if (!msalInitialized) {
        if (msalInstance.initialize) {
            await msalInstance.initialize();
        }
        msalInitialized = true;
    }
}

const loginRequest = {
    scopes: ["User.Read", "Mail.ReadWrite"]
};

export async function signIn() {
    await initializeMsal()
    try {
        // Popup login MSAL
        const authResult = await msalInstance.loginPopup(loginRequest)

        // Définit le compte actif
        msalInstance.setActiveAccount(authResult.account)

        // Acquérir token silencieusement
        const tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: loginRequest.scopes,
            account: authResult.account
        })

        // Commit user + accessToken dans le store
        const user = {
            ...authResult.account,
            accessToken: tokenResponse.accessToken
        }

        store.commit('setUser', user)

        return user
    } catch (error) {
        console.error("Erreur lors de la connexion MSAL:", error)
        throw error
    }
}
export async function signOut() {
    try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            await msalInstance.logoutPopup({ account: accounts[0] });
        }
        store.commit('clearUser');  // Vide l’état utilisateur après déconnexion
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }
}

// IMPORTANT : Modification ici pour gérer le compte actif
export async function acquireToken() {
    await initializeMsal();

    let account = msalInstance.getActiveAccount();

    // Si pas de compte actif, on lance le login popup pour connecter l'utilisateur
    if (!account) {
        try {
            const authResult = await msalInstance.loginPopup(loginRequest);
            msalInstance.setActiveAccount(authResult.account);
            account = authResult.account;

            store.commit('setUser', {
                ...authResult.account,
                accessToken: authResult.accessToken
            });
        } catch (loginError) {
            console.error("Erreur login dans acquireToken:", loginError);
            throw loginError;
        }
    }

    try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: loginRequest.scopes,
            account: account
        });

        return tokenResponse.accessToken;
    } catch (error) {
        console.warn("acquireTokenSilent a échoué, essai loginPopup", error);

        const tokenResponse = await msalInstance.acquireTokenPopup({
            scopes: loginRequest.scopes
        });

        return tokenResponse.accessToken;
    }
}

// Ajout d'une vérification avant fetch des mails
export async function fetchEmails() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw new Error("Utilisateur non connecté. Veuillez vous connecter avant de récupérer les mails.");
    }

    const accessToken = await acquireToken();

    const response = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error("Erreur récupération mails : " + response.statusText);
    }

    const data = await response.json();
    return data.value;
}

export async function fetchUserProfile() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw new Error("Utilisateur non connecté. Veuillez vous connecter avant de récupérer le profil.");
    }

    const accessToken = await acquireToken();

    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error("Erreur récupération profil utilisateur : " + response.statusText);
    }

    return await response.json();
}
