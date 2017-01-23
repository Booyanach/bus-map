import * as d3 from 'd3';

describe('MapService:', () => {
    let mapService, $httpBackend, callbackSpy;
    let data = {data: 'bar'};

    beforeEach(angular.mock.module("app"));

    beforeEach(angular.mock.inject((_mapService_) => {
        mapService = _mapService_;

        spyOn(d3, 'json').and.callFake((url, cb) => {
            cb(undefined, data);
        });
        callbackSpy = jasmine.createSpy(data => data);
    }));

    it('retrieve', () => {
        mapService.retrieve("foo", callbackSpy);
        expect(d3.json).toHaveBeenCalledWith('./maps/foo.json', jasmine.any(Function));
        expect(callbackSpy).toHaveBeenCalledWith(data);
    });
});