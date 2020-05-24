import { path } from '../../src/services/url'

describe('Metadata', () => {

	it('has alternate url, description, date', () => {
		cy.visit('/posts/gradle-cpp')
		cy.get('head meta[name="description"]')
			.should('have.attr', 'content', 'How to build a C++ project using Gradle')
		cy.get('head meta[name="date"]')
			.should('have.attr', 'content', '2014-09-27')
			.should('have.attr', 'scheme', 'YYYY-MM-DD')
	});
});

describe('Post View', () => {

	it('Header', () => {
		cy.visit('/posts/this-is-sapper/en')
		cy.get('.subtitle .date').contains('19/04/2020')
	});

	function assertPost(path, title, date) {
		cy.visit(path)
		cy.get('.subtitle .date').contains(date)
		cy.get('main header h1').contains(title)
	}

	it('Post renders', () => {
		const inputs = {
			'this-is-sapper': { 
				titles: { en: 'This is Sapper!' }, 
				date: '19/04/2020' 
			},
			'debug-libtool-lib': { 
				titles: { 
					es: 'Depurar librería generada con libtool' 
				}, 
				date: '01/02/2013' 
			},
			'react-typescript-parcel': { 
				titles: {
					en: 'Create SPA: React + Typescript + Parcel',
					es: 'SPA: React + Typescript + Parcel',
				},
				date: '01/01/2019'
			},
		}
		for (const [slug, d] of Object.entries(inputs)) {
			for (const [lang, title] of Object.entries(d.titles)) {
				console.warn(lang, slug, title)
				assertPost(path(slug, lang), title, d.date)
				assertPost(`/${lang}/posts/${slug}`, title, d.date)
			}
			assertPost(path(slug), Object.values(d.titles)[0], d.date)
		}
	});

});
