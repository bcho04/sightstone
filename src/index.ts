import debug from 'debug';
import {
    RiotAPIModule, Tier, Division, Game,
    ValorantRegion, LeagueRegion, RiotRegion,
    LeagueQueue, ValorantQueue, DataDragonRegion,
} from './riot-api';
import { getConfig, validate, mergeWithDefaultConfig } from './galeforce/configs';
import { ConfigInterface } from './galeforce/interfaces/config';
import SubmoduleMap from './galeforce/interfaces/submodule-map';
import GetMatch from './galeforce/actions/lol/match/match';
import GetSummoner from './galeforce/actions/lol/summoner';
import GetThirdPartyCode from './galeforce/actions/lol/third-party-code';
import GetTimeline from './galeforce/actions/lol/match/timeline';
import GetMatchlist from './galeforce/actions/lol/match/matchlist';
import GetMasteryList from './galeforce/actions/lol/champion-mastery/by-summoner';
import GetLeagueEntries from './galeforce/actions/lol/league/entries';
import GetLeagueList from './galeforce/actions/lol/league/leagues';
import GetLeaguePlatformData from './galeforce/actions/lol/lol-status';
import GetChampionRotations from './galeforce/actions/lol/champion';
import GetClashPlayers from './galeforce/actions/lol/clash/players';
import GetClashTeam from './galeforce/actions/lol/clash/teams';
import GetClashTournament from './galeforce/actions/lol/clash/tournaments';
import GetCurrentGameInfo from './galeforce/actions/lol/spectator/active-games';
import GetFeaturedGames from './galeforce/actions/lol/spectator/featured-games';
import GetMasteryScore from './galeforce/actions/lol/champion-mastery/score';
import GetAccount from './galeforce/actions/riot/account/account';
import GetActiveShard from './galeforce/actions/riot/account/active-shard';
import PostTournamentCodes from './galeforce/actions/lol/tournament/create-codes';
import GetTournamentCodes from './galeforce/actions/lol/tournament/get-tournament-by-code';
import PutTournamentCodes from './galeforce/actions/lol/tournament/update-tournament';
import PostProviders from './galeforce/actions/lol/tournament/providers';
import PostTournaments from './galeforce/actions/lol/tournament/tournaments';
import GetLobbyEvents from './galeforce/actions/lol/tournament/lobby-events';
import GetUpcomingClashTournaments from './galeforce/actions/lol/clash/upcoming-tournaments';
import GetLorMatch from './galeforce/actions/lor/lor-match/match';
import GetLorMatchlist from './galeforce/actions/lor/lor-match/matchlist';
import GetLorRankedLeaderboard from './galeforce/actions/lor/lor-ranked/leaderboard';
import GetLorPlatformData from './galeforce/actions/lor/lor-status';
import GetTFTLeagueEntries from './galeforce/actions/tft/tft-league/entries';
import GetTFTLeagueList from './galeforce/actions/tft/tft-league/leagues';
import GetTFTMatch from './galeforce/actions/tft/tft-match/match';
import GetTFTMatchlist from './galeforce/actions/tft/tft-match/matchlist';
import GetTFTSummoner from './galeforce/actions/tft/tft-summoner';
import GetValorantContent from './galeforce/actions/valorant/val-content/contents';
import GetValorantMatch from './galeforce/actions/valorant/val-match/match';
import GetValorantMatchlist from './galeforce/actions/valorant/val-match/matchlist';
import GetValorantRecentMatches from './galeforce/actions/valorant/val-match/recent-matches';
import GetValorantRankedLeaderboard from './galeforce/actions/valorant/val-ranked/leaderboard';
import GetValorantPlatformData from './galeforce/actions/valorant/val-status';
import GetMasteryByChampion from './galeforce/actions/lol/champion-mastery/by-champion';
import GetDataDragonVersions from './galeforce/actions/data-dragon/versions';
import GetDataDragonRegionInfo from './galeforce/actions/data-dragon/regions';
import GetDataDragonLanguages from './galeforce/actions/data-dragon/languages';
import GetDataDragonChampionList from './galeforce/actions/data-dragon/champion-list';
import GetDataDragonChampionJSON from './galeforce/actions/data-dragon/champion';
import GetDataDragonSplashArt from './galeforce/actions/data-dragon/splash-art';
import GetDataDragonLoadingArt from './galeforce/actions/data-dragon/loading-art';
import GetDataDragonChampionSquareArt from './galeforce/actions/data-dragon/champion-square-art';
import GetDataDragonSpellArt from './galeforce/actions/data-dragon/spell-art';
import GetDataDragonItemList from './galeforce/actions/data-dragon/item-list';
import GetDataDragonItemArt from './galeforce/actions/data-dragon/item-art';
import GetDataDragonSummonerSpellList from './galeforce/actions/data-dragon/summoner-spell-list';
import GetDataDragonProfileIconArt from './galeforce/actions/data-dragon/profile-icon-art';
import GetDataDragonProfileIconList from './galeforce/actions/data-dragon/profile-icon-list';
import GetDataDragonMinimapArt from './galeforce/actions/data-dragon/minimap-art';
import GetDataDragonSpriteArt from './galeforce/actions/data-dragon/sprite-art';
import GetDataDragonScoreboardArt from './galeforce/actions/data-dragon/scoreboard-icon-art';
import GetDataDragonChampionPassiveArt from './galeforce/actions/data-dragon/champion-passive-art';
import GetDataDragonTail from './galeforce/actions/data-dragon/dragon-tail';
import GetGameClientSwagger from './galeforce/actions/game-client/swagger';
import GetGameClientOpenAPI from './galeforce/actions/game-client/open-api';
import GetLiveClientAllGameData from './galeforce/actions/game-client/live-client-data/all-game-data';
import GetLiveClientActivePlayer from './galeforce/actions/game-client/live-client-data/active-player';
import GetLiveClientActivePlayerName from './galeforce/actions/game-client/live-client-data/active-player-name';
import GetLiveClientActivePlayerAbilities from './galeforce/actions/game-client/live-client-data/active-player-abilities';
import GetLiveClientActivePlayerRunes from './galeforce/actions/game-client/live-client-data/active-player-runes';
import GetLiveClientPlayerList from './galeforce/actions/game-client/live-client-data/player-list';
import GetLiveClientPlayerScores from './galeforce/actions/game-client/live-client-data/player-scores';
import GetLiveClientPlayerSummonerSpells from './galeforce/actions/game-client/live-client-data/player-summoner-spells';
import GetLiveClientPlayerRunes from './galeforce/actions/game-client/live-client-data/player-runes';
import GetLiveClientPlayerItems from './galeforce/actions/game-client/live-client-data/player-items';
import GetLiveClientEvents from './galeforce/actions/game-client/live-client-data/events';
import GetLiveClientGameStats from './galeforce/actions/game-client/live-client-data/game-stats';
import * as DTO from './galeforce/interfaces/dto';
import RateLimiter from './galeforce/rate-limiters/rate-limiter';
import BottleneckRateLimiter from './galeforce/rate-limiters/bottleneck';
import NullRateLimiter from './galeforce/rate-limiters/null';

class Galeforce {
    /**
     * The configuration for the module instance. Can only be set
     * in the constructor.
     */
    readonly config: ConfigInterface;

    private submodules: SubmoduleMap;

    /**
     * Initializes the Galeforce module with a provided configuration object.
     * The configuration object is verified using a JSON schema generated from the
     * {@link ConfigInterface} interface.
     * @param options A JSON configuration object or a path to a valid YAML file.
     * @throws Will throw an Error if provided an invalid configuration file or object.
     */
    constructor(options: object | string = {}) {
        this.config = mergeWithDefaultConfig(typeof options === 'string' ? getConfig(options) : options);

        if (this.config.debug) {
            this.config.debug.forEach((module) => {
                const previouslyEnabled = debug.disable();
                debug.enable(`${previouslyEnabled},galeforce:${module}`);
            });
        }

        if (!validate(this.config)) throw new Error('[galeforce]: Invalid config provided (config failed JSON schema validation).');

        const RiotAPI: RiotAPIModule = new RiotAPIModule(this.config['riot-api']?.key || '');

        let rateLimiter: RateLimiter;

        if (this.config['rate-limit'].type === 'null') {
            rateLimiter = new NullRateLimiter(this.config['rate-limit']);
        } else if (this.config['rate-limit'].type === 'bottleneck') {
            rateLimiter = new BottleneckRateLimiter(this.config['rate-limit']);
        } else {
            throw new Error('[galeforce]: Invalid rate limiter type provided in config.');
        }

        this.submodules = { RiotAPI, RateLimiter: rateLimiter };
    }

    /**
     * Object containing actions corresponding to the `/lol` set of endpoints.
     */
    public lol = {
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lol/summoner/v4/summoners/by-account/{encryptedAccountId}`
         * - (**GET**) `/lol/summoner/v4/summoners/by-name/{summonerName}`
         * - (**GET**) `/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}`
         * - (**GET**) `/lol/summoner/v4/summoners/{encryptedSummonerId}`
         */
        summoner: (): GetSummoner => new GetSummoner(this.submodules),
        /**
         * Object containing actions corresponding to the `/lol/champion-mastery` set of endpoints.
         */
        mastery: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}`
             */
            list: (): GetMasteryList => new GetMasteryList(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}`
             */
            champion: (): GetMasteryByChampion => new GetMasteryByChampion(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}`
             */
            score: (): GetMasteryScore => new GetMasteryScore(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/lol/league` set of endpoints.
         */
        league: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/league/v4/entries/by-summoner/{encryptedSummonerId}`
             * - (**GET**) `/lol/league/v4/entries/{queue}/{tier}/{division}`
             */
            entries: (): GetLeagueEntries => new GetLeagueEntries(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/league/v4/challengerleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/grandmasterleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/masterleagues/by-queue/{queue}`
             * - (**GET**) `/lol/league/v4/entries/by-summoner/{encryptedSummonerId}`
             */
            league: (): GetLeagueList => new GetLeagueList(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/lol/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v5/matches/{matchId}`
             */
            match: (): GetMatch => new GetMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v5/matches/{matchId}/timeline`
             */
            timeline: (): GetTimeline => new GetTimeline(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/match/v5/matches/by-puuid/{puuid}/ids`
             */
            list: (): GetMatchlist => new GetMatchlist(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/lol/platform` set of endpoints.
         * This includes the **THIRD-PARTY-CODE-V4** and **CHAMPION-V3** API sections.
         */
        platform: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/platform/v4/third-party-code/by-summoner/{encryptedSummonerId}`
             */
            thirdPartyCode: (): GetThirdPartyCode => new GetThirdPartyCode(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**)  `/lol/platform/v3/champion-rotations`
             */
            championRotations: (): GetChampionRotations => new GetChampionRotations(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**)  `/lol/status/v4/platform-data`
         */
        status: (): GetLeaguePlatformData => new GetLeaguePlatformData(this.submodules),
        /**
         * Object containing actions corresponding to the `/lol/clash` set of endpoints.
         */
        clash: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/players/by-summoner/{summonerId}`
             */
            players: (): GetClashPlayers => new GetClashPlayers(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/teams/{teamId}`
             */
            team: (): GetClashTeam => new GetClashTeam(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/tournaments/by-team/{teamId}`
             * - (**GET**) `/lol/clash/v1/tournaments/{tournamentId}`
             */
            tournament: (): GetClashTournament => new GetClashTournament(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/clash/v1/tournaments`
             */
            upcoming: (): GetUpcomingClashTournaments => new GetUpcomingClashTournaments(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/lol/spectator` set of endpoints.
         */
        spectator: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}`
             */
            active: (): GetCurrentGameInfo => new GetCurrentGameInfo(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/spectator/v4/featured-games`
             */
            featured: (): GetFeaturedGames => new GetFeaturedGames(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/lol/tournament` set of endpoints.
         * Note that these endpoints require a tournament-approved **production** key to use.
         * Please visit [here](https://developer.riotgames.com) for more information.
         */
        tournament: {
            /**
             * Object containing actions corresponding to the `/lol/tournament/v4/codes` set of endpoints.
             */
            code: {
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**POST**) `/lol/tournament/v4/codes`
                 */
                create: (): PostTournamentCodes => new PostTournamentCodes(this.submodules),
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**GET**) `/lol/tournament/v4/codes/{tournamentCode}`
                 */
                get: (): GetTournamentCodes => new GetTournamentCodes(this.submodules),
                /**
                 * Action constructor corresponding to the following endpoints:
                 * - (**PUT**) `/lol/tournament/v4/codes/{tournamentCode}`
                 */
                update: (): PutTournamentCodes => new PutTournamentCodes(this.submodules),
            },
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lol/tournament/v4/lobby-events/by-code/{tournamentCode}`
             */
            event: (): GetLobbyEvents => new GetLobbyEvents(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**POST**) `/lol/tournament/v4/providers`
             */
            provider: (): PostProviders => new PostProviders(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**POST**) `/lol/tournament/v4/tournaments`
             */
            tournament: (): PostTournaments => new PostTournaments(this.submodules),
        },
    }

    /**
     * Object containing actions corresponding to the `/riot` set of endpoints.
     */
    public riot = {
        /**
         * Object containing actions corresponding to the `/riot/account` set of endpoints.
         */
        account: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/riot/account/v1/accounts/by-puuid/{puuid}`
             * - (**GET**) `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`
             */
            account: (): GetAccount => new GetAccount(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}`
             */
            activeShard: (): GetActiveShard => new GetActiveShard(this.submodules),
        },
    }

    /**
     * Object containing actions corresponding to the `/lor` set of endpoints.
     */
    public lor = {
        /**
         * Object containing actions corresponding to the `/lor/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/match/v1/matches/{matchId}`
             */
            match: (): GetLorMatch => new GetLorMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/match/v1/matches/by-puuid/{puuid}/ids`
             */
            list: (): GetLorMatchlist => new GetLorMatchlist(this.submodules),
        },
        ranked: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            leaderboard: (): GetLorRankedLeaderboard => new GetLorRankedLeaderboard(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lor/status/v1/platform-data`
         */
        status: (): GetLorPlatformData => new GetLorPlatformData(this.submodules),
    }

    /**
     * Object containing actions corresponding to the `/tft` set of endpoints.
     */
    public tft = {
        /**
         * Object containing actions corresponding to the `/tft/league` set of endpoints.
         */
        league: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/tft/league/v1/entries/by-summoner/{encryptedSummonerId}`
             * - (**GET**) `/tft/league/v1/entries/{tier}/{division}`
             */
            entries: (): GetTFTLeagueEntries => new GetTFTLeagueEntries(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/tft/league/v1/challenger`
             * - (**GET**) `/tft/league/v1/grandmaster`
             * - (**GET**) `/tft/league/v1/master`
             * - (**GET**) `/tft/league/v1/leagues/{leagueId} `
             */
            league: (): GetTFTLeagueList => new GetTFTLeagueList(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/tft/match` set of endpoints.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            match: (): GetTFTMatch => new GetTFTMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/lor/ranked/v1/leaderboards`
             */
            list: (): GetTFTMatchlist => new GetTFTMatchlist(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/lor/ranked/v1/leaderboards`
         */
        summoner: (): GetTFTSummoner => new GetTFTSummoner(this.submodules),
    }

    /**
     * Object containing actions corresponding to the `/val` set of endpoints.
     */
    public val = {
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/val/content/v1/contents`
         */
        content: (): GetValorantContent => new GetValorantContent(this.submodules),
        /**
         * Object containing actions corresponding to the `/val/match` set of endpoints.
         * Note that these endpoints require a Valorant-approved **production** key to use.
         * Please visit [here](https://developer.riotgames.com) for more information.
         */
        match: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/matches/{matchId}`
             */
            match: (): GetValorantMatch => new GetValorantMatch(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/matchlists/by-puuid/{puuid}`
             */
            list: (): GetValorantMatchlist => new GetValorantMatchlist(this.submodules),
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/match/v1/recent-matches/by-queue/{queue}`
             */
            recent: (): GetValorantRecentMatches => new GetValorantRecentMatches(this.submodules),
        },
        /**
         * Object containing actions corresponding to the `/val/ranked` set of endpoints.
         */
        ranked: {
            /**
             * Action constructor corresponding to the following endpoints:
             * - (**GET**) `/val/ranked/v1/leaderboards/by-act/{actId}`
             */
            leaderboard: (): GetValorantRankedLeaderboard => new GetValorantRankedLeaderboard(this.submodules),
        },
        /**
         * Action constructor corresponding to the following endpoints:
         * - (**GET**) `/val/status/v1/platform-data`
         */
        status: (): GetValorantPlatformData => new GetValorantPlatformData(this.submodules),
    }

    /**
     * Object containing actions corresponding to Data Dragon endpoints. See the official Data
     * Dragon documentation [here](https://developer.riotgames.com/docs/lol#data-dragon).
     */
    public ddragon = {
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/cdn/dragontail-{version}.tgz`
         *
         * Returns a compressed tarball (.tgz) file containing all Data Dragon assets
         * for a given patch. Note that Data Dragon is updated manually after each patch,
         * so it may not always be updated immediately after a new patch is released to
         * the live servers.
         *
         * Swaps to a *.zip* file automatically when fetching data for patch 10.10.5.
         *
         * Returns data as a `Buffer` object.
         */
        tail: (): GetDataDragonTail => new GetDataDragonTail(this.submodules),
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/api/versions.json`
         *
         * Returns a JSON file (an array) containing all valid Data Dragon versions.
         * Most patches will only have one associated build, but occasionally
         * multiple builds are necessary due to errors. As a result, use the latest
         * version for a given patch whenever possible.
         */
        versions: (): GetDataDragonVersions => new GetDataDragonVersions(this.submodules),
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/realms/{region}.json`
         *
         * Returns the latest Data Dragon version for a given region (realm). Note that
         * Data Dragon versions are *not* always equivalent to the League of Legends
         * client version within a given region.
         */
        realm: (): GetDataDragonRegionInfo => new GetDataDragonRegionInfo(this.submodules),
        /**
         * Action constructor corresponding to the following Data Dragon files:
         * - (**GET**) `/cdn/languages.json`
         *
         * Returns a list of languages supported by Data Dragon. See the official documentation
         * for more information.
         */
        languages: (): GetDataDragonLanguages => new GetDataDragonLanguages(this.submodules),
        /**
         *
         */
        champion: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/champion.json`
             *
             * Returns a list of champions along with a brief summary for each champion.
             * See the official API documentation for more information about interpreting spell text.
             */
            list: (): GetDataDragonChampionList => new GetDataDragonChampionList(this.submodules),
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/champion/{champion}.json`
             *
             * Returns detailed information and additional data about a single champion.
             * See the official API documentation for more information about interpreting spell text.
             */
            details: (): GetDataDragonChampionJSON => new GetDataDragonChampionJSON(this.submodules),
            art: {
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/img/champion/splash/{champion}_{skin}.jpg`
                 *
                 * Returns the splash art assets for a given champion and skin. The number corresponding
                 * to each skin can be found under the `num` field in the skins section of each champion's
                 * detailed Data Dragon file. `0` is always the default splash art.
                 *
                 * Returns data as a `Buffer` object containing JPG data.
                 */
                splash: (): GetDataDragonSplashArt => new GetDataDragonSplashArt(this.submodules),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/img/champion/loading/{champion}_{skin}.jpg`
                 *
                 * Returns the loading art image for a given champion and skin. The number corresponding
                 * to each skin can be found under the `num` field in the skins section of each champion's
                 * detailed Data Dragon file. `0` is always the default splash art.
                 *
                 * Returns data as a `Buffer` object containing JPG data.
                 */
                loading: (): GetDataDragonLoadingArt => new GetDataDragonLoadingArt(this.submodules),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/{version}/img/champion/{champion}.png`
                 *
                 * Returns the icon (square) art asset for a given champion.
                 *
                 * Returns data as a `Buffer` object containing PNG data.
                 */
                icon: (): GetDataDragonChampionSquareArt => new GetDataDragonChampionSquareArt(this.submodules),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/{version}/img/passive/{spell}.png`
                 *
                 * Returns the icon art asset for a passive ability. The filename for each champion's passive can be
                 * found in the `passive` field's `image` data (as the `full` field) within an individual champion's Data Dragon file.
                 *
                 * Returns data as a `Buffer` object containing PNG data.
                 */
                passive: (): GetDataDragonChampionPassiveArt => new GetDataDragonChampionPassiveArt(this.submodules),
            },
        },
        spell: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/spell/{spell}.png`
             *
             * Returns the art asset for a non-passive ability. The filename corresponding to a given ability can be
             * found in the `full` entry of the image data within the `spells` field of an individual champion's Data Dragon file.
             *
             * Returns data as a `Buffer` object containing PNG data.
             */
            art: (): GetDataDragonSpellArt => new GetDataDragonSpellArt(this.submodules),
        },
        item: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/item.json`
             *
             * Returns detailed information about all items in League of Legends, including purchase value, sell value,
             * build path, stats, and descriptions. See the official Data Dragon API documentation for more information.
             *
             */
            list: (): GetDataDragonItemList => new GetDataDragonItemList(this.submodules),
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/item/{assetId}.png`
             *
             * Returns the art asset for an item by item ID. A list of item IDs can be found in the item data file.
             *
             * Returns data as a `Buffer` object containing PNG data.
             */
            art: (): GetDataDragonItemArt => new GetDataDragonItemArt(this.submodules),
        },
        summonerSpell: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/summoner.json`
             *
             * Returns a list of summoner spells. Art assets for each summoner spell can be retrieved using the
             * `galeforce.ddragon.spell.art` method.
             */
            list: (): GetDataDragonSummonerSpellList => new GetDataDragonSummonerSpellList(this.submodules),
        },
        profileIcon: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/data/{locale}/profileicon.json`
             *
             * Returns a list of summoner icons/profile icons.
             */
            list: (): GetDataDragonProfileIconList => new GetDataDragonProfileIconList(this.submodules),
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/profileicon/{assetId}.png`
             *
             * Returns the art asset for a profile icon by ID.
             *
             * Returns data as a `Buffer` object containing PNG data.
             */
            art: (): GetDataDragonProfileIconArt => new GetDataDragonProfileIconArt(this.submodules),
        },
        minimap: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/map/map{assetId}.png`
             *
             * Returns the art asset for the minimap corresponding to a given map ID. Map IDs can be found
             * under *Game Constants > Map Names* in the official Riot API documentation.
             *
             * Returns data as a `Buffer` object containing PNG data.
             */
            art: (): GetDataDragonMinimapArt => new GetDataDragonMinimapArt(this.submodules),
        },
        sprite: {
            /**
             * Action constructor corresponding to the following Data Dragon files:
             * - (**GET**) `/cdn/{version}/img/sprite/spell{assetId}.png`
             *
             * Returns the sprite art assets for a given asset ID.
             *
             * Returns data as a `Buffer` object containing PNG data.
             */
            art: (): GetDataDragonSpriteArt => new GetDataDragonSpriteArt(this.submodules),
        },
        /**
         * Object containing actions that retrieve legacy scoreboard art (from patch **5.5.1** and earlier).
         */
        scoreboard: {
            /**
             * Object containing actions that retrieve legacy scoreboard art (from patch **5.5.1** and earlier).
             */
            art: {
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/champion.png`
                 *
                 * Returns data as a `Buffer` object.
                 */
                champion: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'champion'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/items.png`
                 *
                 * Returns data as a `Buffer` object.
                 */
                items: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'items'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/minion.png`
                 *
                 * Returns data as a `Buffer` object.
                 */
                minion: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'minion'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/score.png`
                 *
                 * Returns data as a `Buffer` object.
                 */
                score: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'score'),
                /**
                 * Action constructor corresponding to the following Data Dragon files:
                 * - (**GET**) `/cdn/5.5.1/img/ui/spells.png`
                 *
                 * Returns data as a `Buffer` object.
                 */
                spells: (): GetDataDragonScoreboardArt => new GetDataDragonScoreboardArt(this.submodules, 'spells'),
            },
        },
    }

    /**
     * Object containing actions corresponding to the Game Client API specifications.
     * This includes the Live Client Data and Replay endpoints, which are hosted
     * locally during a League of Legends match at https://127.0.0.1:2999.
     *
     * The Live Client Data API server is only active when playing a League of Legends match
     * or watching a replay.
     */
    public gc = {
        /**
         * Action constructor corresponding to the following Live Client Data endpoints:
         * - (**GET**) `/swagger/v2/swagger.json`
         *
         * Requests the *Swagger v2* specs for the Game Client API.
         */
        swagger: (): GetGameClientSwagger => new GetGameClientSwagger(this.submodules),
        /**
         * Action constructor corresponding to the following Live Client Data endpoints:
         * - (**GET**) `/swagger/v3/openapi.json`
         *
         * Requests the *OpenAPI v3* specs for the Game Client API.
         */
        openAPI: (): GetGameClientOpenAPI => new GetGameClientOpenAPI(this.submodules),
    }

    /**
     * Object containing actions corresponding to the Live Client Data endpoints.
     * The Live Client Data API is hosted locally during a League of Legends match
     * at https://127.0.0.1:2999. (All endpoints can be found under the *\/liveclientdata*
     * path.)
     *
     * The Live Client Data API server is only active when playing a League of Legends match
     * or watching a replay.
     */
    public lcd = {
        /**
         * Action constructor corresponding to the following Live Client Data endpoints:
         * - (**GET**) `/liveclientdata/allgamedata`
         *
         * Get all available data. You can find a sample response
         * [here](https://static.developer.riotgames.com/docs/lol/liveclientdata_sample.json).
         */
        all: (): GetLiveClientAllGameData => new GetLiveClientAllGameData(this.submodules),
        /**
         * Contains a list of endpoints that retrieve information about the active player.
         */
        active: {
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/activeplayer`
             *
             * Get all data about the active player.
             */
            player: (): GetLiveClientActivePlayer => new GetLiveClientActivePlayer(this.submodules),
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/activeplayername`
             *
             * Returns the player name.
             */
            name: (): GetLiveClientActivePlayerName => new GetLiveClientActivePlayerName(this.submodules),
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/activeplayerabilities`
             *
             * Get the abilities for the active player.
             */
            abilities: (): GetLiveClientActivePlayerAbilities => new GetLiveClientActivePlayerAbilities(this.submodules),
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/activeplayerrunes`
             *
             * Retrieve the full list of runes for the active player.
             */
            runes: (): GetLiveClientActivePlayerRunes => new GetLiveClientActivePlayerRunes(this.submodules),
        },
        /**
         * Contains a list of endpoints that retrieve information about any player in the game.
         */
        player: {
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/playerlist`
             *
             * Retrieve the list of players in the game and their stats.
             */
            list: (): GetLiveClientPlayerList => new GetLiveClientPlayerList(this.submodules),
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/playerscores`
             *
             * Retrieve the list of the current scores for the player.
             */
            scores: (): GetLiveClientPlayerScores => new GetLiveClientPlayerScores(this.submodules),
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/playersummonerspells`
             *
             * Retrieve the list of the summoner spells for the player.
             */
            summonerSpells: (): GetLiveClientPlayerSummonerSpells => new GetLiveClientPlayerSummonerSpells(this.submodules),
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/playermainrunes`
             *
             * Retrieve the basic runes of any player.
             */
            runes: (): GetLiveClientPlayerRunes => new GetLiveClientPlayerRunes(this.submodules),
            /**
             * Action constructor corresponding to the following Live Client Data endpoints:
             * - (**GET**) `/liveclientdata/playeritems`
             *
             * Retrieve the list of items for the player.
             */
            items: (): GetLiveClientPlayerItems => new GetLiveClientPlayerItems(this.submodules),
        },
        /**
         * Action constructor corresponding to the following Live Client Data endpoints:
         * - (**GET**) `/liveclientdata/eventdata`
         *
         * Get a list of events that have occurred in the game. You can find a list of sample events
         * [here](https://static.developer.riotgames.com/docs/lol/liveclientdata_events.json).
         */
        events: (): GetLiveClientEvents => new GetLiveClientEvents(this.submodules),
        /**
         * Action constructor corresponding to the following Live Client Data endpoints:
         * - (**GET**) `/liveclientdata/gamestats`
         *
         * Fetch basic data about the game.
         */
        stats: (): GetLiveClientGameStats => new GetLiveClientGameStats(this.submodules),
    };

    /**
     * Object containing enums corresponding to different API regions.
     */
    public regions = {
        lol: LeagueRegion,
        val: ValorantRegion,
        riot: RiotRegion,
        ddragon: DataDragonRegion,
    };

    /**
     * Object containing enums corresponding to different game queue types.
     */
    public queues = {
        lol: LeagueQueue,
        val: ValorantQueue,
    };

    /**
     * Enum corresponding to ranked tiers in TFT and League of Legends.
     */
    public tiers: typeof Tier = Tier;

    /**
     * Enum corresponding to ranked divisions in TFT and League of Legends.
     */
    public divisions: typeof Division = Division;

    /**
     * Enum corresponding to games for the
     * `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}` endpoint.
     */
    public games: typeof Game = Game;
}

declare namespace Galeforce {
    /**
     * An object containing all of the DTO interfaces associated with API responses for all endpoints.
     */
    export import dto = DTO;
}

export = Galeforce;
