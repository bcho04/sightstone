/*
    The TimelineDTO is an interface for timeline data returned from V4 endpoints.
*/

interface MatchPositionDTO {
    x: number;
    y: number;
}

enum MatchEventType {
    CHAMPION_KILL = 'CHAMPION_KILL',
    WARD_PLACED = 'WARD_PLACED',
    WARD_KILL = 'WARD_KILL',
    BUILDING_KILL = 'BUILDING_KILL',
    ELITE_MONSTER_KILL = 'ELITE_MONSTER_KILL',
    ITEM_PURCHASED = 'ITEM_PURCHASED',
    ITEM_SOLD = 'ITEM_SOLD',
    ITEM_DESTROYED = 'ITEM_DESTROYED',
    ITEM_UNDO = 'ITEM_UNDO',
    SKILL_LEVEL_UP = 'SKILL_LEVEL_UP',
    ASCENDED_EVENT = 'ASCENDED_EVENT',
    CAPTURE_POINT = 'CAPTURE_POINT',
    PORO_KING_SUMMON = 'PORO_KING_SUMMON',
}

interface MatchEventDTO {
    laneType?: string;
    skillSlot?: number;
    ascendedType?: string;
    creatorId?: number;
    afterId?: number;
    eventType?: string;
    type: MatchEventType;
    levelUpType?: string;
    wardType?: string;
    participantId?: number;
    towerType?: string;
    itemId?: number;
    beforeId?: number;
    pointCaptured?: string;
    monsterType?: string;
    monsterSubType?: string;
    teamId?: number;
    position?: MatchPositionDTO;
    killerId?: number;
    timestamp: number;
    assistingParticipants?: number[];
    buildingType?: string;
    victimId?: number;
}

interface MatchParticipantFrameDTO {
    participantId: number;
    minionsKilled: number;
    teamScore: number;
    dominionScore: number;
    totalGold: number;
    level: number;
    xp: number;
    currentGold: number;
    position: MatchPositionDTO;
    jungleMinionsKilled: number;
}

interface MatchFrameDTO {
    participantFrames: Record<string, MatchParticipantFrameDTO>;
    events: MatchEventDTO[];
    timestamp: number;
}

export interface MatchTimelineDTO {
    frames: MatchFrameDTO[];
    frameInterval: number;
}
