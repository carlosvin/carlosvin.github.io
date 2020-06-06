import {store} from '../store';
import { getSiteName, getDescription } from "../services/lang";

const ld = `<script type="application/ld+json">{
	"@context": "http://schema.org",
	"@type": "WebPage",
	"name": ${getSiteName()},
	"description": "${getDescription()}",
	"publisher": {
		"@type": "ProfilePage",
		"name": "${getSiteName()}"
	}
}</script>`;

const indexData = JSON.stringify({
	ld,
	index: store.index,
	name: getSiteName(),
	description: getDescription()
});

export function get(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(indexData);
}
