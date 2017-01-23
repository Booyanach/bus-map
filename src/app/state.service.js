import * as d3 from 'd3';

export default class StateService {
    constructor($rootScope) {
        this.state = {
            routeList: [],
            selectedRoutes: []
        };
        this.$rootScope = $rootScope;

        this.retrieveRouteList();
    }

    retrieveRouteList() {
        d3.json(
            'http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni',
            (error, routeList) => {
                this.state.routeList = routeList.route;
                this.$rootScope.$apply(() => {
                    this.$rootScope.$broadcast('state.routeList.updated', this.state.routeList);
                });
            }
        )
    }

    getRouteList() {
        return this.state.routeList;
    }

    getSelectedRoutes() {
        return this.state.selectedRoutes;
    }

    getSelectedRouteTags() {
        return this.state.selectedRoutes.map(route => route.tag);
    }

    setRoute(tag) {
        // Show All
        if (tag === undefined) {
            this.state.selectedRoutes = [];
        } else {
            if (!!this.findRoute(this.state.selectedRoutes, tag)) {
                this.state.selectedRoutes = this.removeRoute(this.state.selectedRoutes, tag);
            } else {
                this.state.selectedRoutes.push(this.findRoute(this.state.routeList, tag));
            }
        }
        this.$rootScope.$broadcast('state.selectedRoutes.updated', this.state.selectedRoutes);
    }

    findRoute(target, tag) {
        return target.filter(a => {return a.tag === tag;})[0];
    }

    removeRoute(target, tag) {
        return target.filter(a => {return a.tag !== tag;});
    }
}

StateService.$inject = ['$rootScope'];