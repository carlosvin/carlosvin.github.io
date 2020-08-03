describe('Accessibility checks', () => {

    // Basic usage
    it('Has no detectable a11y on Index', () => {
        check('/')
    })

    it('Has no detectable a11y posts', () => {
        check('/posts/cpp-pragma-pack/en')
        check('/posts/creating-custom-maven-plugin/en')

    })

    it('Has no detectable a11y categories index', () => {
        check('/categories')
    })

    it('Has no detectable a11y posts index by category', () => {
        check('/categories/c')
    })
    function check(path) {
        cy.visit(path)
        cy.injectAxe()
        cy.checkA11y()
    }
})