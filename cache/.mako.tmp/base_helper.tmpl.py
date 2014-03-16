# -*- coding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 9
_modified_time = 1394928574.3255713
_enable_loop = True
_template_filename = '/usr/lib/python3.3/site-packages/nikola/data/themes/base/templates/base_helper.tmpl'
_template_uri = 'base_helper.tmpl'
_source_encoding = 'utf-8'
_exports = ['html_navigation_links', 'late_load_js', 'html_translations', 'html_social', 'html_sidebar_links', 'html_head']


def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        __M_writer = context.writer()
        # SOURCE LINE 49
        __M_writer('\n\n')
        # SOURCE LINE 52
        __M_writer('\n\n')
        # SOURCE LINE 56
        __M_writer('\n\n<!--FIXME: remove in v7 -->\n')
        # SOURCE LINE 61
        __M_writer('\n\n')
        # SOURCE LINE 84
        __M_writer('\n\n\n')
        # SOURCE LINE 93
        __M_writer('\n')
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
        # SOURCE LINE 63
        __M_writer('\n')
        # SOURCE LINE 64
        for url, text in navigation_links[lang]:
            # SOURCE LINE 65
            if isinstance(url, tuple):
                # SOURCE LINE 66
                __M_writer('            <li> ')
                __M_writer(str(text))
                __M_writer('\n            <ul>\n')
                # SOURCE LINE 68
                for suburl, text in url:
                    # SOURCE LINE 69
                    if rel_link(permalink, suburl) == "#":
                        # SOURCE LINE 70
                        __M_writer('                    <li class="active"><a href="')
                        __M_writer(str(permalink))
                        __M_writer('">')
                        __M_writer(str(text))
                        __M_writer('</a>\n')
                        # SOURCE LINE 71
                    else:
                        # SOURCE LINE 72
                        __M_writer('                    <li><a href="')
                        __M_writer(str(suburl))
                        __M_writer('">')
                        __M_writer(str(text))
                        __M_writer('</a>\n')
                # SOURCE LINE 75
                __M_writer('            </ul>\n')
                # SOURCE LINE 76
            else:
                # SOURCE LINE 77
                if rel_link(permalink, url) == "#":
                    # SOURCE LINE 78
                    __M_writer('                <li class="active"><a href="')
                    __M_writer(str(permalink))
                    __M_writer('">')
                    __M_writer(str(text))
                    __M_writer('</a>\n')
                    # SOURCE LINE 79
                else:
                    # SOURCE LINE 80
                    __M_writer('                <li><a href="')
                    __M_writer(str(url))
                    __M_writer('">')
                    __M_writer(str(text))
                    __M_writer('</a>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_late_load_js(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_writer = context.writer()
        # SOURCE LINE 51
        __M_writer('\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_html_translations(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        translations = context.get('translations', UNDEFINED)
        lang = context.get('lang', UNDEFINED)
        _link = context.get('_link', UNDEFINED)
        messages = context.get('messages', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 87
        __M_writer('\n')
        # SOURCE LINE 88
        for langname in translations.keys():
            # SOURCE LINE 89
            if langname != lang:
                # SOURCE LINE 90
                __M_writer('            <a href="')
                __M_writer(str(_link("index", None, langname)))
                __M_writer('" rel="alternate" hreflang="')
                __M_writer(str(langname))
                __M_writer('">')
                __M_writer(str(messages("LANGUAGE", langname)))
                __M_writer('</a>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_html_social(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        social_buttons_code = context.get('social_buttons_code', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 54
        __M_writer('\n    ')
        # SOURCE LINE 55
        __M_writer(str(social_buttons_code))
        __M_writer('\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_html_sidebar_links(context):
    __M_caller = context.caller_stack._push_frame()
    try:
        def html_navigation_links():
            return render_html_navigation_links(context)
        __M_writer = context.writer()
        # SOURCE LINE 59
        __M_writer('\n    ')
        # SOURCE LINE 60
        __M_writer(str(html_navigation_links()))
        __M_writer('\n')
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
        comment_system = context.get('comment_system', UNDEFINED)
        len = context.get('len', UNDEFINED)
        title = context.get('title', UNDEFINED)
        abs_link = context.get('abs_link', UNDEFINED)
        translations = context.get('translations', UNDEFINED)
        blog_title = context.get('blog_title', UNDEFINED)
        striphtml = context.get('striphtml', UNDEFINED)
        favicons = context.get('favicons', UNDEFINED)
        has_custom_css = context.get('has_custom_css', UNDEFINED)
        comment_system_id = context.get('comment_system_id', UNDEFINED)
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
                __M_writer('            <link href="/assets/css/all.css" rel="stylesheet" type="text/css">\n')
                # SOURCE LINE 13
            else:
                # SOURCE LINE 14
                __M_writer('            <link href="/assets/css/all-nocdn.css" rel="stylesheet" type="text/css">\n')
            # SOURCE LINE 16
        else:
            # SOURCE LINE 17
            __M_writer('        <link href="/assets/css/rst.css" rel="stylesheet" type="text/css">\n        <link href="/assets/css/code.css" rel="stylesheet" type="text/css">\n        <link href="/assets/css/theme.css" rel="stylesheet" type="text/css"/>\n')
            # SOURCE LINE 20
            if has_custom_css:
                # SOURCE LINE 21
                __M_writer('            <link href="/assets/css/custom.css" rel="stylesheet" type="text/css">\n')
        # SOURCE LINE 24
        if permalink:
            # SOURCE LINE 25
            __M_writer('      <link rel="canonical" href="')
            __M_writer(str(abs_link(permalink)))
            __M_writer('">\n')
        # SOURCE LINE 27
        __M_writer('    <!--[if lt IE 9]>\n      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>\n    <![endif]-->\n')
        # SOURCE LINE 30
        if rss_link:
            # SOURCE LINE 31
            __M_writer('        ')
            __M_writer(str(rss_link))
            __M_writer('\n')
            # SOURCE LINE 32
        else:
            # SOURCE LINE 33
            if len(translations) > 1:
                # SOURCE LINE 34
                for language in translations:
                    # SOURCE LINE 35
                    __M_writer('                <link rel="alternate" type="application/rss+xml" title="RSS (')
                    __M_writer(str(language))
                    __M_writer(')" href="')
                    __M_writer(str(_link('rss', None, language)))
                    __M_writer('">\n')
                # SOURCE LINE 37
            else:
                # SOURCE LINE 38
                __M_writer('            <link rel="alternate" type="application/rss+xml" title="RSS" href="')
                __M_writer(str(_link('rss', None)))
                __M_writer('">\n')
        # SOURCE LINE 41
        if favicons:
            # SOURCE LINE 42
            for name, file, size in favicons:
                # SOURCE LINE 43
                __M_writer('            <link rel="')
                __M_writer(str(name))
                __M_writer('" href="')
                __M_writer(str(file))
                __M_writer('" sizes="')
                __M_writer(str(size))
                __M_writer('"/>\n')
        # SOURCE LINE 46
        if comment_system == 'facebook':
            # SOURCE LINE 47
            __M_writer('        <meta property="fb:app_id" content="')
            __M_writer(str(comment_system_id))
            __M_writer('">\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


