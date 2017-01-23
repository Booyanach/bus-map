import * as d3 from 'd3';

describe('StateService:', () => {
    let stateService, $rootScope;
    let routeList = [{tag: 'foo'}, {tag: 'bar'}];

    beforeEach(angular.mock.module("app"));

    beforeEach(angular.mock.inject((_$rootScope_, _stateService_) => {
        stateService = _stateService_;
        $rootScope = _$rootScope_;

        spyOn(d3, 'json').and.callFake((url, cb) => {
            cb(undefined, routeList);
        });
    }));

    it('initial state', () => {
        expect(stateService.state).toEqual({
            routeList: [],
            selectedRoutes: []
        })
    });

    it('retrieveRouteList', () => {
        spyOn($rootScope, '$broadcast');
        stateService.retrieveRouteList();
        expect(d3.json).toHaveBeenCalledWith(
            'http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni',
            jasmine.any(Function)
        );
        expect($rootScope.$broadcast).toHaveBeenCalledWith(
            'state.routeList.updated', stateService.routeList
        );

        //Not enough time to go around trying to properly mock the http request
    });

    describe('with data', () => {
        beforeEach(() => {
            stateService.state.routeList = [{tag: 'foo'}, {tag: 'bar'}];
        });
        it('getRouteList returns the routeList', () => {
            expect(stateService.getRouteList()).toEqual(stateService.state.routeList);
        });
        it('getSelectedRoutes returns whatever routes are selected', () => {
            let selectedRoutes = [stateService.state.routeList[0]];
            expect(stateService.getSelectedRoutes()).toEqual([]);
            stateService.state.selectedRoutes = selectedRoutes;
            expect(stateService.getSelectedRoutes()).toEqual(selectedRoutes);
        });
        it('getSelectedRouteTags returns the tags of whichever routes are selected', () => {
            let selectedRoutes = [stateService.state.routeList[0]];
            expect(stateService.getSelectedRouteTags()).toEqual([]);
            stateService.state.selectedRoutes = selectedRoutes;
            expect(stateService.getSelectedRouteTags()).toEqual(['foo']);
        });

        describe('setRoute', () => {
            it('sets a route as selected if it isnt set already', () => {
                let selectedRoutes = [stateService.state.routeList[0]];
                expect(stateService.state.selectedRoutes).toEqual([]);

                spyOn($rootScope, '$broadcast').and.callThrough();

                stateService.setRoute('foo');
                expect($rootScope.$broadcast).toHaveBeenCalledWith(
                    'state.selectedRoutes.updated', selectedRoutes
                );
                expect(stateService.state.selectedRoutes).toEqual(selectedRoutes);
            });
            it('clears selectedRoutes if tag is undefined', () => {
                let selectedRoutes = [stateService.state.routeList[0]];
                stateService.state.selectedRoutes = selectedRoutes;

                expect(stateService.state.selectedRoutes).toEqual(selectedRoutes);

                spyOn($rootScope, '$broadcast').and.callThrough();

                stateService.setRoute();
                expect($rootScope.$broadcast).toHaveBeenCalledWith(
                    'state.selectedRoutes.updated', []
                );
                expect(stateService.state.selectedRoutes).toEqual([]);
            });
            it('removes a route if already set', () => {
                let selectedRoutes = [stateService.state.routeList[0]];
                stateService.state.selectedRoutes = selectedRoutes;

                expect(stateService.state.selectedRoutes).toEqual(selectedRoutes);

                spyOn($rootScope, '$broadcast').and.callThrough();

                stateService.setRoute('foo');
                expect($rootScope.$broadcast).toHaveBeenCalledWith(
                    'state.selectedRoutes.updated', []
                );
                expect(stateService.state.selectedRoutes).toEqual([]);
            });
        });
        it('findRoute checks if a route exists and then returns it', () => {
            let route = stateService.findRoute(stateService.state.routeList, 'foo');
            expect(route).toEqual(stateService.state.routeList[0]);
        });
        it('removeRoute removes a route', () => {
            stateService.state.selectedRoutes = [].concat(stateService.state.routeList);
            let removed = stateService.removeRoute(stateService.state.selectedRoutes, 'foo');
            expect(removed).toEqual([stateService.state.routeList[1]]);
        });
    })
});