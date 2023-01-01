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

  //Subject Property Conditional Fields

  // Setting initial invisibility for Subject Property Section

  $(
    "#howManyUnits,.commercial-important-note,#unitNumber,#describePType,#wholesalerIncludedSection"
  ).addClass("hidden");

  $("#propertyType").change(function () {
    let selected = $(this).children("option:selected").val();
    ChangeVisiblity(
      selected == "multifamily" || selected == "mixed" || selected == "vacant",
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
    ChangeVisiblity(this.value == "refinance", "#payoffAmount");
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
    "#propHistoryGUCSection,#propHistoryGUCDate,#propHistoryGUCPrice,#propHistoryGUCPrice"
  ).addClass("hidden");

  $("input[type=radio][name=loanType]").change(function () {
    ChangeVisiblity(this.value == "refinance", "#propHistoryGUCSection");
  });

  $("input[type=radio][name=PropHistoryGUCRadio]").change(function () {
    ChangeVisiblity(
      this.value == "yes",
      "#propHistoryGUCDate,#propHistoryGUCPrice,#propHistoryGUCPrice"
    );
  });

  // PROPERTY HISTORY  Conditional Fields

  $(
    "#propHistorySection,#propHistoryDate,#propHistoryPrice,#propHistoryPrice"
  ).addClass("hidden");

  $("input[type=radio][name=loanType]").change(function () {
    ChangeVisiblity(this.value == "refinance", "#propHistorySection");
  });

  $("input[type=radio][name=PropHistoryRadio]").change(function () {
    ChangeVisiblity(
      this.value == "yes",
      "#propHistoryDate,#propHistoryPrice,#propHistoryPrice"
    );
  });

  // Conditional Field Logic End
});

$("#lenderIntakeForm").validate({
  rules: {
    propertyType: {
      required: true,
    },
    street: {
      required: true,
    },
    city: {
      required: true,
    },
    state: {
      required: true,
    },
    loanProgram: {
      required: true,
    },
    purchasePrice: {
      required: true,
      min: 1,
      number: true,
    },
    loanType: {
      required: true,
    },
    zip: {
      required: true,
      minlength: 5,
      maxlength: 5,
      number: true,
    },
  },
});
