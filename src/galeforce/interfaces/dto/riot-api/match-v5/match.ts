/*
    The MatchDTO is an interface for match data returned from V4 endpoints.
*/

enum Tier {
    CHALLENGER = 'CHALLENGER',
    MASTER = 'MASTER',
    DIAMOND = 'DIAMOND',
    PLATINUM = 'PLATINUM',
    GOLD = 'GOLD',
    SILVER = 'SILVER',
    BRONZE = 'BRONZE',
    UNRANKED = 'UNRANKED',
}

enum Team {
    BLUE = 100,
    RED = 200,
}

enum MatchResult {
    WIN = 'Win',
    LOSS = 'Fail',
}

enum Role {
    DUO = 'DUO',
    NONE = 'NONE',
    SOLO = 'SOLO',
    DUO_CARRY = 'DUO_CARRY',
    DUO_SUPPORT = 'DUO_SUPPORT',
}

enum Lane {
    MID = 'MID', // legacy/deprecated
    MIDDLE = 'MIDDLE',
    TOP = 'TOP',
    JUNGLE = 'JUNGLE',
    BOT = 'BOT', // legacy/deprecated
    BOTTOM = 'BOTTOM'
}

interface MatchPlayerDTO { // Originally PlayerDTO
    profileIcon: number;
    accountId: string;
    matchHistoryUri: string;
    currentAccountId: string;
    currentPlatformId: string;
    summonerName: string;
    summonerId: string;
    platformId: string;
}

interface ParticipantIdentityDTO {
    participantId: number;
    player?: MatchPlayerDTO;
}

interface TeamBansDTO {
    championId: number;
    pickTurn: number;
}

interface TeamStatsDTO {
    towerKills: number;
    riftHeraldKills: number;
    firstBlood: boolean;
    inhibitorKills: number;
    bans: TeamBansDTO[];
    firstBaron: boolean;
    firstDragon: boolean;
    dominionVictoryScore: number;
    dragonKills: number;
    baronKills: number;
    firstInhibitor: boolean;
    firstTower: boolean;
    vilemawKills: number;
    firstRiftHerald: boolean;
    teamId: Team; // number, but only two legal values
    win: MatchResult; // string, but only two legal values
}

interface RuneDTO {
    runeId: number;
    rank: number;
}

interface ParticipantStatsDTO {
    item0: number;
    item2: number;
    totalUnitsHealed: number;
    item1: number;
    largestMultiKill: number;
    goldEarned: number;
    firstInhibitorKill: boolean;
    physicalDamageTaken: number;
    nodeNeutralizeAssist?: number;
    totalPlayerScore: number;
    champLevel: number;
    damageDealtToObjectives: number;
    totalDamageTaken: number;
    neutralMinionsKilled: number;
    deaths: number;
    tripleKills: number;
    magicDamageDealtToChampions: number;
    wardsKilled: number;
    pentaKills: number;
    damageSelfMitigated: number;
    largestCriticalStrike: number;
    nodeNeutralize?: number;
    totalTimeCrowdControlDealt: number;
    firstTowerKill: boolean;
    magicDamageDealt: number;
    totalScoreRank: number;
    nodeCapture?: number;
    wardsPlaced: number;
    totalDamageDealt: number;
    timeCCingOthers: number;
    magicalDamageTaken: number;
    largestKillingSpree: number;
    totalDamageDealtToChampions: number;
    physicalDamageDealtToChampions: number;
    neutralMinionsKilledTeamJungle: number;
    totalMinionsKilled: number;
    firstInhibitorAssist: boolean;
    visionWardsBoughtInGame: number;
    objectivePlayerScore: number;
    kills: number;
    firstTowerAssist: boolean;
    combatPlayerScore: number;
    inhibitorKills: number;
    turretKills: number;
    participantId: number;
    trueDamageTaken: number;
    firstBloodAssist: boolean;
    nodeCaptureAssist?: number;
    assists: number;
    teamObjective?: number;
    altarsNeutralized?: number;
    goldSpent: number;
    damageDealtToTurrets: number;
    altarsCaptured?: number;
    win: boolean;
    totalHeal: number;
    unrealKills: number;
    visionScore: number;
    physicalDamageDealt: number;
    firstBloodKill: boolean;
    longestTimeSpentLiving: number;
    killingSprees: number;
    sightWardsBoughtInGame: number;
    trueDamageDealtToChampions: number;
    neutralMinionsKilledEnemyJungle: number;
    doubleKills: number;
    trueDamageDealt: number;
    quadraKills: number;
    item4: number;
    item3: number;
    item6: number;
    item5: number;
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    perk0: number;
    perk0Var1: number;
    perk0Var2: number;
    perk0Var3: number;
    perk1: number;
    perk1Var1: number;
    perk1Var2: number;
    perk1Var3: number;
    perk2: number;
    perk2Var1: number;
    perk2Var2: number;
    perk2Var3: number;
    perk3: number;
    perk3Var1: number;
    perk3Var2: number;
    perk3Var3: number;
    perk4: number;
    perk4Var1: number;
    perk4Var2: number;
    perk4Var3: number;
    perk5: number;
    perk5Var1: number;
    perk5Var2: number;
    perk5Var3: number;
    perkPrimaryStyle: number;
    perkSubStyle: number;
    statPerk0: number;
    statPerk1: number;
    statPerk2: number;
}

interface ParticipantTimelineDTO {
    participantId: number;
    csDiffPerMinDeltas: Record<string, number>;
    damageTakenPerMinDeltas: Record<string, number>;
    role: Role;
    damageTakenDiffPerMinDeltas: Record<string, number>;
    xpPerMinDeltas: Record<string, number>;
    xpDiffPerMinDeltas: Record<string, number>;
    lane: Lane;
    creepsPerMinDeltas: Record<string, number>;
    goldPerMinDeltas: Record<string, number>;
}

interface MasteryDTO {
    rank: number;
    masteryId: number;
}

interface ParticipantDTO {
    participantId: number;
    championId: number;
    runes?: RuneDTO[];
    stats: ParticipantStatsDTO;
    teamId: Team; // number, but only two legal values
    timeline: ParticipantTimelineDTO;
    summoner1Id: number;
    summoner2Id: number;
    highestAchievedSeasonTier?: Tier;
    masteries?: MasteryDTO;
}

interface MatchInfoDTO {
    gameId: number;
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participantIdentities: ParticipantIdentityDTO[];
    participants: ParticipantDTO[];
    platformId: string;
    queueId: number;
    teams: TeamStatsDTO[];
}

interface MatchMetadataDTO {
    dataVersion: string;
    matchId: string;
    participants: string[];
}

export interface MatchDTO {
    metadata: MatchMetadataDTO;
    info: MatchInfoDTO;
}
