import * as d3 from 'd3';

export default class MapService {
    constructor() {}
    
    retrieve(map, callback) {
        d3.json('/maps/' + map + '.json', (error, mapData) => {
            if (mapData) {
                mapData.name = map;
                callback(mapData);
            }
            if(error) {
                console.error(error);
            }
        });
    }
};