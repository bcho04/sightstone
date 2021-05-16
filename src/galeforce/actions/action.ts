/**
    The base Action class that all other composite actions should
    inherit from.
    @packageDocumentation
*/

import debug from 'debug';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { Payload, ModifiablePayload, CreatePayloadProxy } from './payload';
import SubmoduleMap from '../interfaces/submodule-map';
import Request from '../../riot-api/requests';

const actionDebug = debug('galeforce:action');

/**
 * @template TResult The return type of the Action.
 */
export default class Action<TResult> {
    protected submodules: SubmoduleMap;

    /**
     * The payload containing the data (endpoint, request type, parameters, etc.) related to the
     * associated Action. The type guards associated with setting certain properties of the payload
     * are checked at runtime and may throw errors when provided invalid values.
     */
    public payload: Payload;

    /**
     *
     * @param submodules The reference to the submodules ({@link RiotAPI}, {@link Cache}). Passed into the action.
     */
    constructor(submodules: SubmoduleMap) {
        this.submodules = submodules;
        this.payload = CreatePayloadProxy({
            _id: uuidv4(),
        });

        actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('initialize')}`);
    }

    /**
     * Sets multiple values in the Action payload simultaneously.
     *
     * @param payload The payload with which the Action's payload is overwritten
     * @returns The current Action (with the updated payload state).
     */
    public set(payload: ModifiablePayload): this {
        this.payload = { ...this.payload, ..._.pick(payload, Object.getOwnPropertyNames(this.payload)) };
        return this;
    }

    /**
     * Executes the action, sending an HTTP request to the Riot API servers
     * and retrieving the associated data from the appropriate endpoint.
     * @throws Will throw an error if a required payload value (*region*,
     * *body* on POST or PUT requests, etc.) is missing or the HTTP request
     * fails with an error.
     */
    public async exec(): Promise<TResult> {
        this.inferEndpoint();

        actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('execute')} \u00AB %O`, this.payload);
        try {
            if (typeof this.payload.endpoint === 'undefined') {
                throw new Error('[galeforce]: Action endpoint is required but undefined.');
            }
            if (typeof this.payload.method === 'undefined') {
                throw new Error('[galeforce]: Action method is required but undefined.');
            }

            // Execute-time property checks

            if (this.payload.gameName && !this.payload.tagLine) {
                throw new Error('[galeforce]: .gameName() must be chained with .tagLine().');
            }

            // Increment rate limit for non-Data Dragon requests.
            if (this.payload.type && ['lol', 'val', 'riot'].includes(this.payload.type) && typeof this.payload.region === 'undefined') {
                throw new Error('[galeforce]: Action payload region is required but undefined.');
            }

            let request: Request;
            if (this.payload.type === 'gc') {
                request = this.submodules.RiotAPI.gcRequest(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
            } else if (this.payload.type === 'ddragon-buffer') {
                request = this.submodules.RiotAPI.bufferRequest(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
            } else {
                request = this.submodules.RiotAPI.request(
                    this.payload.endpoint,
                    this.payload,
                    this.payload.query,
                    this.payload.body,
                );
            }

            let response: TResult;

            if (this.payload.method === 'GET') {
                response = (await this.submodules.RateLimiter.schedule(() => request.get(), this.payload.region)).data as TResult;
            } else if (this.payload.method === 'POST') {
                if (typeof this.payload.body === 'undefined') {
                    throw new Error('[galeforce]: Action payload body is required but undefined.');
                }
                response = (await this.submodules.RateLimiter.schedule(() => request.post(), this.payload.region)).data as TResult;
            } else if (this.payload.method === 'PUT') {
                if (typeof this.payload.body === 'undefined') {
                    throw new Error('[galeforce]: Action payload body is required but undefined.');
                }
                response = (await this.submodules.RateLimiter.schedule(() => request.put(), this.payload.region)).data as TResult;
            } else {
                throw new Error('[galeforce]: Invalid action method provided.');
            }

            actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.green(200)}`);
            return response;
        } catch (e) {
            if (e.response?.status) {
                actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.red(e.response.status)}`);
                if (e.response.status === 401) {
                    throw new Error('[galeforce]: No Riot API key was provided. Please ensure that your key is present in your configuration file or object. (401 Unauthorized)');
                } else if (e.response.status === 403) {
                    throw new Error('[galeforce]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (403 Forbidden)');
                } else {
                    throw new Error(`[galeforce]: Data fetch failed with status code ${e.response.status}`);
                }
            }

            actionDebug(`${chalk.bold.magenta(this.payload._id)} | ${chalk.bold.yellow('return')} \u00AB ${chalk.bold.red('error')}`);
            throw e;
        }
    }

    protected inferEndpoint(): void { /* Empty because this may be implemented by classes that inherit from Action */ }

    /**
     * Returns the **encoded** target URL for the action without executing an HTTP request.
     * Useful if the URL string is needed for custom actions outside the scope of the library.
     * @throws Will throw an error if a required payload value (*region*,
     * *body* on POST or PUT requests, etc.) is missing.
     */
    public URL(): string {
        this.inferEndpoint();

        if (typeof this.payload.endpoint === 'undefined') {
            throw new Error('[galeforce]: Action endpoint is required but undefined.');
        }

        const request = this.submodules.RiotAPI.request(
            this.payload.endpoint,
            this.payload,
            this.payload.query,
            this.payload.body,
        );

        return request.targetURL;
    }
}
