import { path } from '../../src/services/url'

describe('Metadata', () => {

	it('has alternate url, description, date', () => {
		cy.visit('/posts/gradle-cpp')
		cy.get('head meta[name="description"]')
			.should('have.attr', 'content', 'How to build a C++ project using Gradle')
		cy.get('head meta[name="date.updated"]')
			.should('have.attr', 'content', '2014-09-27')
		cy.get('head meta[name="date.created"]')
			.should('have.attr', 'content', '2014-09-27')
	});
});

describe('Post View', () => {

	it('Header', () => {
		cy.visit('/posts/this-is-sapper/en')
		let expectedDate = new Date('2020-04-19').toLocaleDateString()
		cy.get('.subtitle .date').contains(expectedDate)
	});

	function assertPost(path, title, date, otherLangs = undefined) {
		cy.visit(path)
		let expectedDate = new Date(date).toLocaleDateString()
		cy.get('.subtitle .date').contains(expectedDate)
		cy.get('main header h1').contains(title)
		if (otherLangs) {
			cy.log(otherLangs)
			cy.get('.langs.summary').contains('Available in ' + otherLangs)
		}
	}

	it('Post renders', () => {
		const inputs = {
			'this-is-sapper': { 
				titles: { en: 'This is Sapper!' }, 
				date: '2020-04-19',
				otherLangs: {
					'en': undefined,
					'es': undefined
				}
			},
			'debug-libtool-lib': { 
				titles: { 
					es: 'Depurar librería generada con libtool' 
				}, 
				date: '2013-02-01',
				otherLangs: {
					'es': undefined,
					'en': undefined
				}
			},
			'react-typescript-parcel': { 
				titles: {
					en: 'Create SPA: React + Typescript + Parcel',
					es: 'SPA: React + Typescript + Parcel',
				},
				date: '2019-07-10',
				otherLangs: {
					'en': 'es',
					'es': 'en' 
				}
			},
		}
		for (const [slug, d] of Object.entries(inputs)) {
			for (const [lang, title] of Object.entries(d.titles)) {
				assertPost(path(slug, lang), title, d.date, d.otherLangs[lang])
				assertPost(`/${lang}/posts/${slug}`, title, d.date, d.otherLangs[lang])
			}
			assertPost(path(slug), Object.values(d.titles)[0], d.date, d.otherLangs['en'])
		}
	});

});
