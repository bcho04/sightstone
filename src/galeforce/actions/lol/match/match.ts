import Action from '../../action';
import { MatchDTO } from '../../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../../mixins';

const BaseAction = TakesMatchId(
    TakesRegion({} as RiotRegion,
        Action),
);

export default class GetMatch extends BaseAction<MatchDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.MATCH.MATCH_ID;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}
