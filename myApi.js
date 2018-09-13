module.exports = {
	note: "This is a very simple example NodeJS app that uses TransomJS and the Scaffold module.",
	name: "My Static content Example App",
	transom: {},
	definition: {
        scaffold: {
			staticRoutes: [{
				/* Serve images files from a '/public-assets/images' folder in the project root. */
				path:  /images\/?.*/,
				folder: '/public-assets'
			},
			{
				/* Serve CSS files from a '/css' folder in the project root. */
				path: /css\/.*/
			}],
			redirectRoutes: [{
				/* Send a temporary redirect to users who (GET) request /go-away */
				path:  '/go-away',
				target: '/images/theme/transomlogo.png'
            }, {
				/* Send a permanent redirect to users who (GET) request /go-away-forever */
				path:  '/go-away-forever',
				target: {
					pathname: '/images/theme/transomlogo.png',
					permanent: true
				}
			}]
        }
    }
};