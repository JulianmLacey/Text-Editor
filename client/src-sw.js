const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
const { StaleWhileRevalidate } = require("workbox-strategies");
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
	cacheName: "page-cache",
	plugins: [
		new CacheableResponsePlugin({
			statuses: [0, 200],
		}),
		new ExpirationPlugin({
			maxAgeSeconds: 30 * 24 * 60 * 60,
		}),
	],
});

warmStrategyCache({
	urls: ["/index.html", "/"],
	strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
registerRoute(
	// Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
	({ request }) => {
		["style", "script", "worker"].includes(request.destination),
			new StaleWhileRevalidate({
				// Name of the cache storage.
				cacheName: "asset-cache",
				plugins: [
					// https://developer.chrome.com/docs/workbox/reference/workbox-cacheable-response/#type-CacheableResponse
					// https://developer.chrome.com/docs/workbox/modules/workbox-cacheable-response/
					// If both statuses and headers are specified, then both conditions must be met for the Response to be considered cacheable.
					// HTTP StatusCode=0 is associated with incomplete capture of a hit or page and often with a labeling of the hit as: request canceled ("ReqCancelled=Client" "ReqCancelled=Server" or "ReqCancelled=True").
					new CacheableResponsePlugin({
						statuses: [0, 200],
					}),
				],
			});
	}
);
