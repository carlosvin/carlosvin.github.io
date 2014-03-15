# -*- coding:utf-8 -*-
from mako import runtime, filters, cache
UNDEFINED = runtime.UNDEFINED
__M_dict_builtin = dict
__M_locals_builtin = locals
_magic_number = 9
_modified_time = 1394910140.5769851
_enable_loop = True
_template_filename = '/usr/lib/python3.3/site-packages/nikola/data/themes/bootstrap3/templates/gallery.tmpl'
_template_uri = 'gallery.tmpl'
_source_encoding = 'utf-8'
_exports = ['content', 'extra_js', 'sourcelink', 'extra_head']


def _mako_get_namespace(context, name):
    try:
        return context.namespaces[(__name__, name)]
    except KeyError:
        _mako_generate_namespaces(context)
        return context.namespaces[(__name__, name)]
def _mako_generate_namespaces(context):
    # SOURCE LINE 4
    ns = runtime.TemplateNamespace('ui', context._clean_inheritance_tokens(), templateuri='crumbs.tmpl', callables=None,  calling_uri=_template_uri)
    context.namespaces[(__name__, 'ui')] = ns

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
        _import_ns = {}
        _mako_get_namespace(context, 'ui')._populate(_import_ns, ['bar'])
        text = _import_ns.get('text', context.get('text', UNDEFINED))
        comments = _mako_get_namespace(context, 'comments')
        def extra_js():
            return render_extra_js(context._locals(__M_locals))
        thumbnail_size = _import_ns.get('thumbnail_size', context.get('thumbnail_size', UNDEFINED))
        def sourcelink():
            return render_sourcelink(context._locals(__M_locals))
        title = _import_ns.get('title', context.get('title', UNDEFINED))
        folders = _import_ns.get('folders', context.get('folders', UNDEFINED))
        permalink = _import_ns.get('permalink', context.get('permalink', UNDEFINED))
        def content():
            return render_content(context._locals(__M_locals))
        photo_array = _import_ns.get('photo_array', context.get('photo_array', UNDEFINED))
        ui = _mako_get_namespace(context, 'ui')
        photo_array_json = _import_ns.get('photo_array_json', context.get('photo_array_json', UNDEFINED))
        enable_comments = _import_ns.get('enable_comments', context.get('enable_comments', UNDEFINED))
        crumbs = _import_ns.get('crumbs', context.get('crumbs', UNDEFINED))
        def extra_head():
            return render_extra_head(context._locals(__M_locals))
        __M_writer = context.writer()
        # SOURCE LINE 2
        __M_writer('\n')
        # SOURCE LINE 3
        __M_writer('\n')
        # SOURCE LINE 4
        __M_writer('\n')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'sourcelink'):
            context['self'].sourcelink(**pageargs)
        

        # SOURCE LINE 5
        __M_writer('\n\n')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'content'):
            context['self'].content(**pageargs)
        

        # SOURCE LINE 40
        __M_writer('\n\n\n')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'extra_head'):
            context['self'].extra_head(**pageargs)
        

        # SOURCE LINE 52
        __M_writer('\n\n\n')
        if 'parent' not in context._data or not hasattr(context._data['parent'], 'extra_js'):
            context['self'].extra_js(**pageargs)
        

        # SOURCE LINE 94
        __M_writer('\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_content(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'ui')._populate(_import_ns, ['bar'])
        text = _import_ns.get('text', context.get('text', UNDEFINED))
        comments = _mako_get_namespace(context, 'comments')
        title = _import_ns.get('title', context.get('title', UNDEFINED))
        folders = _import_ns.get('folders', context.get('folders', UNDEFINED))
        permalink = _import_ns.get('permalink', context.get('permalink', UNDEFINED))
        def content():
            return render_content(context)
        photo_array = _import_ns.get('photo_array', context.get('photo_array', UNDEFINED))
        ui = _mako_get_namespace(context, 'ui')
        enable_comments = _import_ns.get('enable_comments', context.get('enable_comments', UNDEFINED))
        crumbs = _import_ns.get('crumbs', context.get('crumbs', UNDEFINED))
        __M_writer = context.writer()
        # SOURCE LINE 7
        __M_writer('\n    ')
        # SOURCE LINE 8
        __M_writer(str(ui.bar(crumbs)))
        __M_writer('\n')
        # SOURCE LINE 9
        if title:
            # SOURCE LINE 10
            __M_writer('    <h1>')
            __M_writer(str(title))
            __M_writer('</h1>\n')
        # SOURCE LINE 12
        if text:
            # SOURCE LINE 13
            __M_writer('    <p>\n        ')
            # SOURCE LINE 14
            __M_writer(str(text))
            __M_writer('\n    </p>\n')
        # SOURCE LINE 17
        if folders:
            # SOURCE LINE 18
            __M_writer('    <ul>\n')
            # SOURCE LINE 19
            for folder, ftitle in folders:
                # SOURCE LINE 20
                __M_writer('        <li><a href="')
                __M_writer(str(folder))
                __M_writer('"><i class="glyphicon\n        glyphicon-folder-open"></i>&nbsp;')
                # SOURCE LINE 21
                __M_writer(str(ftitle))
                __M_writer('</a></li>\n')
            # SOURCE LINE 23
            __M_writer('    </ul>\n')
        # SOURCE LINE 25
        __M_writer('\n    <div id="gallery_container"></div>\n')
        # SOURCE LINE 27
        if photo_array:
            # SOURCE LINE 28
            __M_writer('    <noscript>\n    <ul class="thumbnails">\n')
            # SOURCE LINE 30
            for image in photo_array:
                # SOURCE LINE 31
                __M_writer('            <li><a href="')
                __M_writer(str(image['url']))
                __M_writer('" class="thumbnail image-reference" title="')
                __M_writer(str(image['title']))
                __M_writer('">\n                <img src="')
                # SOURCE LINE 32
                __M_writer(str(image['url_thumb']))
                __M_writer('" alt="')
                __M_writer(str(image['title']))
                __M_writer('" /></a>\n')
            # SOURCE LINE 34
            __M_writer('    </ul>\n    </noscript>\n')
        # SOURCE LINE 37
        if enable_comments:
            # SOURCE LINE 38
            __M_writer('    ')
            __M_writer(str(comments.comment_form(None, permalink, title)))
            __M_writer('\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_extra_js(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'ui')._populate(_import_ns, ['bar'])
        def extra_js():
            return render_extra_js(context)
        thumbnail_size = _import_ns.get('thumbnail_size', context.get('thumbnail_size', UNDEFINED))
        photo_array_json = _import_ns.get('photo_array_json', context.get('photo_array_json', UNDEFINED))
        __M_writer = context.writer()
        # SOURCE LINE 55
        __M_writer('\n<script src="/assets/js/flowr.plugin.js"></script>\n<script>\njsonContent = ')
        # SOURCE LINE 58
        __M_writer(str(photo_array_json))
        __M_writer(';\n$("#gallery_container").flowr({\n        data : jsonContent,\n        height : ')
        # SOURCE LINE 61
        __M_writer(str(thumbnail_size))
        __M_writer('*.6,\n        padding: 5,\n        rows: -1,\n        render : function(params) {\n            // Just return a div, string or a dom object, anything works fine\n            img = $("<img />").attr({\n                \'src\': params.itemData.url_thumb,\n                \'width\' : params.width,\n                \'height\' : params.height\n            }).css(\'max-width\', \'100%\');\n            link = $( "<a></a>").attr({\n                \'href\': params.itemData.url,\n                \'class\': \'image-reference\'\n            });\n            div = $("<div />").addClass(\'image-block\').attr({\n                \'title\': params.itemData.title,\n                \'data-toggle\': "tooltip",\n            });\n            link.append(img);\n            div.append(link);\n            div.hover(div.tooltip());\n            return div;\n        },\n        itemWidth : function(data) { return data.size.w; },\n        itemHeight : function(data) { return data.size.h; },\n        complete : function(params) {\n            if( jsonContent.length > params.renderedItems ) {\n                nextRenderList = jsonContent.slice( params.renderedItems );\n            }\n        }\n    });\n$("a.image-reference").colorbox({rel:"gal", maxWidth:"100%",maxHeight:"100%",scalePhotos:true});\n</script>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_sourcelink(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'ui')._populate(_import_ns, ['bar'])
        def sourcelink():
            return render_sourcelink(context)
        __M_writer = context.writer()
        return ''
    finally:
        context.caller_stack._pop_frame()


def render_extra_head(context,**pageargs):
    __M_caller = context.caller_stack._push_frame()
    try:
        _import_ns = {}
        _mako_get_namespace(context, 'ui')._populate(_import_ns, ['bar'])
        def extra_head():
            return render_extra_head(context)
        __M_writer = context.writer()
        # SOURCE LINE 43
        __M_writer('\n<style type="text/css">\n    .image-block {\n        display: inline-block;\n    }\n    .flowr_row {\n        width: 100%;\n    }\n    </style>\n')
        return ''
    finally:
        context.caller_stack._pop_frame()


