import * as d3 from 'd3';

describe('VehicleService:', () => {
    let vehicleService, $rootScope, callback;
    let data = {data: 'bar'};

    beforeEach(angular.mock.module("app"));

    beforeEach(angular.mock.inject((_$rootScope_, _vehicleService_) => {
        vehicleService = _vehicleService_;
        $rootScope = _$rootScope_;

        spyOn(d3, 'json').and.callFake((url, cb) => {
            cb(undefined, data);
        });

        callback = jasmine.createSpy(data => data);
    }));

    it('initial state', () => {
        expect(vehicleService.lastTime).toEqual(0);
    });

    it('retrieve', () => {
        spyOn($rootScope, '$broadcast');
        vehicleService.retrieve('foo', callback);
        expect(d3.json).toHaveBeenCalledWith(
            'http://webservices.nextbus.com/service/' +
            'publicJSONFeed?command=vehicleLocations&a=sf-muni&r=&t=0',
            jasmine.any(Function)
        );
        expect($rootScope.$broadcast).toHaveBeenCalledWith('vehicle.service.updated', data, 'foo');
    });
    it('retrieve, but no data, route is an object with a tag', () => {
        data = undefined;
        spyOn($rootScope, '$broadcast');
        vehicleService.retrieve({tag: 'foo'}, callback);
        expect(d3.json).toHaveBeenCalledWith(
            'http://webservices.nextbus.com/service/' +
            'publicJSONFeed?command=vehicleLocations&a=sf-muni&r=foo&t=0',
            jasmine.any(Function)
        );
        expect($rootScope.$broadcast).not.toHaveBeenCalled();
    });
});