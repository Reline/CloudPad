var peer = null;
var connectedPeers = [];

$(document).ready(function() {

    $('#setID').on('click', function () {
        if (peer == null) {
            setupPeer();
        } else if ($('#myID').val() != peer.id) {
            // close old peer
            peer.destroy();
            // create new peer
            setupPeer();
        }
    });

    $('#connect').on('click', function () {

        var requestedPeer = $('#peerID').val();
        if (connectedPeers.indexOf(requestedPeer) == -1) {
            // create a connection
            var c = peer.connect(requestedPeer, {
                serialization: 'none'
            });
            c.on('open', function () {
                connect(c);
            });
            c.on('error', function (err) {
                alert(err);
            });
        }
        
    });

    $('#shared').on('change', function () {
        console.log("Change made");
        // for each active connection, send the data
        var data = $('#shared').val();
        console.log("Data to be sent: " + data);

        connectedPeers.forEach(function (c) {
            c.requestedPeer.send(data);
        });
    });

});

function setupPeer () {
    // create new Peer and assign ID with debug set to true using local PeerServer
    peer = new Peer($('#myID').val(), {host: '198.199.94.36', port: 9000, path: '/', debug: 3});

    // await connection from others
    peer.on('connection', connect);

    peer.on('error', function (err) {
        console.log(err);
    });
}

function connect(c) {
    console.log("Connecting to Peer");

    if (connectedPeers.indexOf(c.peer) == -1) {
        var requestedPeer = c.peer;
        connectedPeers.push({requestedPeer: c});
    }

    c.on('data', function (data) {
        console.log("Received data: " + data);
        $('#shared').val(data);
    });

    c.on('close', function () {
        console.log("Connection closed");
        connectedPeers.splice(
            connectedPeers.indexOf(c.peer), 1
        );
    });
}

window.onunload = window.onbeforeunload = function (e) {
    if (!!peer && !peer.destroyed) {
        peer.destroy();
    }
};