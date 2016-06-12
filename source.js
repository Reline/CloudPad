var TogetherJSConfig_siteName = "CloudPad",
TogetherJSConfig_toolName = "Collaboration",
TogetherJSConfig_autoStart = true,
TogetherJSConfig_dontShowClicks = true,
TogetherJSConfig_suppressJoinConfirmation = true,
TogetherJSConfig_suppressInvite = true,
TogetherJSConfig_disableWebRTC = true,
TogetherJSConfig_ignoreMessages = true,
TogetherJSConfig_sharedContent = "";

$(document).ready(function() {
    TogetherJSConfig_sharedContent = document.getElementById('sharedContent').innerText;

    $('#sharedContent').on('change keyup paste', function () {
        TogetherJSConfig_sharedContent = $(this).val();
    });

    var target = document.getElementById('body');
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if ($(mutation.addedNodes.item(0)).attr('id') == 'togetherjs-container') {
                $(mutation.addedNodes.item(0)).hide();
                observer.disconnect();
            }
        });
    });
    var config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);

    $('#get-share-link').on('click', function () {
        $('#share-link').text($('.togetherjs-share-link')[0].value);
    });
});
