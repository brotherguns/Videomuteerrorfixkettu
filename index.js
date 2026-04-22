(function (exports, metro, patcher) {
    'use strict';

    const unpatchers = [];
    function onLoad() {
        // Bypass guild-level NSFW gate (18+ server verification prompt)
        const guildGate = metro.findByProps("shouldNSFWGateGuild", "isNSFWInvite");
        if (guildGate) {
            unpatchers.push(patcher.after("shouldNSFWGateGuild", guildGate, ()=>false));
            unpatchers.push(patcher.after("isNSFWInvite", guildGate, ()=>false));
        }
        // Bypass channel-level NSFW gate (age-restricted channel prompt)
        const channelGate = metro.findByProps("canViewPotentiallyNSFWChannel");
        if (channelGate) {
            unpatchers.push(patcher.after("canViewPotentiallyNSFWChannel", channelGate, ()=>true));
        }
    }
    function onUnload() {
        for (const up of unpatchers)up();
        unpatchers.length = 0;
    }

    exports.onLoad = onLoad;
    exports.onUnload = onUnload;

    return exports;

})({}, vendetta.metro, vendetta.patcher);
