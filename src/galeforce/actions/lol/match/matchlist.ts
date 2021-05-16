import Action from '../../action';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesPUUID, TakesQuery, TakesRegion } from '../../mixins';

type GetMatchlistQuery = {
    start?: number;
    count?: number;
}

const BaseAction = TakesPUUID(
    TakesQuery({} as GetMatchlistQuery,
        TakesRegion({} as RiotRegion,
            Action)),
);

export default class GetMatchlist extends BaseAction<string[]> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCHLIST;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}
