# -*- coding: utf-8 -*-
from __future__ import unicode_literals

AUTHOR = u'Carlos Martín Sánchez'
SITENAME = u"Vin's Blog"
SITEURL = 'http://carlosvin.github.io'
TIMEZONE = "Europe/Madrid"

# can be useful in development, but set to False when you're ready to publish
RELATIVE_URLS = True

GITHUB_URL = 'http://github.com/carlosvin/'
DISQUS_SITENAME = "carlosvin"
PDF_GENERATOR = True
REVERSE_CATEGORY_ORDER = True
DEFAULT_PAGINATION = 5

#LOCALE = ('es_ES', 'en_US', 'es', 'usa')
DEFAULT_LANG = 'es'

FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

LINKS = (('Biblioln', 'http://biblioln.es'),)

SOCIAL = (('twitter', 'http://twitter.com/carlosvin'),
          ('lastfm', 'http://lastfm.com/user/carlcms'),
          ('github', 'http://github.com/carlosvin'),)

TYPOGRIFY = True
# global metadata to all the contents
DEFAULT_METADATA = (('Author', AUTHOR),)

# path-specific metadata
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    }

# static paths will be copied without parsing their contents
STATIC_PATHS = [
    'pictures',
    'extra/robots.txt',
    ]

# custom page generated with a jinja2 template
#TEMPLATE_PAGES = {'pages/jinja2_template.html': 'jinja2_template.html'}

# code blocks with line numbers
PYGMENTS_RST_OPTIONS = {'linenos': 'table'}

GOOGLE_ANALYTICS = "UA-1328360-9"

