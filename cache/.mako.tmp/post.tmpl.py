# -*- coding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 9
_modified_time = 1394912236.1367705
_enable_loop = True
_template_filename = 'themes/monospace/templates/post.tmpl'
_template_uri = 'post.tmpl'
_source_encoding = 'utf-8'
_exports = ['content', 'extra_head']


def _mako_get_namespace(context, name):
    try:
        return context.namespaces[(__name__, name)]
    except KeyError:
        _mako_generate_namespaces(context)
        return context.namespaces[(__name__, name)]
def _mako_generate_namespaces(context):
    # SOURCE LINE 2
    ns = runtime.TemplateNamespace('helper', context._clean_inheritance_tokens(), templateuri='post_helper.tmpl', callables=None,  calling_uri=_template_uri)
    context.namespaces[(__name__, 'helper')] = ns

    # SOURCE LINE 3
    ns = runtime.TemplateNamespace('comments', context._clean_inheritance_tokens(), templateuri='comments_helper.tmpl', callables=None,  calling_uri=_template_uri)
    context.namespaces[(__name__, 'comments')] = ns

def _mako_inherit(template, context):
    _mako_generate_namespaces(context)
    return runtime._inherit_from(context, 'base.tmpl', _template_uri)
def render_body(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        __M_locals = __M_dict_builtin(pageargs=pageargs)
        def content():
            return render_content(context._locals(__M_locals))
        post = context.get('post', UNDEFINED)
        messages = context.get('messages', UNDEFINED)
        _link = context.get('_link', UNDEFINED)
        comments = _mako_get_namespace(context, 'comments')
        helper = _mako_get_namespace(context, 'helper')
        date_format = context.get('date_format', UNDEFINED)
        def extra_head():
            return render_extra_head(context._locals(__M_locals))
        __M_writer = context.writer()
        # SOURCE LINE 2
        __M_writer('\n')
        # SOURCE LINE 3
        __M_writer('\n')
        # SOURCE LINE 4
        __M_writer('\n')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'extra_head'):
            context['self'].extra_head(**pageargs)
        

        # SOURCE LINE 10
        __M_writer('\n')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'content'):
            context['self'].content(**pageargs)
        

        # SOURCE LINE 41
        __M_writer('\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_content(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        def content():
            return render_content(context)
        post = context.get('post', UNDEFINED)
        messages = context.get('messages', UNDEFINED)
        _link = context.get('_link', UNDEFINED)
        comments = _mako_get_namespace(context, 'comments')
        helper = _mako_get_namespace(context, 'helper')
        date_format = context.get('date_format', UNDEFINED)
        __M_writer = context.writer()
        # SOURCE LINE 11
        __M_writer('\n    <div class="post">\n    ')
        # SOURCE LINE 13
        __M_writer(str(helper.html_title()))
        __M_writer('\n        <div class="meta" style="background-color: rgb(234, 234, 234); ">\n        <span class="authordate">\n            ')
        # SOURCE LINE 16
        __M_writer(str(messages("Posted")))
        __M_writer(': <time class="published" datetime="')
        __M_writer(str(post.date.isoformat()))
        __M_writer('">')
        __M_writer(str(post.formatted_date(date_format)))
        __M_writer('</time>\n')
        # SOURCE LINE 17
        if not post.meta('password'):
            # SOURCE LINE 18
            __M_writer('               [<a href="')
            __M_writer(str(post.source_link()))
            __M_writer('" id="sourcelink">')
            __M_writer(str(messages("Source")))
            __M_writer('</a>]\n')
        # SOURCE LINE 20
        __M_writer('        </span>\n        <br>\n')
        # SOURCE LINE 22
        if post.tags:
            # SOURCE LINE 23
            __M_writer('                <span class="tags">')
            __M_writer(str(messages("Tags")))
            __M_writer(':&nbsp;\n')
            # SOURCE LINE 24
            for tag in post.tags:
                # SOURCE LINE 25
                __M_writer('                    <a class="tag" href="')
                __M_writer(str(_link('tag', tag)))
                __M_writer('"><span>')
                __M_writer(str(tag))
                __M_writer('</span></a>\n')
            # SOURCE LINE 27
            __M_writer('                </span>\n                <br>\n')
        # SOURCE LINE 30
        __M_writer('        <span class="authordate">\n            ')
        # SOURCE LINE 31
        __M_writer(str(helper.html_translations(post)))
        __M_writer('\n        </span>\n        </div>\n    ')
        # SOURCE LINE 34
        __M_writer(str(post.text()))
        __M_writer('\n    ')
        # SOURCE LINE 35
        __M_writer(str(helper.html_pager(post)))
        __M_writer('\n')
        # SOURCE LINE 36
        if not post.meta('nocomments'):
            # SOURCE LINE 37
            __M_writer('        ')
            __M_writer(str(comments.comment_form(post.permalink(absolute=True), post.title(), post.base_path)))
            __M_writer('\n')
        # SOURCE LINE 39
        __M_writer('    ')
        __M_writer(str(helper.mathjax_script(post)))
        __M_writer('\n    </div>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_extra_head(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        helper = _mako_get_namespace(context, 'helper')
        post = context.get('post', UNDEFINED)
        def extra_head():
            return render_extra_head(context)
        __M_writer = context.writer()
        # SOURCE LINE 5
        __M_writer('\n')
        # SOURCE LINE 6
        __M_writer(str(helper.twitter_card_information(post)))
        __M_writer('\n')
        # SOURCE LINE 7
        if post.meta('keywords'):
            # SOURCE LINE 8
            __M_writer('    <meta name="keywords" content="')
            __M_writer(filters.html_escape(str(post.meta('keywords'))))
            __M_writer('"/>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


