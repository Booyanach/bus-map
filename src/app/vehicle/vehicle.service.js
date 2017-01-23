import * as d3 from 'd3';

export default class VehicleService {
    constructor($rootScope) {
        this.$rootScope = $rootScope;
        this.lastTime = 0;
    }

    retrieve(route, callback) {
        let query = 'http://webservices.nextbus.com/service/publicJSONFeed?' +
        'command=vehicleLocations&' +
        'a=sf-muni&' +
        `r=${route && route.tag ? route.tag : ''}&t=${this.lastTime}`;

        d3.json(query, (error, vehicleData) => {
            if (vehicleData) {
                this.$rootScope.$apply(() => {
                    this.$rootScope.$broadcast('vehicle.service.updated', vehicleData, route);
                });
            }
        });
    }
}