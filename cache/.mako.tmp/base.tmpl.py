# -*- coding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 9
_modified_time = 1394928574.2887623
_enable_loop = True
_template_filename = 'themes/monospace/templates/base.tmpl'
_template_uri = 'base.tmpl'
_source_encoding = 'utf-8'
_exports = ['extra_js', 'content', 'extra_head', 'belowtitle']


def _mako_get_namespace(context, name):
    try:
        return context.namespaces[(__name__, name)]
    except KeyError:
        _mako_generate_namespaces(context)
        return context.namespaces[(__name__, name)]
def _mako_generate_namespaces(context):
    # SOURCE LINE 3
    ns = runtime.TemplateNamespace('bootstrap', context._clean_inheritance_tokens(), templateuri='bootstrap_helper.tmpl', callables=None,  calling_uri=_template_uri)
    context.namespaces[(__name__, 'bootstrap')] = ns

    # SOURCE LINE 2
    ns = runtime.TemplateNamespace('base', context._clean_inheritance_tokens(), templateuri='base_helper.tmpl', callables=None,  calling_uri=_template_uri)
    context.namespaces[(__name__, 'base')] = ns

def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        _import_ns = {}
        _mako_get_namespace(context, 'bootstrap')._populate(_import_ns, ['*'])
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        bootstrap = _mako_get_namespace(context, 'bootstrap')
        def extra_js():
            return render_extra_js(context._locals(__M_locals))
        content_footer = _import_ns.get('content_footer', context.get('content_footer', UNDEFINED))
        len = _import_ns.get('len', context.get('len', UNDEFINED))
        lang = _import_ns.get('lang', context.get('lang', UNDEFINED))
        def content():
            return render_content(context._locals(__M_locals))
        extra_head_data = _import_ns.get('extra_head_data', context.get('extra_head_data', UNDEFINED))
        license = _import_ns.get('license', context.get('license', UNDEFINED))
        set_locale = _import_ns.get('set_locale', context.get('set_locale', UNDEFINED))
        search_form = _import_ns.get('search_form', context.get('search_form', UNDEFINED))
        def extra_head():
            return render_extra_head(context._locals(__M_locals))
        base = _mako_get_namespace(context, 'base')
        def belowtitle():
            return render_belowtitle(context._locals(__M_locals))
        body_end = _import_ns.get('body_end', context.get('body_end', UNDEFINED))
        messages = _import_ns.get('messages', context.get('messages', UNDEFINED))
        blog_title = _import_ns.get('blog_title', context.get('blog_title', UNDEFINED))
        translations = _import_ns.get('translations', context.get('translations', UNDEFINED))
        abs_link = _import_ns.get('abs_link', context.get('abs_link', UNDEFINED))
        __M_writer = context.writer()
        __M_writer('\n')
        # SOURCE LINE 3
        __M_writer('\n')
        # SOURCE LINE 4
        __M_writer(str(set_locale(lang)))
        __M_writer('\n<!DOCTYPE html>\n<html lang="')
        # SOURCE LINE 6
        __M_writer(str(lang))
        __M_writer('">\n<head>\n    ')
        # SOURCE LINE 8
        __M_writer(str(bootstrap.html_head()))
        __M_writer('\n    ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'extra_head'):
            context['self'].extra_head(**pageargs)
        

        # SOURCE LINE 10
        __M_writer('\n    ')
        # SOURCE LINE 11
        __M_writer(str(extra_head_data))
        __M_writer('\n</head>\n<body class="home blog">\n    <div id="wrap" style="width:850px">\n        <div id="container" style="width:560px">\n            ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'content'):
            context['self'].content(**pageargs)
        

        # SOURCE LINE 16
        __M_writer('\n        </div>\n        <div id="sidebar">\n            <!--Sidebar content-->\n            <h1 id="blog-title">\n                <a href="')
        # SOURCE LINE 21
        __M_writer(str(abs_link('/')))
        __M_writer('" title="')
        __M_writer(str(blog_title))
        __M_writer('">')
        __M_writer(str(blog_title))
        __M_writer('</a>\n            </h1>\n            ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'belowtitle'):
            context['self'].belowtitle(**pageargs)
        

        # SOURCE LINE 30
        __M_writer('\n            <ul class="unstyled">\n            <li>')
        # SOURCE LINE 32
        __M_writer(str(license))
        __M_writer('\n            ')
        # SOURCE LINE 33
        __M_writer(str(base.html_social()))
        __M_writer('\n            ')
        # SOURCE LINE 34
        __M_writer(str(bootstrap.html_navigation_links()))
        __M_writer('\n            <li>')
        # SOURCE LINE 35
        __M_writer(str(search_form))
        __M_writer('\n            </ul>\n        </div>\n        <div id="footer">\n            ')
        # SOURCE LINE 39
        __M_writer(str(content_footer))
        __M_writer('\n        </div>\n    </div>\n    ')
        # SOURCE LINE 42
        __M_writer(str(bootstrap.late_load_js()))
        __M_writer('\n    <script type="text/javascript">jQuery("a.image-reference").colorbox({rel:"gal",maxWidth:"100%",maxHeight:"100%",scalePhotos:true});</script>\n    ')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'extra_js'):
            context['self'].extra_js(**pageargs)
        

        # SOURCE LINE 44
        __M_writer('\n    ')
        # SOURCE LINE 45
        __M_writer(str(body_end))
        __M_writer('\n</body>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_extra_js(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'bootstrap')._populate(_import_ns, ['*'])
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        def extra_js():
            return render_extra_js(context)
        __M_writer = context.writer()
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_content(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'bootstrap')._populate(_import_ns, ['*'])
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        def content():
            return render_content(context)
        __M_writer = context.writer()
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_extra_head(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'bootstrap')._populate(_import_ns, ['*'])
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        def extra_head():
            return render_extra_head(context)
        __M_writer = context.writer()
        # SOURCE LINE 9
        __M_writer('\n    ')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_belowtitle(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'bootstrap')._populate(_import_ns, ['*'])
        _mako_get_namespace(context, 'base')._populate(_import_ns, ['*'])
        translations = _import_ns.get('translations', context.get('translations', UNDEFINED))
        messages = _import_ns.get('messages', context.get('messages', UNDEFINED))
        len = _import_ns.get('len', context.get('len', UNDEFINED))
        def belowtitle():
            return render_belowtitle(context)
        base = _mako_get_namespace(context, 'base')
        __M_writer = context.writer()
        # SOURCE LINE 23
        __M_writer('\n')
        # SOURCE LINE 24
        if len(translations) > 1:
            # SOURCE LINE 25
            __M_writer('            <small>\n                ')
            # SOURCE LINE 26
            __M_writer(str(messages("Also available in")))
            __M_writer(':&nbsp;\n                ')
            # SOURCE LINE 27
            __M_writer(str(base.html_translations()))
            __M_writer('\n            </small>\n')
        # SOURCE LINE 30
        __M_writer('            ')
        return ''
    finally:
        context.caller_stack._pop_frame()


