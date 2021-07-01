import UploadButton from './EditableList';

module.exports = {
  install: function (Vue, options) {
    Vue.component('EditableList', UploadButton);
  }
};