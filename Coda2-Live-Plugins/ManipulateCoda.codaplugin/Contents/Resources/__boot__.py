def _reset_sys_path():
    # Clear generic sys.path[0]
    import sys, os
    resources = os.environ['RESOURCEPATH']
    while sys.path[0] == resources:
        del sys.path[0]
_reset_sys_path()


def _update_path():
    import os, sys
    resources = os.environ['RESOURCEPATH']
    sys.path.append(os.path.join(
        resources, 'lib', 'python%d.%d'%(sys.version_info[:2]), 'lib-dynload'))
    sys.path.append(os.path.join(
        resources, 'lib', 'python%d.%d'%(sys.version_info[:2])))

_update_path()


def _site_packages():
    import site, sys, os
    paths = []
    prefixes = [sys.prefix]
    if sys.exec_prefix != sys.prefix:
        prefixes.append(sys.exec_prefix)
    for prefix in prefixes:
	if prefix == sys.prefix:
	    paths.append(os.path.join("/Library/Python", sys.version[:3], "site-packages"))
	    paths.append(os.path.join(sys.prefix, "Extras", "lib", "python"))
	else:
	    paths.append(os.path.join(prefix, 'lib', 'python' + sys.version[:3],
		'site-packages'))
    if os.path.join('.framework', '') in os.path.join(sys.prefix, ''):
        home = os.environ.get('HOME')
        if home:
            paths.append(os.path.join(home, 'Library', 'Python',
                sys.version[:3], 'site-packages'))

    # Work around for a misfeature in setuptools: easy_install.pth places
    # site-packages way to early on sys.path and that breaks py2app bundles.
    # NOTE: this is hacks into an undocumented feature of setuptools and
    # might stop to work without warning.
    sys.__egginsert = len(sys.path)

    for path in paths:
        site.addsitedir(path)
_site_packages()


""" Add Apple's additional packages to sys.path """
def add_system_python_extras():
    import site, sys

    ver = '%s.%s'%(sys.version_info[:2])

    site.addsitedir('/System/Library/Frameworks/Python.framework/Versions/%s/Extras/lib/python'%(ver,))

add_system_python_extras()


def _disable_linecache():
    import linecache
    def fake_getline(*args, **kwargs):
        return ''
    linecache.orig_getline = linecache.getline
    linecache.getline = fake_getline
_disable_linecache()


def _run():
    global __file__
    import os, sys, site
    sys.frozen = 'macosx_plugin'
    base = os.environ['RESOURCEPATH']

    if 'ARGVZERO' in os.environ:
        argv0 = os.path.basename(os.environ['ARGVZERO'])
    else:
        argv0 = None
    script = SCRIPT_MAP.get(argv0, DEFAULT_SCRIPT)

    path = os.path.join(base, script)
    __file__ = path
    with open(path, 'rU') as fp:
        source = fp.read()
    exec(compile(source, path, 'exec'), globals(), globals())



DEFAULT_SCRIPT='CodaPlugin.py'
SCRIPT_MAP={}
_run()
