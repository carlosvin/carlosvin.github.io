<ul>
	<slot />
</ul>

<style>
	ul {
		margin: 2em 0 1em 0;
		line-height: 1.5;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 3em;
		list-style-type: none;
		padding: 0;
	}

	@media screen and (max-width: 1200px) {
		ul {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media screen and (max-width: 840px) {
		ul {
			grid-template-columns: 1fr;
			gap: 2em;
		}
	}
</style>
