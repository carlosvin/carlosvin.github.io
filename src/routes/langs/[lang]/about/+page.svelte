<script lang="ts">
	import Social from '$lib/components/Social.svelte';
</script>

<svelte:head>
	<title>About me</title>
	<meta name="description" content="A little bit about me" />
</svelte:head>

<h1>About me</h1>

<h2>Before</h2>
<p>
	Over the years, I've had the privilege of working with industry in great companies like Microsoft,
	eBay, Champ, Santander Global Tech and Spanish Lotteries, where I've led teams, architected
	solutions, and developed scalable systems that power critical business functions. My expertise
	spans across languages and frameworks such as Go, Java, React, Python, Typescript, C++ and more.
	I've contributed to projects ranging from e-commerce platforms to real-time trading systems,
	always with a focus on improving efficiency, reliability, and user experience.
</p>

<h2>Now</h2>
<p>
	I currently have the privilege of leading the Sales Apps Team at MongoDB. Our mission is to
	enhance the productivity of the sales department by developing innovative software solutions.
	We're leveraging the FARM tech stack (FastAPI, React, Next.js, TanStack Router, and, naturally,
	MongoDB) to build tools that empower our sales teams to work smarter and more efficiently.
</p>

<h2>Contact</h2>
<p>
	I'm always open to new opportunities and collaborations. Feel free to reach out if you'd like to
	connect!
</p>

<div class="social">
	<Social />
</div>

<style>
	.social {
		display: flex;
		justify-content: center;
	}
</style>
