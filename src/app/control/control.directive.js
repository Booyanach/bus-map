import './control.css';

let control = () => {
  return {
    template: require('./control.template.html'),
    controller: 'ControlCtrl',
    controllerAs: 'control'
  }
};

export default control;