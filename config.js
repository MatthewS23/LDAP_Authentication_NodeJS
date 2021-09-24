const config = {
	server: {
		url: "ldapServerURL",
		bindDN: "CN=Admin Read Only,OU=Generic Accounts,DC=essextest,DC=loc",
		bindCredentials: "p@ssw0rd",
		searchBase: "DC=essextest,DC=loc",
		searchFilter: '(sAMAccountName={{username}})'
	}
};

module.exports = config;