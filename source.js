var peer = null;

$(document).ready(function() {

    $('#setID').on('click', function () {
        // create new Peer with API key with debug set to true
        peer = new Peer($('#myID').val(), {host: '198.199.94.36', port: 9000, path: '/', debug: 3});
        // you can pick your own id or omit the id to get a random one from the server

        // 'open' event signifies that the Peer is ready to connect with other Peers
        peer.on('open', function () {
            // todo: enable connect button
        });

        peer.on('connection', function (connection) {
            // connection is a DataConnection object used to send data
            // 'open' event firing means that the connection is ready to transmit data
            connection.on('open', function () {
                connection.send("Boop");
            });
            // the 'data' event is fired when data is received on the connection
            connection.on('data', function (data) {
                $('#helloworld').append(data);
            });
        });
    });

    $('#connect').on('click', function () {
        var conn = peer.connect($('#peerID').val());
        conn.on('data', function (data) {
            $('#helloworld').append(data);
            conn.send("Beep");
        });
    });

});
