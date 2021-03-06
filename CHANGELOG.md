# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

### [0.4.0] (2021-06-22)

#### Added

- Add significant rate limiting functionality using the **bottleneck** library
  - Support for a user-specified number of retry attempts after receiving *HTTP 429* errors
  - Automatic rate limiting with retry timing automatically determined based on response headers
  - New `max-concurrent` and `min-time` options for Riot API requests
- Setting multiple Action properties simultaneously from an object using **`.set()`**
  >
  > ```typescript
  > const summonerData = await galeforce.lol.summoner().set({
  >   region: galeforce.region.lol.NORTH_AMERICA,
  >   summonerName: 'name'
  >}).exec();
  > ```
- Expose the `Division`, `Tier`, `Game`, `Queue`, and `Region` enums directly via **`GaleforceModule.*`**
  > ```typescript
  > import GaleforceModule, { Region } from 'galeforce';
  > 
  > console.log(Region.lol.NORTH_AMERICA) // na1
  > ```
- Legends of Runeterra Data Dragon support under **`galeforce.lor.ddragon`**

#### Changed

- **[breaking]** Update the structure of the config object passed into the `GaleforceModule()` constructor
  - Now merges the provided configuration object with a default object

    ```javascript
    {
      'riot-api': {
          key: undefined,
      },
      'rate-limit': {
          type: 'bottleneck',
          cache: {
              type: 'internal',
              'key-id': 'galeforce',
              uri: undefined,
          },
          options: {
              intervals: {},
              'max-concurrent': null,
              'min-time': 0,
              'retry-count-after-429': 3,
          },
      },
      debug: [],
    }
    ```
- **[breaking]** Rename enums to have singular names
  - ~~`galeforce.regions`~~ &#8594; **`galeforce.region`**
  - ~~`galeforce.queues`~~ &#8594; **`galeforce.queue`**
  - ~~`galeforce.tiers`~~ &#8594; **`galeforce.tier`**
  - ~~`galeforce.divisions`~~ &#8594; **`galeforce.division`**
  - ~~`galeforce.games`~~ &#8594; **`galeforce.game`**
- Update the **`galeforce.region`** object to better represent available API regions
  - Add an `esports` routing value to associated Riot and Valorant region objects (check Riot documentation for endpoints where this is valid)
  - **[breaking]** Split off Legends of Runeterra request regions into their own **`galeforce.region.lor`** enum, which is now used in all `galeforce.lor.*` endpoints
- Update `galeforce:rate-limit` debugging output
- **[breaking]** Move existing League of Legends Data Dragon functionality from **`galeforce.ddragon`** to **`galeforce.lol.ddragon`**

### [0.3.0] (2021-05-03)

#### Added

- Live Client Data endpoint support under **`galeforce.lcd`**
- Game Client endpoint information using **`galeforce.gc.swagger()`** and **`galeforce.gc.openAPI()`**
- Support for an internal Javascript rate-limit cache using the **node-cache** library. (Use the *javascript* option in the `cache` section of your config.)
- DTO interfaces for TypeScript are now public-facing and can be accessed directly via **`GaleforceModule.dto`** or as another export:
  >
  > ```typescript
  > import GaleforceModule from 'galeforce';
  > 
  > const summonerData: GaleforceModule.dto.SummonerDTO = ... 
  > // get summoner data
  > ```

  > ```typescript
  > import GaleforceModule, { dto } from 'galeforce';
  > 
  > const summonerData: dto.SummonerDTO = ...
  > // get summoner data
  > ```
- Direct access to action URLs using the **`.URL()`** method
  >
  > ```typescript
  > const summonerURL = galeforce.lol.summoner().region(galeforce.regions.lol.NORTH_AMERICA).name('name').URL();
  > // https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/name
  > ```

#### Changed

- **[breaking]** Change the output of Data Dragon image and tarfile actions to a `Buffer` object.
  - Previous versions returned corrupted versions of the files which were unusable.
- Riot API keys are no longer required in the `GaleforceModule()` constructor, and the `options` parameter is now optional.

  > ```typescript
  > import GaleforceModule from 'galeforce';
  > 
  > const galeforce = new GaleforceModule(); // now OK, but requests requiring an API key will return a 401 Unauthorized error.
  > ```

### [0.2.0] (2021-01-30)

#### Added

- Debugging features for action, payload, riot-api, and rate-limit using the **debug** library.
- Full Data Dragon endpoint support under **`galeforce.ddragon`**.

#### Changed

- **[breaking]** Rename the ~~`galeforce.*.match.matchlist`~~ functions to **`galeforce.*.match.list`**.
- **[breaking]** Split ~~`galeforce.lol.mastery.summoner`~~ into **`galeforce.lol.mastery.champion`** and **`galeforce.lol.mastery.list`**.
- **[breaking]** Change CommonJS / `require()` import method to no longer allow `.default`.

### [0.1.1] (2021-01-23)

#### Changed

- Fix a major bug preventing the library from initializing properly on Node.js ≤ 13.

### [0.1.0] (2021-01-23)

#### Added

- Initial release.
