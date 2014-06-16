.. title: Git proxy configuration
.. slug: git-proxy-config
.. date: 2012/11/15 12:00:00
.. update: 2014/06/15 00:00:00
.. link: 
.. description: How to configure git to work through a proxy

Sometimes working through a proxy is pretty tedious.

We are going how to configure git to work through a proxy
	
A generic description, how to make git uses a specific proxy:

.. code-block:: bash
  
  #http
  git config --global http.proxy <protocol>://<user_name>:<password>@<ip_host>:<port>
  
  #https
  git config --global https.proxy [protocol]_://[username]_:[password]_@[ip_host]_:[port]_
  
  #to disable using proxy
  git config --global --unset http.proxy

More info in `official Git configuration`_. 

.. [protocol] Use to be http or https
.. [username] The proxy user name
.. [ip_host] Proxy host address
.. [port] Proxy listening port
.. [password] Your proxy password
.. _`official Git configuration`: http://git-scm.com/docs/git-config