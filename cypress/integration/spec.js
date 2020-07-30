describe('Index page', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Recent posts')
	})

})

describe('Navigation bar', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	function assertNav(name, path) {
		cy.get('nav a').contains(name).click()
		cy.url().should('include', path)
	}

	function getSiteName () {
		if (navigator.language.startsWith('es')) {
			return 'Carlos dice bla bla'
		} else {
			return 'Carlos says bla bla'
		}
	}

	it('navigates to about > home > categories', () => {
		assertNav('About', '/about')
		assertNav(getSiteName(), '/')
		assertNav('Categories', '/categories')
	});

	it('navigates to categories > home > about', () => {
		assertNav('Categories', '/categories')
		assertNav(getSiteName(), '/')
		assertNav('About', '/about')
	});
});