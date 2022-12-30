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
      "#residentialUnits,#numOfComUnits,#totalUnitCount,#combinedSqFt,#combinedCommercial,#totalSqFt,#vacantResidential,#vacantCommercial,#currentRentalIncomePercentage,#currentTotalIncomeValue,#expectedTotalIncomeAnually,#multiBorrowerExperience,#multiOtherManagement,##MultiExitStrat"
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

  $("input[type=radio][name=loanProgram]").change(function () {
    let selected = $(this).val();
    ChangeVisiblity(
      selected == "STB" && $("#renovationRadio").val() == "no",
      "#MultiExitStrat"
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