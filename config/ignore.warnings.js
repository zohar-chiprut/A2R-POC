exports.ignoreWarnings = [
  // /**
  //  * Critical dependency
  //  * ------------------
  //  * import of all typescript.js to the bundle caused by name import from typescript.js
  //  */
  // /Critical dependency/,
  // /**
  //  * There are multiple..
  //  * -------------------
  //  * import differs from filename in case sensitive.
  //  * ../components/.. instead of ../Components/..
  //  */
  // /There are multiple modules with names that only differ in casing/,
  // /**
  //  * ..mixed support
  //  * ---------------
  //  * css warnings, advise to better approach in the warning.
  //  */
  // /start value has mixed support, consider using flex-start instead/,
  // /end value has mixed support, consider using flex-end instead/,
  // /**
  //  * Following warnnings caused by name import that not exist as an export in the target imported module
  //  * For example debtPaymentContactUs in debtPayment.js is useless imported (dead-code) from debtPaymentBlockSlice.
  //  * In debtPaymentBlockSlice it is not exported.
  //  */
  // /export 'debtPaymentContactUs'/,
  // /export 'handleStepAsync'/,
  // /export 'stepParams'/,
  // /export 'setDateToPickUp'/,
  // /export 'changeFormHandler'/,
  // /export 'validateFormHandler'/,
  // /export 'showAppLoader'/,
  // /export 'hideAppLoader'/,
  // /export 'moveToNextStep'/,
  // /export 'setShowPopup'/,
  // /export 'prepareMoving'/,
  // /export 'setEmailChange'/,
  // /export 'getExistingPackages'/,
  // /export 'addWorkOrder'/,
  // /export 'getUserAddresses'/,
  // /export 'setSelectedProducts'/,
  // /export 'setTimeSlotsPlaceholder'/,
  // /export 'endProccess'/,
  // /export 'getOrganizationIdAction'/,
  // /export 'setIsBackFromLogin'/,
  // /**
  //  * missing url
  //  * -----------
  //  *  Moran & Daniel handle this warning */
  // /Unable to find uri in 'background-image/,
];
