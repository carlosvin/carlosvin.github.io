import { jsonLdPost } from '$lib/services/jsonld';
import { blogStore } from '$lib/stores/blog';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function get({ params }: ServerRequest): Promise<EndpointOutput> {
	const { lang, slug } = params;
	const post = blogStore.get(slug, lang);
	if (post) {
		return { body: jsonLdPost(post.props) };
	}
}
