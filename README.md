# CloudPad
Program with your friends, family, coworkers, pets, and plants!

[CloudPad (Development)](http://198.199.94.36/cloudpad)

[CloudPad (Production)](http://reline.github.io/CloudPad)

## Dependencies
[PeerJS](http://peerjs.com/)

[jQuery](https://jquery.com/)

[Bootstrap](http://getbootstrap.com/)

[GCC](https://gcc.gnu.org/releases.html)

## Development
A `Peer` is initialized with an ID given by the user and either an API key for access to the PeerJS server with a limit of 50 clients or an alternate server's information (Host, port, path, or an ssl key and certificate if using HTTPS).
Data is sent over the DataConnection object established between two (or more) peers to update the content live.
Compiling on the frontend sends an AJAX request containing the code and language selected to a PHP mediator on the backend. The PHP file executes a Bash script and passes the code and language as an argument in order to create the correct type of file, compile it with the proper compiler, run it, then returns the output to the PHP side and finally echoes the result back to the frontend.
