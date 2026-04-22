import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

const unpatchers: Array<() => void> = [];

export function onLoad() {
    // Bypass guild-level NSFW gate (18+ server verification prompt)
    const guildGate = findByProps("shouldNSFWGateGuild", "isNSFWInvite");
    if (guildGate) {
        unpatchers.push(after("shouldNSFWGateGuild", guildGate, () => false));
        unpatchers.push(after("isNSFWInvite", guildGate, () => false));
    }

    // Bypass channel-level NSFW gate (age-restricted channel prompt)
    const channelGate = findByProps("canViewPotentiallyNSFWChannel");
    if (channelGate) {
        unpatchers.push(after("canViewPotentiallyNSFWChannel", channelGate, () => true));
    }
}

export function onUnload() {
    for (const up of unpatchers) up();
    unpatchers.length = 0;
}
