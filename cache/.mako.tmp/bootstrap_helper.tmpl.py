# -*- coding:ascii -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 9
_modified_time = 1394928574.3734155
_enable_loop = True
_template_filename = '/usr/lib/python3.3/site-packages/nikola/data/themes/bootstrap/templates/bootstrap_helper.tmpl'
_template_uri = 'bootstrap_helper.tmpl'
_source_encoding = 'ascii'
_exports = ['late_load_js', 'html_navigation_links', 'html_head']


def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        __M_writer = context.writer()
        # SOURCE LINE 54
        __M_writer('\n\n')
        # SOURCE LINE 75
        __M_writer('\n\n\n')
        # SOURCE LINE 99
        __M_writer('\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_late_load_js(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        use_bundles = context.get('use_bundles', UNDEFINED)
        use_cdn = context.get('use_cdn', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 56
        __M_writer('\n')
        # SOURCE LINE 57
        if use_bundles:
            # SOURCE LINE 58
            if use_cdn:
                # SOURCE LINE 59
                __M_writer('            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>\n            <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/js/bootstrap.min.js"></script>\n            <script src="/assets/js/all.js" type="text/javascript"></script>\n')
                # SOURCE LINE 62
            else:
                # SOURCE LINE 63
                __M_writer('            <script src="/assets/js/all-nocdn.js" type="text/javascript"></script>\n')
            # SOURCE LINE 65
        else:
            # SOURCE LINE 66
            if use_cdn:
                # SOURCE LINE 67
                __M_writer('            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>\n            <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/js/bootstrap.min.js"></script>\n')
                # SOURCE LINE 69
            else:
                # SOURCE LINE 70
                __M_writer('            <script src="/assets/js/jquery-1.10.2.min.js" type="text/javascript"></script>\n            <script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>\n')
            # SOURCE LINE 73
            __M_writer('        <script src="/assets/js/jquery.colorbox-min.js" type="text/javascript"></script>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_html_navigation_links(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        permalink = context.get('permalink', UNDEFINED)
        isinstance = context.get('isinstance', UNDEFINED)
        rel_link = context.get('rel_link', UNDEFINED)
        lang = context.get('lang', UNDEFINED)
        navigation_links = context.get('navigation_links', UNDEFINED)
        tuple = context.get('tuple', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 78
        __M_writer('\n')
        # SOURCE LINE 79
        for url, text in navigation_links[lang]:
            # SOURCE LINE 80
            if isinstance(url, tuple):
                # SOURCE LINE 81
                __M_writer('            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">')
                __M_writer(str(text))
                __M_writer('<b class="caret"></b></a>\n            <ul class="dropdown-menu">\n')
                # SOURCE LINE 83
                for suburl, text in url:
                    # SOURCE LINE 84
                    if rel_link(permalink, suburl) == "#":
                        # SOURCE LINE 85
                        __M_writer('                    <li class="active"><a href="')
                        __M_writer(str(permalink))
                        __M_writer('">')
                        __M_writer(str(text))
                        __M_writer('</a>\n')
                        # SOURCE LINE 86
                    else:
                        # SOURCE LINE 87
                        __M_writer('                    <li><a href="')
                        __M_writer(str(suburl))
                        __M_writer('">')
                        __M_writer(str(text))
                        __M_writer('</a>\n')
                # SOURCE LINE 90
                __M_writer('            </ul>\n')
                # SOURCE LINE 91
            else:
                # SOURCE LINE 92
                if rel_link(permalink, url) == "#":
                    # SOURCE LINE 93
                    __M_writer('                <li class="active"><a href="')
                    __M_writer(str(permalink))
                    __M_writer('">')
                    __M_writer(str(text))
                    __M_writer('</a>\n')
                    # SOURCE LINE 94
                else:
                    # SOURCE LINE 95
                    __M_writer('                <li><a href="')
                    __M_writer(str(url))
                    __M_writer('">')
                    __M_writer(str(text))
                    __M_writer('</a>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_html_head(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        permalink = context.get('permalink', UNDEFINED)
        _link = context.get('_link', UNDEFINED)
        mathjax_config = context.get('mathjax_config', UNDEFINED)
        rss_link = context.get('rss_link', UNDEFINED)
        use_bundles = context.get('use_bundles', UNDEFINED)
        len = context.get('len', UNDEFINED)
        title = context.get('title', UNDEFINED)
        abs_link = context.get('abs_link', UNDEFINED)
        translations = context.get('translations', UNDEFINED)
        blog_title = context.get('blog_title', UNDEFINED)
        striphtml = context.get('striphtml', UNDEFINED)
        favicons = context.get('favicons', UNDEFINED)
        has_custom_css = context.get('has_custom_css', UNDEFINED)
        description = context.get('description', UNDEFINED)
        use_cdn = context.get('use_cdn', UNDEFINED)
        blog_author = context.get('blog_author', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 2
        __M_writer('\n    <meta charset="utf-8">\n')
        # SOURCE LINE 4
        if description:
            # SOURCE LINE 5
            __M_writer('    <meta name="description" content="')
            __M_writer(str(description))
            __M_writer('">\n')
        # SOURCE LINE 7
        __M_writer('    <meta name="author" content="')
        __M_writer(str(blog_author))
        __M_writer('">\n    <title>')
        # SOURCE LINE 8
        __M_writer(striphtml(str(title)))
        __M_writer(' | ')
        __M_writer(striphtml(str(blog_title)))
        __M_writer('</title>\n    ')
        # SOURCE LINE 9
        __M_writer(str(mathjax_config))
        __M_writer('\n')
        # SOURCE LINE 10
        if use_bundles:
            # SOURCE LINE 11
            if use_cdn:
                # SOURCE LINE 12
                __M_writer('            <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css" rel="stylesheet">\n            <link href="/assets/css/all.css" rel="stylesheet" type="text/css">\n')
                # SOURCE LINE 14
            else:
                # SOURCE LINE 15
                __M_writer('            <link href="/assets/css/all-nocdn.css" rel="stylesheet" type="text/css">\n')
            # SOURCE LINE 17
        else:
            # SOURCE LINE 18
            if use_cdn:
                # SOURCE LINE 19
                __M_writer('            <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css" rel="stylesheet">\n')
                # SOURCE LINE 20
            else:
                # SOURCE LINE 21
                __M_writer('            <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">\n            <link href="/assets/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css">\n')
            # SOURCE LINE 24
            __M_writer('        <link href="/assets/css/rst.css" rel="stylesheet" type="text/css">\n        <link href="/assets/css/code.css" rel="stylesheet" type="text/css">\n        <link href="/assets/css/colorbox.css" rel="stylesheet" type="text/css"/>\n        <link href="/assets/css/theme.css" rel="stylesheet" type="text/css"/>\n')
            # SOURCE LINE 28
            if has_custom_css:
                # SOURCE LINE 29
                __M_writer('            <link href="/assets/css/custom.css" rel="stylesheet" type="text/css">\n')
        # SOURCE LINE 32
        if permalink:
            # SOURCE LINE 33
            __M_writer('      <link rel="canonical" href="')
            __M_writer(str(abs_link(permalink)))
            __M_writer('">\n')
        # SOURCE LINE 35
        __M_writer('    <!--[if lt IE 9]>\n      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>\n    <![endif]-->\n')
        # SOURCE LINE 38
        if rss_link:
            # SOURCE LINE 39
            __M_writer('        ')
            __M_writer(str(rss_link))
            __M_writer('\n')
            # SOURCE LINE 40
        else:
            # SOURCE LINE 41
            if len(translations) > 1:
                # SOURCE LINE 42
                for language in translations:
                    # SOURCE LINE 43
                    __M_writer('                <link rel="alternate" type="application/rss+xml" title="RSS (')
                    __M_writer(str(language))
                    __M_writer(')" href="')
                    __M_writer(str(_link('rss', None, language)))
                    __M_writer('">\n')
                # SOURCE LINE 45
            else:
                # SOURCE LINE 46
                __M_writer('            <link rel="alternate" type="application/rss+xml" title="RSS" href="')
                __M_writer(str(_link('rss', None)))
                __M_writer('">\n')
        # SOURCE LINE 49
        if favicons:
            # SOURCE LINE 50
            for name, file, size in favicons:
                # SOURCE LINE 51
                __M_writer('            <link rel="')
                __M_writer(str(name))
                __M_writer('" href="')
                __M_writer(str(file))
                __M_writer('" sizes="')
                __M_writer(str(size))
                __M_writer('"/>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


