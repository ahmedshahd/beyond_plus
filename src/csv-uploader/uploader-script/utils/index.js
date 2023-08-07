const getOrCreateCountry = require('./upsert-country')
const getOrCreateTpa = require('./upsert-tpa');
const getOrCreateInsuranceCompany = require('./upsert-insurance-company');
const deleteInsuranceCompany = require('./delete-insurance-company');
const getOrCreateCategory = require('./upsert-category');
const getOrCreateCity = require('./upsert-city');
const getOrCreateArea = require('./upsert-area');
const getOrCreateProviderType = require('./upsert-provider-type');
const getOrCreateSpeciality = require('./upsert-speciality');
const getOrCreateSubSpeciality = require('./upsert-sub-speciality');
const getOrCreateProvider = require('./upsert-provider');
const getUniqueItems = require('./get-unique-items');

module.exports = {
  getOrCreateCountry,
  getOrCreateTpa,
  getOrCreateInsuranceCompany,
  deleteInsuranceCompany,
  getOrCreateCategory,
  getOrCreateCity,
  getOrCreateArea,
  getOrCreateProviderType,
  getOrCreateSpeciality,
  getOrCreateSubSpeciality,
  getOrCreateProvider,
  getUniqueItems,
};
