
[
    "/",
    "/categories",
    "/categories/sapper",
    "/posts/creating-custom-maven-plugin-default",
    "/posts/choosing-modern-cpp-stack",
    "/posts/cpp-mutex",
    "/posts/cpp-pragma-pack",
    "/posts/creating-custom-maven-plugin",
    "/posts/delete-html-tags-py-django",
    "/posts/gradle-cpp",
    "/posts/java-embedded-db-performance-comparison",
    "/posts/react-typescript-parcel",
    "/posts/pwa-lessons-learned-cra",
].forEach((url) => {
    it(`should be valid ${url}`, () => {
        cy.visit(url)
        cy.htmlvalidate()
    })
})
