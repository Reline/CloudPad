var peer = null;
var requestedPeers = []; // DataConnection objects to peers that have unrequited connection requests
var connectedPeers = []; // DataConnection objects to peers that requested connections with one another

$(document).ready(function() {

    // disable set id button if the input is empty
    $('#setID').prop('disabled', true);
    $('#myID').keyup(function () {
        $('#setID').prop('disabled', this.value == "" ? true : false);
    })

    // disable connect button if the input is empty
    $('#connect').prop('disabled', true);
    $('#peerID').keyup(function () {
        $('#connect').prop('disabled', (this.value == "" || peer === null) ? true : false);
    })

    // setup our new peer our close and create a new peer if one already exists
    $('#setID').on('click', function () {
        if (peer == null) {
            setupPeer();
            $('#connect').prop('disabled', ($('#peerID').value == "" || peer === null) ? true : false);
        } else if ($('#myID').val() != peer.id) {
            // close old peer
            peer.destroy();
            // create new peer
            setupPeer();
        }
    });

    $('#connect').on('click', function () {
        $('.overlay').show();

        var requestedPeer = $('#peerID').val();

        if (!isConnectedPeer(requestedPeer) && isRequestedPeer(requestedPeer)) {
            movePeer(requestedPeers, connectedPeers, requestedPeer);
            $('.overlay').hide();
            // if this is a new peer whom we have no connections with...
        } else if (!isConnectedPeer(requestedPeer) && !isRequestedPeer(requestedPeer)) {
            // create a connection
            var c = peer.connect(requestedPeer, {
                serialization: 'none'
            });
            c.on('open', function () {
                connect(c);
                $('.overlay').hide();
            });
            c.on('error', function (err) {
                alert(err);
            });
            connectedPeers.push(c);
        }

        updateConnectedIDs();

    }); // end connect.on('click')

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

    peer.on('error', function (err) {
        console.error(err);
        switch(err.type) {
           case "browser-incompatible":
               $('#peeron-error-browser-incompatible').show();
               break;
           case "disconnected":
               $('#peeron-error-disconnected').show(); // todo
               break;
           case "invalid-id":
               $('#currentID').text("");
               $('#peeron-error-invalid-id').show();
               break;
           case "network":
               $('#peeron-error-network').show(); // todo
               break;
           case "peer-unavailable":
               removePeer(connectedPeers, $('#peerID').val());
               updateConnectedIDs();
               $('.overlay').hide();
               $('#peeron-error-peer-unavailable').show();
               break;
           case "server-error":
               $('#peeron-error-server-error').show(); // todo
               break;
           case "socket-error":
               $('#peeron-error-socket-error').show(); // todo
               break;
           case "socket-closed":
               $('#peeron-error-socket-closed').show(); // todo
               break;
           case "unavailable-id":
               $('#currentID').text("");
               $('#peeron-error-unavailable-id').show();
               break;
       }
    });

    // await connection from others
    peer.on('connection', connect);

    $('#currentID').text(peer.id);
}

function connect(c) {

    if (!isConnectedPeer(c.peer) && !isRequestedPeer(c.peer)) {
        requestedPeers.push(c);
    }

    c.on('data', function (data) {
        // change shared content if connection requested on both ends
        if (isConnectedPeer(c.peer))
            $('#shared').val(data);
    });

    c.on('close', function () {
        // TODO: remove our peer and connection on close
    });
} // end connect(c)

function isConnectedPeer(peer) {
    for (var i = 0; i < connectedPeers.length; i++) {
        if (connectedPeers[i].peer == peer)
            return true;
    }
    return false;
}

function isRequestedPeer(peer) {
    for (var i = 0; i < requestedPeers.length; i++) {
        if (requestedPeers[i].peer == peer)
            return true;
    }
    return false;
}

function movePeer(loc, dest, peer) {
    for (var i = 0; i < loc.length; i++) {
        if (loc[i].peer == peer) {
            dest.push(loc[i]);
            loc.splice(i, 1);
        }
    }
}

function removePeer(loc, peer) {
    for (var i = 0; i < loc.length; i++) {
        console.log(loc[i].peer);
        console.log(peer);
        if (loc[i].peer == peer) {
            console.log("splicing");
            loc.splice(i, 1);
            console.log(loc);
        }
    }
}

function updateConnectedIDs() {
    // update connected ids on ui
    $('#connectedIDs').text("");
    for (var i = 0; i < connectedPeers.length; i++) {
        if (i == 0) {
            $('#connectedIDs').append(connectedPeers[i].peer);
        } else {
            $('#connectedIDs').append(", " + connectedPeers[i].peer);
        }
    }
}

window.onunload = window.onbeforeunload = function (e) {
    if (!!peer && !peer.destroyed) {
        peer.destroy();
    }
};
