# -*- coding:ascii -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 9
_modified_time = 1394910140.3161905
_enable_loop = True
_template_filename = '/usr/lib/python3.3/site-packages/nikola/data/themes/bootstrap3/templates/bootstrap_helper.tmpl'
_template_uri = 'bootstrap_helper.tmpl'
_source_encoding = 'ascii'
_exports = ['html_navigation_links', 'html_head', 'late_load_js', 'html_translations']


def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        __M_writer = context.writer()
        # SOURCE LINE 2
        __M_writer('\n')
        # SOURCE LINE 55
        __M_writer('\n\n')
        # SOURCE LINE 76
        __M_writer('\n\n\n')
        # SOURCE LINE 100
        __M_writer('\n\n\n')
        # SOURCE LINE 109
        __M_writer('\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_html_navigation_links(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        tuple = context.get('tuple', UNDEFINED)
        rel_link = context.get('rel_link', UNDEFINED)
        isinstance = context.get('isinstance', UNDEFINED)
        lang = context.get('lang', UNDEFINED)
        navigation_links = context.get('navigation_links', UNDEFINED)
        permalink = context.get('permalink', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 79
        __M_writer('\n')
        # SOURCE LINE 80
        for url, text in navigation_links[lang]:
            # SOURCE LINE 81
            if isinstance(url, tuple):
                # SOURCE LINE 82
                __M_writer('            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">')
                __M_writer(str(text))
                __M_writer('<b class="caret"></b></a>\n            <ul class="dropdown-menu">\n')
                # SOURCE LINE 84
                for suburl, text in url:
                    # SOURCE LINE 85
                    if rel_link(permalink, suburl) == "#":
                        # SOURCE LINE 86
                        __M_writer('                    <li class="active"><a href="')
                        __M_writer(str(permalink))
                        __M_writer('">')
                        __M_writer(str(text))
                        __M_writer('</a>\n')
                        # SOURCE LINE 87
                    else:
                        # SOURCE LINE 88
                        __M_writer('                    <li><a href="')
                        __M_writer(str(suburl))
                        __M_writer('">')
                        __M_writer(str(text))
                        __M_writer('</a>\n')
                # SOURCE LINE 91
                __M_writer('            </ul>\n')
                # SOURCE LINE 92
            else:
                # SOURCE LINE 93
                if rel_link(permalink, url) == "#":
                    # SOURCE LINE 94
                    __M_writer('                <li class="active"><a href="')
                    __M_writer(str(permalink))
                    __M_writer('">')
                    __M_writer(str(text))
                    __M_writer('</a>\n')
                    # SOURCE LINE 95
                else:
                    # SOURCE LINE 96
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
        description = context.get('description', UNDEFINED)
        rss_link = context.get('rss_link', UNDEFINED)
        translations = context.get('translations', UNDEFINED)
        blog_author = context.get('blog_author', UNDEFINED)
        use_cdn = context.get('use_cdn', UNDEFINED)
        striphtml = context.get('striphtml', UNDEFINED)
        _link = context.get('_link', UNDEFINED)
        abs_link = context.get('abs_link', UNDEFINED)
        title = context.get('title', UNDEFINED)
        use_bundles = context.get('use_bundles', UNDEFINED)
        len = context.get('len', UNDEFINED)
        blog_title = context.get('blog_title', UNDEFINED)
        mathjax_config = context.get('mathjax_config', UNDEFINED)
        favicons = context.get('favicons', UNDEFINED)
        has_custom_css = context.get('has_custom_css', UNDEFINED)
        permalink = context.get('permalink', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 3
        __M_writer('\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n')
        # SOURCE LINE 6
        if description:
            # SOURCE LINE 7
            __M_writer('    <meta name="description" content="')
            __M_writer(str(description))
            __M_writer('">\n')
        # SOURCE LINE 9
        __M_writer('    <meta name="author" content="')
        __M_writer(str(blog_author))
        __M_writer('">\n    <title>')
        # SOURCE LINE 10
        __M_writer(striphtml(str(title)))
        __M_writer(' | ')
        __M_writer(striphtml(str(blog_title)))
        __M_writer('</title>\n    ')
        # SOURCE LINE 11
        __M_writer(str(mathjax_config))
        __M_writer('\n')
        # SOURCE LINE 12
        if use_bundles:
            # SOURCE LINE 13
            if use_cdn:
                # SOURCE LINE 14
                __M_writer('            <link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">\n            <link href="/assets/css/all.css" rel="stylesheet" type="text/css">\n')
                # SOURCE LINE 16
            else:
                # SOURCE LINE 17
                __M_writer('            <link href="/assets/css/all-nocdn.css" rel="stylesheet" type="text/css">\n')
            # SOURCE LINE 19
        else:
            # SOURCE LINE 20
            if use_cdn:
                # SOURCE LINE 21
                __M_writer('            <link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">\n')
                # SOURCE LINE 22
            else:
                # SOURCE LINE 23
                __M_writer('            <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">\n')
            # SOURCE LINE 25
            __M_writer('        <link href="/assets/css/rst.css" rel="stylesheet" type="text/css">\n        <link href="/assets/css/code.css" rel="stylesheet" type="text/css">\n        <link href="/assets/css/colorbox.css" rel="stylesheet" type="text/css"/>\n        <link href="/assets/css/theme.css" rel="stylesheet" type="text/css"/>\n')
            # SOURCE LINE 29
            if has_custom_css:
                # SOURCE LINE 30
                __M_writer('            <link href="/assets/css/custom.css" rel="stylesheet" type="text/css">\n')
        # SOURCE LINE 33
        if permalink:
            # SOURCE LINE 34
            __M_writer('      <link rel="canonical" href="')
            __M_writer(str(abs_link(permalink)))
            __M_writer('">\n')
        # SOURCE LINE 36
        __M_writer('    <!--[if lt IE 9]>\n      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>\n    <![endif]-->\n')
        # SOURCE LINE 39
        if rss_link:
            # SOURCE LINE 40
            __M_writer('        ')
            __M_writer(str(rss_link))
            __M_writer('\n')
            # SOURCE LINE 41
        else:
            # SOURCE LINE 42
            if len(translations) > 1:
                # SOURCE LINE 43
                for language in translations:
                    # SOURCE LINE 44
                    __M_writer('                <link rel="alternate" type="application/rss+xml" title="RSS (')
                    __M_writer(str(language))
                    __M_writer(')" href="')
                    __M_writer(str(_link('rss', None, language)))
                    __M_writer('">\n')
                # SOURCE LINE 46
            else:
                # SOURCE LINE 47
                __M_writer('            <link rel="alternate" type="application/rss+xml" title="RSS" href="')
                __M_writer(str(_link('rss', None)))
                __M_writer('">\n')
        # SOURCE LINE 50
        if favicons:
            # SOURCE LINE 51
            for name, file, size in favicons:
                # SOURCE LINE 52
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


def render_late_load_js(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        use_bundles = context.get('use_bundles', UNDEFINED)
        use_cdn = context.get('use_cdn', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 57
        __M_writer('\n')
        # SOURCE LINE 58
        if use_bundles:
            # SOURCE LINE 59
            if use_cdn:
                # SOURCE LINE 60
                __M_writer('            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>\n            <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n            <script src="/assets/js/all.js" type="text/javascript"></script>\n')
                # SOURCE LINE 63
            else:
                # SOURCE LINE 64
                __M_writer('            <script src="/assets/js/all-nocdn.js" type="text/javascript"></script>\n')
            # SOURCE LINE 66
        else:
            # SOURCE LINE 67
            if use_cdn:
                # SOURCE LINE 68
                __M_writer('            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript"></script>\n            <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n')
                # SOURCE LINE 70
            else:
                # SOURCE LINE 71
                __M_writer('            <script src="/assets/js/jquery-1.10.2.min.js" type="text/javascript"></script>\n            <script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>\n')
            # SOURCE LINE 74
            __M_writer('        <script src="/assets/js/jquery.colorbox-min.js" type="text/javascript"></script>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_html_translations(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        lang = context.get('lang', UNDEFINED)
        messages = context.get('messages', UNDEFINED)
        _link = context.get('_link', UNDEFINED)
        translations = context.get('translations', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 103
        __M_writer('\n')
        # SOURCE LINE 104
        for langname in translations.keys():
            # SOURCE LINE 105
            if langname != lang:
                # SOURCE LINE 106
                __M_writer('            <li><a href="')
                __M_writer(str(_link("index", None, langname)))
                __M_writer('" rel="alternate" hreflang="')
                __M_writer(str(langname))
                __M_writer('">')
                __M_writer(str(messages("LANGUAGE", langname)))
                __M_writer('</a></li>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


