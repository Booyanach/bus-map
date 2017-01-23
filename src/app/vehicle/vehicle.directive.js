import './vehicle.css';

let vehicle = () => {
  return {
    controller: 'VehicleCtrl',
    controllerAs: 'vehicle',
    scope: {
      routes: '=',
      projection: '='
    }
  }
};

export default vehicle;