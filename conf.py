# -*- coding: utf-8 -*-
from __future__ import unicode_literals

AUTHOR = u"Carlos Martín Sánchez"
SITENAME = u"Carlosvin's Blog"
SITEURL = 'http://carlosvin.github.io'
TIMEZONE = u"Europe/Madrid"

# can be useful in development, but set to False when you're ready to publish
RELATIVE_URLS = True

GITHUB_URL = 'http://github.com/carlosvin/'
DISQUS_SITENAME = u"carlosvin"
#PDF_GENERATOR = True
#REVERSE_CATEGORY_ORDER = True
DEFAULT_PAGINATION = 5

LOCALE = ('es_ES', 'en_US', 'es', 'usa',)
DEFAULT_LANG = 'es'

FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

LINKS = (('Biblioln', 'http://biblioln.es'),)

TWITTER_USERNAME = 'carlosvin'
SOCIAL = (('twitter', 'http://twitter.com/' + TWITTER_USERNAME),
          ('lastfm', 'http://lastfm.com/user/carlcms'),
          ('github', 'http://github.com/carlosvin'),)

# global metadata to all the contents
DEFAULT_METADATA = (('author', AUTHOR),)

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

GOOGLE_ANALYTICS = u"UA-1328360-9"

