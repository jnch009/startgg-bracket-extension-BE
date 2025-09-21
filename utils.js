const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Authenticate with managed identity
const credential = new DefaultAzureCredential();
const client = new SecretClient(process.env["KEY_VAULT_URL"], credential);

const retrieveAccessToken = async () => {
    try {
        // Retrieve a secret
        const secret = await client.getSecret("startgg-access-token");
        return secret;
    } catch (err) {
        context.log.error("Error accessing Key Vault:", err);
        context.res = {
            status: 500,
            body: "Failed to access Key Vault"
        };
    }
}

module.exports = {
    retrieveAccessToken
};