module.exports = {
  moduleNameMapper: {
    'Helpers/(.*)': '<rootDir>/app/helpers/$1',
    Components: '<rootDir>/app/components/index',
    Contexts: '<rootDir>/app/components/index',
    Actions: '<rootDir>/app/redux/actions/index',
    API: '<rootDir>/app/api/$1',
  },
};
