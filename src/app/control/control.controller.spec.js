describe('ControlCtrl:', () => {
    let ctrl, $scope, stateService, $rootScope;

    beforeEach(angular.mock.module("app"));

    beforeEach(() => {
        angular.mock.inject((_$controller_, _$rootScope_, _stateService_) => {
            $scope = _$rootScope_.$new();
            stateService = _stateService_;
            $rootScope = _$rootScope_;
            ctrl = _$controller_('ControlCtrl', {
                $scope: $scope,
                stateService: _stateService_
            });
        });
    });

    it('should contain initial values', () => {
        expect(ctrl.routeList).toEqual([]);
        expect(ctrl.showAll).toEqual([{
            tag: undefined,
            title: 'Show All',
            color: 'FFFFFF'
        }]);
    });

    // SVG tests to be done in the directive, since they affect the DOM

    describe('functionality:', () => {
        let routeList = [{tag: 'foo'}, {tag: 'bar'}];
        beforeEach(() => {
            stateService.state.routeList = routeList;
            spyOn(stateService, 'getSelectedRouteTags').and.callThrough();
            spyOn(stateService, 'getRouteList').and.callThrough();
        });
        it('calls getRouteList when the service state is updated', () => {
            $rootScope.$broadcast('state.routeList.updated');
            expect(stateService.getRouteList).toHaveBeenCalledWith();
            $scope.$digest();
            expect(ctrl.routeList).toEqual(ctrl.showAll.concat(routeList));
        });
        it('selectRoute sets the route in the stateService', () => {
            ctrl.selectRoute('foo');
            ctrl.selectRoute('bar');
            expect(stateService.getSelectedRouteTags()).toEqual(['foo', 'bar']);
        });
        it('checkSelected returns true if a route is selected, false if not', () => {
            ctrl.selectRoute('foo');
            expect(ctrl.checkSelected("foo")).toBe(true);
            expect(ctrl.checkSelected("moo")).toBe(false);
        });
    })
});