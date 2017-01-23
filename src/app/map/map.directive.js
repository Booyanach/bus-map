import './map.css';

let map = () => {
  return {
    template: require('./map.template.html'),
    controller: 'MapCtrl',
    controllerAs: 'map'
  }
};

export default map;