var peer = null;
// peer.connections[] (names of connection objects for this peer)
// peer.connections.CONNECTION_NAME[] (connection objects between this peer and CONNECTION_NAME peer
var requestedPeers = []; // DataConnection objects to peers that have requested connections with us
var connectedPeers = []; // DataConnection objects to peers that we have requested connections to

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

        // if the peer we requested a connection with is not in our requestedPeers list,
        // check the connectedPeers list, if not found then create a new connection and add it to connectedPeers
        var duplicate = false;
        for (var i = 0; i < connectedPeers.length; i++) {
            if (connectedPeers[i].peer == requestedPeer)
                duplicate = true;
        }

        // if in requestedPeers, push to connectedPeers and pop from requestedPeers
        if (!duplicate) {
            for (var i = 0; i < requestedPeers.length; i++) {
                if (requestedPeers[i].peer == requestedPeer) {
                    connectedPeers.push(requestedPeers[i]);
                    requestedPeers.splice(i, 1);
                    duplicate = true;
                }
            }
        }

        if (!duplicate) {
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
            connectedPeers.push(c);
        }
        
    });

    $('#shared').on('change keydown keyup paste', function () {
        // for each active connection, send the data
        var data = $('#shared').val();
        connectedPeers.forEach(function (c) {
            c.send(data);
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
    // if not in connectedPeers or requestedPeers add to requestedPeers
    var duplicate = false;
    for (var i = 0; i < requestedPeers.length; i++) {
        if (requestedPeers[i].peer == c.peer)
            duplicate = true;
    }

    for (var i = 0; i < connectedPeers.length; i++) {
        if (connectedPeers[i].peer == c.peer)
            duplicate = true;
    }

    if (!duplicate)
        requestedPeers.push(c);

    c.on('data', function (data) {
        // change shared content if connection requested on both ends
        var bidirectional = false;
        for (var i = 0; i < connectedPeers.length; i++) {
            if (connectedPeers[i].peer == c.peer)
                bidirectional = true;
        }

        if (bidirectional)
            $('#shared').val(data);
    });

    c.on('close', function () {
        // TODO: remove our peer and connection on close
    });
}

window.onunload = window.onbeforeunload = function (e) {
    if (!!peer && !peer.destroyed) {
        peer.destroy();
    }
};