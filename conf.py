# -*- coding: utf-8 -*-
from __future__ import unicode_literals

AUTHOR = u"Carlos Martín Sánchez"
SITENAME = u"Vin's Blog"
SITEURL = 'http://carlosvin.github.io'
TIMEZONE = u"Europe/Madrid"


GITHUB_URL = 'http://github.com/carlosvin/'
DISQUS_SITENAME = u"carlosvin"
PDF_GENERATOR = True
REVERSE_CATEGORY_ORDER = True
DEFAULT_PAGINATION = 5

DEFAULT_LANG = 'es'

FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_RSS = 'feeds/%s.rss.xml'

LINKS = (('Biblioln', 'http://biblioln.es'),)

TWITTER_USERNAME = 'carlosvin'
SOCIAL = (('twitter', 'http://twitter.com/' + TWITTER_USERNAME),
          ('lastfm', 'http://lastfm.com/user/carlcms'),
          ('github', 'http://github.com/carlosvin'),)

# path-specific metadata
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    }

# static paths will be copied without parsing their contents
STATIC_PATHS = [
    'pictures',
    'extra/robots.txt',
    ]

GOOGLE_ANALYTICS = u"UA-1328360-9"
