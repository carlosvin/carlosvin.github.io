import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});
sapper.prefetchRoutes(['/sitemap.xml', '/old']);
