import Action from '../../action';
import { MatchTimelineDTO } from '../../../interfaces/dto';
import { ENDPOINTS, RiotRegion } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import { TakesMatchId, TakesRegion } from '../../mixins';

const BaseAction = TakesMatchId(
    TakesRegion({} as RiotRegion,
        Action),
);

export default class GetTimeline extends BaseAction<MatchTimelineDTO> {
    constructor(submodules: SubmoduleMap) {
        super(submodules);
        this.payload.endpoint = ENDPOINTS.MATCH.TIMELINE;
        this.payload.type = 'riot';
        this.payload.method = 'GET';
    }
}
