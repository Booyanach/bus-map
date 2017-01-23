describe('MapCtrl:', () => {
    let ctrl, stateService, $rootScope;

    beforeEach(angular.mock.module("app"));

    beforeEach(() => {
        angular.mock.inject((_$controller_, _$rootScope_, _stateService_) => {
            let scope = _$rootScope_.$new();
            stateService = _stateService_;
            $rootScope = _$rootScope_;
            ctrl = _$controller_('MapCtrl', {
                $scope: scope,
                stateService: _stateService_
            });
        });
    });

    it('should contain initial values', () => {
        expect(ctrl.maps).toEqual([
            'neighborhoods',
            'streets',
            'arteries',
            'freeways'
        ]);
        expect(ctrl.width).toBe("1250");
        expect(ctrl.height).toBe("940");
        expect(ctrl.routes).toEqual([undefined]);
    });

    // SVG tests to be done in the directive, since they affect the DOM

    describe('functionality:', () => {
        beforeEach(() => {
            stateService.state.selectedRoutes = ['foo', 'bar'];
            spyOn(stateService, 'getSelectedRoutes').and.callThrough();
        });
        it('calls getSelectedRoutes when the service state is updated', () => {
            $rootScope.$broadcast('state.selectedRoutes.updated');
            expect(stateService.getSelectedRoutes).toHaveBeenCalledWith();
            expect(ctrl.routes).toEqual(['foo', 'bar']);
        });
    })
});