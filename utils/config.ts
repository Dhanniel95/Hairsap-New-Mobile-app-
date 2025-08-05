const config = {
	development: "https://hairsap-be-development.up.railway.app",
	production: "https://hairsap-be-production-6dd4.up.railway.app",
};

const baseUrl = __DEV__ ? config.production : config.production;

export default baseUrl;
