import {store} from '../store';
import { getSiteName, getDescription } from "../services/lang";

const name = getSiteName();
const description = getDescription();
const ld = `<script type="application/ld+json">{
	"@context": "http://schema.org",
	"@type": "WebPage",
	"name": ${name},
	"description": "${description}",
	"publisher": {
		"@type": "ProfilePage",
		"name": "${name}"
	}
}</script>`;

const indexData = JSON.stringify({
	ld,
	index: store.index,
	name,
	description
});

export function get(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(indexData);
}
