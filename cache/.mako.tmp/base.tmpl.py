# -*- coding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 9
_modified_time = 1394999601.6265252
_enable_loop = True
_template_filename = 'themes/blogtxt/templates/base.tmpl'
_template_uri = 'base.tmpl'
_source_encoding = 'utf-8'
_exports = ['belowtitle', 'extra_head', 'content', 'extra_js']


def _mako_get_namespace(context, name):
    try:
        return context.namespaces[(__name__, name)]
    except KeyError:
        _mako_generate_namespaces(context)
        return context.namespaces[(__name__, name)]
def _mako_generate_namespaces(context):
    # SOURCE LINE 2
    ns = runtime.TemplateNamespace('base', context._clean_inheritance_tokens(), templateuri='base_helper.tmpl', callables=None,  calling_uri=_template_uri)
    context.namespaces[(__name__, 'base')] = ns

def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        _import_ns = {}
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        def content():
            return render_content(context._locals(__M_locals))
        sidebar_links = _import_ns.get('sidebar_links', context.get('sidebar_links', UNDEFINED))
        translations = _import_ns.get('translations', context.get('translations', UNDEFINED))
        _link = _import_ns.get('_link', context.get('_link', UNDEFINED))
        def extra_head():
            return render_extra_head(context._locals(__M_locals))
        blog_title = _import_ns.get('blog_title', context.get('blog_title', UNDEFINED))
        def extra_js():
            return render_extra_js(context._locals(__M_locals))
        extra_head_data = _import_ns.get('extra_head_data', context.get('extra_head_data', UNDEFINED))
        lang = _import_ns.get('lang', context.get('lang', UNDEFINED))
        blog_url = _import_ns.get('blog_url', context.get('blog_url', UNDEFINED))
        permalink = _import_ns.get('permalink', context.get('permalink', UNDEFINED))
        messages = _import_ns.get('messages', context.get('messages', UNDEFINED))
        len = _import_ns.get('len', context.get('len', UNDEFINED))
        base = _mako_get_namespace(context, 'base')
        body_end = _import_ns.get('body_end', context.get('body_end', UNDEFINED))
        set_locale = _import_ns.get('set_locale', context.get('set_locale', UNDEFINED))
        rel_link = _import_ns.get('rel_link', context.get('rel_link', UNDEFINED))
        content_footer = _import_ns.get('content_footer', context.get('content_footer', UNDEFINED))
        license = _import_ns.get('license', context.get('license', UNDEFINED))
        def belowtitle():
            return render_belowtitle(context._locals(__M_locals))
        search_form = _import_ns.get('search_form', context.get('search_form', UNDEFINED))
        __M_writer = context.writer()
        __M_writer('\n')
        # SOURCE LINE 3
        __M_writer(str(set_locale(lang)))
        __M_writer('\n<!DOCTYPE html>\n<html lang="')
        # SOURCE LINE 5
        __M_writer(str(lang))
        __M_writer('">\n<head>\n    ')
        # SOURCE LINE 7
        __M_writer(str(base.html_head()))
        __M_writer('\n    ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'extra_head'):
            context['self'].extra_head(**pageargs)
        

        # SOURCE LINE 9
        __M_writer('\n    ')
        # SOURCE LINE 10
        __M_writer(str(extra_head_data))
        __M_writer('\n</head>\n<body>\n<div id="wrapper">\n    <div id="container">\n        <div id="content">\n            <div id="header">\n                <h1 id="blog-title">\n                    <a href="')
        # SOURCE LINE 18
        __M_writer(str(blog_url))
        __M_writer('" title="')
        __M_writer(str(blog_title))
        __M_writer('">')
        __M_writer(str(blog_title))
        __M_writer('</a>\n                </h1>\n                ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'belowtitle'):
            context['self'].belowtitle(**pageargs)
        

        # SOURCE LINE 31
        __M_writer('\n            </div>\n        <div class="hfeed">\n            <!--Body content-->\n            ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'content'):
            context['self'].content(**pageargs)
        

        # SOURCE LINE 35
        __M_writer('\n            <!--End of body content-->\n        </div><!-- .hfeed -->\n    </div><!-- #content -->\n</div><!-- #container -->\n\n<div id="primary" class="theme_sidebar">\n    <ul>\n')
        # SOURCE LINE 43
        for url, text in sidebar_links[lang]:
            # SOURCE LINE 44
            __M_writer('            <li><h3><a href="')
            __M_writer(str(rel_link(permalink, url)))
            __M_writer('">')
            __M_writer(str(text))
            __M_writer('</a></h3>\n')
        # SOURCE LINE 46
        __M_writer('        <li>')
        __M_writer(str(license))
        __M_writer('\n        <li>')
        # SOURCE LINE 47
        __M_writer(str(base.html_social()))
        __M_writer('\n        <li>')
        # SOURCE LINE 48
        __M_writer(str(search_form))
        __M_writer('\n    </ul>\n</div><!-- #primary .theme_sidebar -->\n\n<div id="footer">\n    <span id="theme-link"><a href="http://www.plaintxt.org/themes/blogtxt/" title="<?php _e(\'blog.txt theme for WordPress\', \'blogtxt\' ) ?>" rel="follow designer">blog.txt</a> <?php _e(\'theme by\', \'blogtxt\') ?> <span class="vcard"><a class="url fn n" href="http://scottwallick.com/" title="scottwallick.com" rel="follow designer"><span class="given-name">Scott</span><span class="additional-name"> Allan</span><span class="family-name"> Wallick</span></a></span></span>\n    <small>')
        # SOURCE LINE 54
        __M_writer(str(content_footer))
        __M_writer('</small><p>\n</div><!-- #footer -->\n\n</div><!-- #wrapper -->\n    ')
        # SOURCE LINE 58
        __M_writer(str(base.late_load_js()))
        __M_writer('\n    ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'extra_js'):
            context['self'].extra_js(**pageargs)
        

        # SOURCE LINE 59
        __M_writer('\n    ')
        # SOURCE LINE 60
        __M_writer(str(body_end))
        __M_writer('\n</body>\n</html>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_belowtitle(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        messages = _import_ns.get('messages', context.get('messages', UNDEFINED))
        len = _import_ns.get('len', context.get('len', UNDEFINED))
        translations = _import_ns.get('translations', context.get('translations', UNDEFINED))
        _link = _import_ns.get('_link', context.get('_link', UNDEFINED))
        lang = _import_ns.get('lang', context.get('lang', UNDEFINED))
        def belowtitle():
            return render_belowtitle(context)
        __M_writer = context.writer()
        # SOURCE LINE 20
        __M_writer('\n')
        # SOURCE LINE 21
        if len(translations) > 1:
            # SOURCE LINE 22
            __M_writer('                <small>\n                    ')
            # SOURCE LINE 23
            __M_writer(str(messages("Also available in")))
            __M_writer(':&nbsp;\n')
            # SOURCE LINE 24
            for langname in translations.keys():
                # SOURCE LINE 25
                if langname != lang:
                    # SOURCE LINE 26
                    __M_writer('                            <a href="')
                    __M_writer(str(_link("index", None, langname)))
                    __M_writer('">')
                    __M_writer(str(messages[langname]["LANGUAGE"]))
                    __M_writer('</a>\n')
            # SOURCE LINE 29
            __M_writer('                </small>\n')
        # SOURCE LINE 31
        __M_writer('                ')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_extra_head(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        def extra_head():
            return render_extra_head(context)
        __M_writer = context.writer()
        # SOURCE LINE 8
        __M_writer('\n    ')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_content(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        def content():
            return render_content(context)
        __M_writer = context.writer()
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_extra_js(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        def extra_js():
            return render_extra_js(context)
        __M_writer = context.writer()
        return ''
    finally:
        context.caller_stack._pop_frame()


