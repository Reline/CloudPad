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
    console.log(TogetherJSConfig_sharedContent);

    $('#sharedContent').on('change keyup paste', function () {
        TogetherJSConfig_sharedContent = $(this).val();
    });
});
