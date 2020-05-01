describe('Metadata', () => {

	it('has alternate url, description, date', () => {
		cy.visit('/posts/gradle-cpp')
		cy.get('head meta[name="description"]')
			.should('have.attr', 'content', 'How to build a C++ project using Gradle')
		cy.get('head link[href="/posts/gradle-cpp/es"]')
			.should('have.attr', 'rel', 'alternate')
			.should('have.attr', 'hreflang', 'es')
		cy.get('head meta[name="date"]')
			.should('have.attr', 'content', '2014-09-27')
			.should('have.attr', 'scheme', 'YYYY-MM-DD')
	});

});
