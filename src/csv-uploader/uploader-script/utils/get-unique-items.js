
function getUniqueItems(items) {
    const uniqueItems = items.filter(
        (provider, index, self) =>
          index ===
          self.findIndex(
            (item) =>
              item.tier === provider.tier &&
              item.tierRank === provider.tierRank &&
              item.speciality === provider.speciality &&
              item.area === provider.area &&
              item.subSpeciality === provider.subSpeciality &&
              item.phoneNumber === provider.phoneNumber &&
              item.provider === provider.provider &&
              item.address === provider.address,
            // add more properties if needed
          ),
      );
      return uniqueItems
    }

    module.exports = getUniqueItems