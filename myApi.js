module.exports = {
	note: "This is a very simple example NodeJS app that uses TransomJS and the SMTP module.",
	name: "My Static content Example App",
	transom: {},
	definition: {
        scaffold: {
			"public-assets": {
				static: true,
				//assetPath: 'public-assets',
				path:  /assets\/?.*/
            }
        }
    }
};