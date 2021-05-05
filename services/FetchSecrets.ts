// import DefaultAzureCredential from "@azure/identity";
// import SecretClient from "@azure/keyvault-secrets";
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

export const useGetSecret = async (secretName: string): string => {
  const credential = new DefaultAzureCredential();
  const vaultName = "CI601-Atlas";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new SecretClient(url, credential);

  const secret = await client.getSecret("MongoDBName");
  return secret.Result;
};
