import {store} from '../store';
import { getSiteName, getDescription } from "../services/lang";

const name = getSiteName();
const description = getDescription();
const ld = {
	"@context": "http://schema.org",
	"@type": "WebPage",
	"name": name,
	"description": description,
	"publisher": {
		"@type": "ProfilePage",
		"name": name
	}
};

const ldScript = `<script type="application/ld+json">
	${JSON.stringify(ld)}
</script>`;

const indexData = JSON.stringify({
	ldScript,
	index: store.index,
	name,
	description
});

export function get(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(indexData);
}
