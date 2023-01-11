$(document).ready(function () {
  // Reusable Visibility Function

  function ChangeVisiblity(condition, selector) {
    if (condition) {
      $(selector).addClass("visible");
      $(selector).removeClass("hidden");
    } else {
      $(selector).addClass("hidden");
      $(selector).removeClass("visible");
    }
  }

  // Adding Currency Formatting to Input Fields
  let currentCurrency = "$";
  $(".currency").after(`<span style="margin: -35px 0 0 10px;
    width: fit-content;" >${currentCurrency}</span>`);
  $(".currency").on("keyup", function () {
    let value = $(this).val();
    let formattedValue = value.replace(/\D/g, "");
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $(this).val(formattedValue);
  });

  //Subject Property Conditional Fields

  // Conditional Logic follows the Formstack Prototype : CL/BLN Submission

  states.forEach((state) => {
    $("#propertyState").append(
      $("<option></option>").attr("value", state.value).text(state.name)
    );
  });

  $("#propertyState").select2({
    theme: "bln",
  });

  // Setting initial invisibility for Subject Property Section

  $(
    "#purchaseDate,#howManyUnits,.commercial-important-note,#unitNumber,#describePType,#wholesalerIncludedSection"
  ).addClass("hidden");

  $("#propertyType").change(function () {
    let selected = $(this).children("option:selected").val();
    ChangeVisiblity(
      selected == "multifamily" || selected == "mixed" || selected == "twoFour",
      "#howManyUnits"
    );

    ChangeVisiblity(selected == "commercial", ".commercial-important-note");

    ChangeVisiblity(selected == "other", "#describePType");
    ChangeVisiblity(
      selected == "sfr" ||
        selected == "townhome" ||
        selected == "condo" ||
        selected == "twoFour",
      "#portfolioBlanket"
    );
  });

  // Loan Information Conditional Fields

  // Setting initial invisibility for Loan Information Section
  $(
    "#purchasePrice,#payoffAmount,#renovationRadio,#portfolioBlanket,.renovation-important-note,#borrowerExperience,#exitStrat"
  ).addClass("hidden");

  $("input[type=radio][name=loanType]").change(function () {
    ChangeVisiblity(this.value == "purchase", "#purchasePrice");
    ChangeVisiblity(this.value == "refinance", "#payoffAmount,#purchaseDate");
  });

  $("input[type=radio][name=loanProgram]").change(function () {
    let selected = $(this).val();
    ChangeVisiblity(
      selected == "STB",
      "#renovationRadio,#borrowerExperience,#exitStrat"
    );

    ChangeVisiblity(selected == "GUC", "#gucSection");

    ChangeVisiblity(selected == "LTR" || selected == "STB", "#renovationRadio");

    ChangeVisiblity(
      selected == "LTR" && $("#renovationRadio").val() == "yes",
      ".renovation-important-note"
    );
  });

  $("input[type=radio][name=renovationRadio]").change(function () {
    ChangeVisiblity(
      this.value == "yes" && $("#LTR").is(":checked"),
      ".renovation-important-note"
    );
  });

  // GUC Conditional Fields

  $(
    ".guc-important-note,#GUCestimatedRent,#GUCentitlementsInPlace,#GUCwillPlanInPlace,#GUCapprovedPermits,#gucSection"
  ).addClass("hidden");

  $("input[type=radio][name=gucExperience]").change(function () {
    ChangeVisiblity(this.value == "no", ".guc-important-note");
  });

  $("input[type=radio][name=GUCexitStrat]").change(function () {
    ChangeVisiblity(this.value == "refinance", "#GUCestimatedRent");
  });

  $("input[type=radio][name=GUCentitlements]").change(function () {
    ChangeVisiblity(this.value == "no", "#GUCentitlementsInPlace");
  });

  $("input[type=radio][name=GUCplansSpecsAvailable]").change(function () {
    ChangeVisiblity(this.value == "no", "#GUCwillPlanInPlace");
  });

  $("input[type=radio][name=GUCapprovedPermitsInPlace]").change(function () {
    ChangeVisiblity(this.value == "no", "#GUCapprovedPermits");
  });

  // 5+ Multi/Mixed Property Details Conditional Fields
  $(
    "#multiUseSection,#residentialUnits,#numOfComUnits,#totalUnitCount,#combinedSqFt,#combinedCommercial,#totalSqFt,#vacantResidential,#vacantCommercial,#currentRentalIncomePercentage"
  ).addClass("hidden");

  $("#propertyType").change(function () {
    let selected = $(this).children("option:selected").val();

    ChangeVisiblity(
      selected == "multifamily" || selected == "mixed",
      "#multiUseSection"
    );

    ChangeVisiblity(
      selected == "mixed",
      "#residentialUnits,#numOfComUnits,#totalUnitCount,#combinedSqFt,#combinedCommercial,#totalSqFt,#vacantResidential,#vacantCommercial,#currentRentalIncomePercentage,#currentTotalIncomeValue,#expectedTotalIncomeAnually,#multiBorrowerExperience,#multiOtherManagement,#MultiExitStrat,#multiOtherManagementAfterStabilized,#multiAnnualTax,#multiAnnualInsurance,#multiOtherExpenses,#multiOtherExpensesAsRenovated"
    );
  });

  $("input[type=radio][name=curTotalIncome]").change(function () {
    ChangeVisiblity(this.value == "month", "#currentTotalIncomeValue");
  });

  $("input[type=radio][name=expTotalIncomePer]").change(function () {
    ChangeVisiblity(this.value == "month", "#expectedTotalIncomeAnually");
  });

  $("input[type=radio][name=expInMulti]").change(function () {
    ChangeVisiblity(this.value == "yes", "#multiBorrowerExperience");
  });

  $("#CurrentPropertyManagement").change(function () {
    let selected = $(this).children("option:selected").val();
    ChangeVisiblity(selected == "other", "#multiOtherManagement");
  });

  $("#PropertyManagementAfterStabilized").change(function () {
    let selected = $(this).children("option:selected").val();
    ChangeVisiblity(
      selected == "other",
      "#multiOtherManagementAfterStabilized"
    );
  });

  $("input[type=radio][name=loanProgram]").change(function () {
    let selected = $(this).val();
    ChangeVisiblity(
      selected == "STB" && $("#renovationRadio").val() == "no",
      "#MultiExitStrat"
    );
    ChangeVisiblity(
      selected == "LTR",
      "#multiAnnualTax,#multiAnnualInsurance,#multiOtherExpenses"
    );
    ChangeVisiblity(selected == "STB", "#multiOtherExpensesAsRenovated");
  });

  // Renovation Details Conditional Fields

  $(
    "#brieflyDescribe,#approxSizeOfAddition,#estimatedMonthlyMarketRent,#renovationDetailsSection"
  ).addClass("hidden");

  $("#changeOfPropertyType").change(function () {
    let isChecked =
      $(this).is(":checked") || $("#changeOfUnitCount").is(":checked");
    ChangeVisiblity(isChecked, "#brieflyDescribe");
  });

  $("#changeOfUnitCount").change(function () {
    let isChecked =
      $(this).is(":checked") || $("#changeOfPropertyType").is(":checked");
    ChangeVisiblity(isChecked, "#brieflyDescribe");
  });

  $("#changeOfAddition").change(function () {
    let isChecked = $(this).is(":checked");
    ChangeVisiblity(isChecked, "#approxSizeOfAddition");
  });

  // Since fields only appear when STB is selected, we don't need to check for it in below two functions

  $("input[type=radio][name=renovationRadio]").change(function () {
    let renovationRadio = $(this).val();
    let exitStrat = $("input[type=radio][name=exitStrat]").val();
    ChangeVisiblity(
      renovationRadio == "yes" && exitStrat == "refinance",
      "#estimatedMonthlyMarketRent"
    );
  });

  $("input[type=radio][name=exitStrat]").change(function () {
    let exitStrat = $(this).val();
    let renovationRadio = $("input[type=radio][name=renovationRadio]").val();
    ChangeVisiblity(
      renovationRadio == "yes" && exitStrat == "refinance",
      "#estimatedMonthlyMarketRent"
    );
  });

  // Since fields only appear when !GUC selected, we don't need to check for it in below function

  $("input[type=radio][name=renovationRadio]").change(function () {
    let selected = $(this).val();
    ChangeVisiblity(selected == "yes", "#renovationDetailsSection");
  });

  // PROPERTY HISTORY (GUC / 5+ Multi / Mixed-Use) Conditional Fields

  $(
    "#propHistoryGUCSection,#propHistoryGUCPrice,#propHistoryGUCPrice"
  ).addClass("hidden");

  $("input[type=radio][name=loanType]").change(function () {
    ChangeVisiblity(this.value == "refinance", "#propHistoryGUCSection");
  });

  $("input[type=radio][name=PropHistoryGUCRadio]").change(function () {
    ChangeVisiblity(
      this.value == "yes",
      "#propHistoryGUCPrice,#propHistoryGUCPrice"
    );
  });

  // PROPERTY HISTORY  Conditional Fields

  $("#propHistorySection,#propHistoryPrice,#propHistoryPrice").addClass(
    "hidden"
  );

  $("input[type=radio][name=loanType]").change(function () {
    ChangeVisiblity(this.value == "refinance", "#propHistorySection");
  });

  $("input[type=radio][name=PropHistoryRadio]").change(function () {
    ChangeVisiblity(this.value == "yes", "#propHistoryPrice,#propHistoryPrice");
  });

  // RENT INFORMATION  Conditional Fields

  $(
    "#rentInformationSection,#rentInfoCurrentMonthlyRent,#rentInfoEstimatedMonthlyRent"
  ).addClass("hidden");

  $("input[type=radio][name=loanProgram], #propertyType").change(function () {
    let selected = $("input[type=radio][name=loanProgram]")
      .filter(":checked")
      .val();
    let propType = $("#propertyType").children("option:selected").val();
    let isValid =
      propType == "multifamily" || propType == "mixed" || propType == "";

    ChangeVisiblity(selected == "LTR" && !isValid, "#rentInformationSection");
  });

  $(
    "input[type=radio][name=leasingStrategy], input[type=radio][name=currentOccupancy]"
  ).change(function () {
    let leasingValue = $("input[type=radio][name=leasingStrategy]")
      .filter(":checked")
      .val();
    let occupancyValue = $("input[type=radio][name=currentOccupancy]")
      .filter(":checked")
      .val();

    ChangeVisiblity(
      leasingValue == "longTerm" && occupancyValue == "leased",
      "#rentInfoCurrentMonthlyRent"
    );
    ChangeVisiblity(
      leasingValue == "longTerm",
      "#rentInfoEstimatedMonthlyRent"
    );
  });

  // Guarantor Information Conditional Fields

  $("#guarantorState").select2({
    theme: "bln",
  });

  states.forEach((state) => {
    $("#guarantorState").append(
      $("<option></option>").attr("value", state.value).text(state.name)
    );
  });

  // Correspondent Lender Info

  $("#correspondentLender").select2({
    theme: "bln",
  });

  states.forEach((state) => {
    $("#correspondentLender").append(
      $("<option></option>").attr("value", state.value).text(state.name)
    );
  });

  $("#correnspondentLoanOfficer").select2({
    theme: "bln",
  });

  states.forEach((state) => {
    $("#correnspondentLoanOfficer").append(
      $("<option></option>").attr("value", state.value).text(state.name)
    );
  });

  // Uploaded Files List

  $("#guarantorFileUpload").change(function () {
    // Remove all previous files
    $(".selected-files-list").remove();
    $(".file-header").empty();
    // Add new files
    $(".file-header").append(
      `<span>Selected files:</span>
      <span class="selected-files__reset">Remove Files</span>`
    );
    for (const file of this.files) {
      $(".selected-list").append(
        `<div class="selected-files-list"><span>${file.name}</span></div>`
      );
    }
  });

  $(".selected-files").on("click", ".selected-files__reset", function () {
    $("#guarantorFileUpload").val("");
    $(".selected-files-list").remove();
    $(".file-header").empty();
  });

  // Conditional Field Logic End
});

// Validation

jQuery.validator.addMethod(
  "lettersonly",
  function (value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
  },
  "Letters only please"
);

$("#lenderIntakeForm").validate({
  errorElement: "div",
  rules: {
    propertyType: {
      required: true,
    },
    howManyUnits: {
      required: true,
      number: true,
    },
    propertyAddress: {
      required: true,
    },
    propertyCity: {
      required: true,
    },
    propertyState: {
      required: true,
    },
    propertyZip: {
      required: true,
      number: true,
      range: [10000, 99999],
    },
    describePType: {
      required: true,
    },
    loanProgram: {
      required: true,
    },
    loanType: {
      required: true,
    },
    radioIncluded: {
      required: true,
    },
    purchasePrice: {
      required: true,
      number: true,
    },
    payoffAmount: {
      required: true,
      number: true,
    },
    renovationRadio: {
      required: true,
    },
    blanketRadio: {
      required: true,
    },
    borrowerExperience: {
      required: true,
    },
    exitStrat: {
      required: true,
    },
    gucExperience: {
      required: true,
    },
    gcOrBuilder: {
      required: true,
    },
    GUCsponsorNetWorth: {
      required: true,
      number: true,
    },
    GUCtotalAssets: {
      required: true,
      number: true,
    },
    GUCtotalHardCosts: {
      required: true,
      number: true,
    },
    GUCtotalSoftCosts: {
      required: true,
      number: true,
    },
    GUCtotalConsCost: {
      required: true,
      number: true,
    },
    GUCbuiltValue: {
      required: true,
      number: true,
    },
    GUCexitStrat: {
      required: true,
    },
    GUCestimatedRent: {
      required: true,
      number: true,
    },
    GUCentitlements: {
      required: true,
    },
    GUCentitlementsInPlace: {
      required: true,
    },
    GUCplansSpecsAvailable: {
      required: true,
    },
    GUCwillPlanInPlace: {
      required: true,
    },
    GUCapprovedPermitsInPlace: {
      required: true,
    },
    GUCapprovedPermits: {
      required: true,
    },
    buildingHeight: {
      required: true,
      number: true,
    },
    residentialUnits: {
      required: true,
      number: true,
    },
    numOfComUnits: {
      required: true,
      number: true,
    },
    totalUnitCount: {
      required: true,
      number: true,
    },
    // break
    currentTotalIncome: {
      required: true,
      number: true,
    },
    rentInfoCombinedIncome: {
      required: true,
      number: true,
    },
    guarantorFirstName: {
      required: true,
    },
    guarantorLastName: {
      required: true,
    },
    guarantorEmail: {
      required: true,
      email: true,
    },
    guarantorPhone: {
      required: true,
      number: true,
    },
    guarantorOwnership: {
      required: true,
      number: true,
    },
    guarantorFICO: {
      required: true,
      number: true,
      range: [600, 850],
    },
    guarantorAddress: {
      required: true,
    },
    guarantorCity: {
      required: true,
    },
    guarantorState: {
      required: true,
    },
    guarantorZip: {
      required: true,
      number: true,
      range: [10000, 99999],
    },
  },
  messages: {
    propertyZip: {
      range: "Please enter a valid zip code",
    },
    guarantorZip: {
      range: "Please enter a valid zip code",
    },
  }, // end messages
});

const states = [
  { value: "", name: "Select State" },
  { value: "AK", name: "Alaska" },
  { value: "AL", name: "Alabama" },
  { value: "AR", name: "Arkansas" },
  { value: "AZ", name: "Arizona" },
  { value: "CA", name: "California" },
  { value: "CO", name: "Colorado" },
  { value: "CT", name: "Connecticut" },
  { value: "DC", name: "DistrictofColumbia" },
  { value: "DE", name: "Delaware" },
  { value: "FL", name: "Florida" },
  { value: "GA", name: "Georgia" },
  { value: "HI", name: "Hawaii" },
  { value: "IA", name: "Iowa" },
  { value: "ID", name: "Idaho" },
  { value: "IL", name: "Illinois" },
  { value: "IN", name: "Indiana" },
  { value: "KS", name: "Kansas" },
  { value: "KY", name: "Kentucky" },
  { value: "LA", name: "Louisiana" },
  { value: "MA", name: "Massachusetts" },
  { value: "MD", name: "Maryland" },
  { value: "ME", name: "Maine" },
  { value: "MI", name: "Michigan" },
  { value: "MN", name: "Minnesota" },
  { value: "MO", name: "Missouri" },
  { value: "MS", name: "Mississippi" },
  { value: "MT", name: "Montana" },
  { value: "NC", name: "NorthCarolina" },
  { value: "ND", name: "NorthDakota" },
  { value: "NE", name: "Nebraska" },
  { value: "NH", name: "NewHampshire" },
  { value: "NJ", name: "NewJersey" },
  { value: "NM", name: "NewMexico" },
  { value: "NV", name: "Nevada" },
  { value: "NY", name: "NewYork" },
  { value: "OH", name: "Ohio" },
  { value: "OK", name: "Oklahoma" },
  { value: "OR", name: "Oregon" },
  { value: "PA", name: "Pennsylvania" },
  { value: "RI", name: "RhodeIsland" },
  { value: "SC", name: "SouthCarolina" },
  { value: "SD", name: "SouthDakota" },
  { value: "TN", name: "Tennessee" },
  { value: "TX", name: "Texas" },
  { value: "UT", name: "Utah" },
  { value: "VA", name: "Virginia" },
  { value: "VT", name: "Vermont" },
  { value: "WA", name: "Washington" },
  { value: "WI", name: "Wisconsin" },
  { value: "WV", name: "WestVirginia" },
  { value: "WY", name: "Wyoming" },
];
