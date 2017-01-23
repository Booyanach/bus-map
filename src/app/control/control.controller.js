export default class ControlController {
    constructor($scope, stateService) {
        this.stateService = stateService;
        this.routeList = [];

        this.showAll = [{
            tag: undefined,
            title: 'Show All',
            color: 'FFFFFF'
        }];

        $scope.$on('state.routeList.updated', () => {
            this.routeList = this.showAll.concat(stateService.getRouteList());
        })
    }

    selectRoute(tag) {
        this.stateService.setRoute(tag);
    }

    checkSelected(tag) {
        return this.stateService.getSelectedRouteTags().indexOf(tag) > -1;
    }
}

ControlController.$inject = ['$scope', 'stateService'];