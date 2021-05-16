const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TJS = require('typescript-json-schema');
const { resolve } = require('path');
const Ajv = require('ajv').default;

chai.use(chaiAsPromised);
const { expect } = chai;

const program = TJS.getProgramFromFiles([resolve('./src/galeforce/interfaces/dto.ts')]);
const generator = TJS.buildGenerator(program, { required: true });

const ajv = new Ajv();

describe('/galeforce/interfaces', () => {
    describe('DTO verification (using JSON schema)', () => {
        describe('SummonerDTO', () => {
            it('should match with /lol/summoner/v4/summoners JSON data', () => {
                const schema = generator.getSchemaForSymbol('SummonerDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.summoner.by-name.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /lol/tft-summoner/v1/summoners JSON data', () => {
                const schema = generator.getSchemaForSymbol('SummonerDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.tft-summoner.by-name.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('MatchDTO', () => {
            it('should match with /lol/match/v5/matches/{matchId} JSON data', () => {
                const schema = generator.getSchemaForSymbol('MatchDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v5.match.match.by-match.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('MatchTimelineDTO', () => {
            it('should match with /lol/match/v5/matches/{matchId}/timeline JSON data', () => {
                const schema = generator.getSchemaForSymbol('MatchTimelineDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v5.match.timeline.by-match.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LeagueEntryDTO', () => {
            it('should match with /lol/league/v4/entries/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueEntryDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.league.entries.by-summoner-id.json')[0]);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /lol/league/v4/entries/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueEntryDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.tft-league.entries.by-summoner-id.json')[0]);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LeagueListDTO', () => {
            it('should match with /lol/league/v4/challengerleagues/by-queue/{queue} JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueListDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.league.challenger.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /tft/league/v1/challenger JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueListDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.tft-league.challenger.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ChampionMasteryDTO', () => {
            it('should match with /lol/champion-mastery/v4/champion-masteries/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('ChampionMasteryDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.champion-mastery.by-summoner.json')[0]);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('PlatformDataDTO', () => {
            const schema = generator.getSchemaForSymbol('PlatformDataDTO');
            // Manually edit schema to match interface
            schema.definitions.StatusDTO.properties.maintenance_status.type = ['string', 'null'];
            schema.definitions.StatusDTO.properties.maintenance_status.enum.push(null);
            schema.definitions.StatusDTO.properties.archive_at.type = ['string', 'null'];
            schema.definitions.StatusDTO.properties.updated_at.type = ['string', 'null'];

            it('should match with /lol/status/v4/platform-data JSON data', () => {
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.lol-status.platform-data.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /lor/status/v1/platform-data JSON data', () => {
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.lor-status.platform-data.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /val/status/v1/platform-data JSON data', () => {
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.val-status.platform-data.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ChampionInfoDTO', () => {
            it('should match with /lol/platform/v3/champion-rotations JSON data', () => {
                const schema = generator.getSchemaForSymbol('ChampionInfoDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v3.champion.champion-rotations.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('PlayerDTO', () => {
            it('should match with /lol/clash/v1/players/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('PlayerDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.clash.players.json')[0]);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TeamDTO', () => {
            it('should match with /lol/clash/v1/teams JSON data', () => {
                const schema = generator.getSchemaForSymbol('TeamDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.clash.teams.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TournamentDTO', () => {
            it('should match with /lol/clash/v1/tournaments JSON data', () => {
                const schema = generator.getSchemaForSymbol('TournamentDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.clash.tournaments.all.json')[0]);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('CurrentGameInfoDTO', () => {
            it('should match with /lol/spectator/v4/active-games/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('CurrentGameInfoDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.spectator.active.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('FeaturedGamesDTO', () => {
            it('should match with /lol/spectator/v4/featured-games JSON data', () => {
                const schema = generator.getSchemaForSymbol('FeaturedGamesDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.spectator.featured.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('AccountDTO', () => {
            it('should match with /riot/account/v1/accounts JSON data', () => {
                const schema = generator.getSchemaForSymbol('AccountDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.account.accounts.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ActiveShardDTO', () => {
            it('should match with /riot/account/v1/active-shards JSON data', () => {
                const schema = generator.getSchemaForSymbol('ActiveShardDTO');
                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.account.active-shards.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LobbyEventDTOWrapper', () => {
            it('should match with /lol/tournament/v4/lobby-events/by-code JSON data', () => {
                const schema = generator.getSchemaForSymbol('LobbyEventDTOWrapper');
                schema.definitions.LobbyEventDTO.properties.summonerId.type = ['string', 'null']; // Override schema type

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.tournament.lobby-events.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TournamentCodeDTO', () => {
            it('should match with /lol/tournament/v4/codes/{tournamentCode} JSON data', () => {
                const schema = generator.getSchemaForSymbol('TournamentCodeDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v4.tournament.codes.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LorMatchDTO', () => {
            it('should match with /lor/match/v1/matches/{matchId} JSON data', () => {
                const schema = generator.getSchemaForSymbol('LorMatchDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.lor-match.match.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LorLeaderboardDTO', () => {
            it('should match with /lor/ranked/v1/leaderboards JSON data', () => {
                const schema = generator.getSchemaForSymbol('LorLeaderboardDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.lor-ranked.leaderboards.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TFTMatchDTO', () => {
            it('should match with /tft/match/v1/matches/{matchId} JSON data', () => {
                const schema = generator.getSchemaForSymbol('TFTMatchDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.tft-match.match.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ValContentDTO', () => {
            it('should match with /val/content/v1/contents JSON data', () => {
                const schema = generator.getSchemaForSymbol('ValContentDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.val-content.contents.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /val/content/v1/contents?locale JSON data', () => {
                const schema = generator.getSchemaForSymbol('ValContentDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.val-content.locale.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ValLeaderboardDTO', () => {
            it('should match with /val/ranked/v1/leaderboards/by-act JSON data', () => {
                const schema = generator.getSchemaForSymbol('ValLeaderboardDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/v1.val-ranked.leaderboards.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('DataDragonRegionDTO', () => {
            it('should match with Data Dragon region JSON data', () => {
                const schema = generator.getSchemaForSymbol('DataDragonRegionDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/ddragon.region.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('DataDragonChampionListDTO', () => {
            it('should match with Data Dragon region JSON data', () => {
                const schema = generator.getSchemaForSymbol('DataDragonChampionListDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/ddragon.champion.list.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('DataDragonChampionDTO', () => {
            it('should match with Data Dragon region JSON data', () => {
                const schema = generator.getSchemaForSymbol('DataDragonChampionDTO');
                schema.definitions.Spell
                    .properties.effect.items = { anyOf: [{ type: 'null' }, { type: 'array', items: { type: 'number' } }] }; // Override schema type to match interface
                schema.definitions.Spell
                    .properties.effectBurn.items.type = ['string', 'null']; // Override schema type to match interface

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/ddragon.champion.details.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('DataDragonItemListDTO', () => {
            it('should match with Data Dragon region JSON data', () => {
                const schema = generator.getSchemaForSymbol('DataDragonItemListDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/ddragon.item.list.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('DataDragonSummonerSpellListDTO', () => {
            it('should match with Data Dragon region JSON data', () => {
                const schema = generator.getSchemaForSymbol('DataDragonSummonerSpellListDTO');
                schema.definitions.Data_2.additionalProperties
                    .properties.effect.items = { anyOf: [{ type: 'null' }, { type: 'array', items: { type: 'number' } }] }; // Override schema type to match interface
                schema.definitions.Data_2.additionalProperties
                    .properties.effectBurn.items.type = ['string', 'null']; // Override schema type to match interface

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/ddragon.summoner-spells.list.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('DataDragonProfileIconListDTO', () => {
            it('should match with Data Dragon region JSON data', () => {
                const schema = generator.getSchemaForSymbol('DataDragonProfileIconListDTO');

                const validate = ajv.compile(schema);
                const valid = validate(require('./test-data/ddragon.profile-icon.list.json'));
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });

        const liveClientData = require('./test-data/liveclientdata.json');
        describe('LiveClientAbilitiesDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientAbilitiesDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.activePlayer.abilities);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientActivePlayerDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientActivePlayerDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.activePlayer);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientAllGameDataDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientAllGameDataDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientPlayerDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientPlayerDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.allPlayers[0]);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientEventsDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientEventsDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.events);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientGameStatsDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientGameStatsDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.gameData);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientItemDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientItemDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.allPlayers[0].items[0]);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientScoreDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientScoreDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.allPlayers[0].scores);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientFullRunesDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientFullRunesDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.activePlayer.fullRunes);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientMainRunesDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientMainRunesDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.allPlayers[0].runes);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LiveClientSummonerSpellsDTO', () => {
            it('should match with Live Client JSON data', () => {
                const schema = generator.getSchemaForSymbol('LiveClientSummonerSpellsDTO');

                const validate = ajv.compile(schema);
                const valid = validate(liveClientData.allPlayers[0].summonerSpells);
                if (!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
    });
});
