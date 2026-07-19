export type VerificationMethod = "AusweisApp2" | "Bank-Ident";
export type ProviderCategory = "Youth" | "Adult-Casual" | "Adult-Pro";
export type PsttgStatus = "below_threshold" | "warning" | "lock_payouts" | "requires_tax_id";

export type ProviderVerificationInput = {
  dateOfBirth: string;
  verificationMethod: VerificationMethod;
  parentalConsent?: boolean;
  businessDocumentUploaded?: boolean;
  taxIdProvided?: boolean;
  providerType?: "casual" | "pro";
};

export type ProviderVerificationResult = {
  category: ProviderCategory;
  age: number;
  verified: boolean;
  restrictions: string[];
  requiresParentalConsent: boolean;
  requiredDocuments: string[];
};

export type PsttgSnapshot = {
  transactions: number;
  revenueEuro: number;
  taxIdVerified: boolean;
};

export type WorkSlotInput = {
  dateOfBirth: string;
  startTime: string;
  endTime: string;
  taskKey: string;
  alreadyWorkedMinutesToday?: number;
  workedDaysThisWeek?: number;
  earnedThisMonthEuro?: number;
};

export type WorkSlotResult = {
  allowed: boolean;
  reason: string;
  category: ProviderCategory;
  violations: string[];
};

export type PsttgResult = {
  status: PsttgStatus;
  thresholdReached: boolean;
  payoutLocked: boolean;
  message: string;
  nextAction: string;
};

export type YouthWorkPolicy = {
  maxDailyMinutes: number;
  allowedStartHour: number;
  allowedEndHour: number;
  maxDaysPerWeek: number;
  maxMonthlyEuro: number;
  allowedTasks: string[];
  blockedTasks: string[];
};

export type PsttgThresholds = {
  warningTransactions: number;
  warningRevenueEuro: number;
  hardTransactions: number;
  hardRevenueEuro: number;
};

export const youthWorkPolicy: YouthWorkPolicy = {
  maxDailyMinutes: 120,
  allowedStartHour: 8,
  allowedEndHour: 18,
  maxDaysPerWeek: 5,
  maxMonthlyEuro: 100,
  allowedTasks: ["weeding", "watering", "leaf-raking", "light-cleanup", "basic-lawn-care"],
  blockedTasks: ["chainsaw", "heavy-mower", "tree-felling", "pesticide-use", "paving", "pond-construction"]
};

export const psttgThresholds: PsttgThresholds = {
  warningTransactions: 25,
  warningRevenueEuro: 1800,
  hardTransactions: 30,
  hardRevenueEuro: 2000
};

function calculateAge(dateOfBirth: string, referenceDate = new Date()): number {
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) {
    throw new Error("Invalid date of birth");
  }

  let age = referenceDate.getFullYear() - dob.getFullYear();
  const monthDiff = referenceDate.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < dob.getDate())) {
    age -= 1;
  }

  return age;
}

export function determineProviderCategory(input: ProviderVerificationInput): ProviderVerificationResult {
  const age = calculateAge(input.dateOfBirth);
  let verified = input.verificationMethod === "AusweisApp2" || input.verificationMethod === "Bank-Ident";
  const restrictions: string[] = [];
  const requiredDocuments: string[] = [];
  let category: ProviderCategory = "Adult-Casual";
  let requiresParentalConsent = false;

  if (age >= 13 && age <= 17) {
    category = "Youth";
    requiresParentalConsent = true;
    requiredDocuments.push("parental_consent");
    restrictions.push(
      "max 120 minutes/day",
      "work only between 08:00 and 18:00",
      "max 5 days/week",
      "monthly earnings cap of 100 EUR",
      "only light and safe tasks"
    );
    if (!input.parentalConsent) {
      restrictions.push("parental consent required");
    }
  } else if (age >= 18 && input.providerType === "pro") {
    category = "Adult-Pro";
    requiredDocuments.push("business_registration_or_trade_register", "tax_id");
    if (!input.businessDocumentUploaded) {
      restrictions.push("business proof required");
    }
    if (!input.taxIdProvided) {
      restrictions.push("tax id required for pro verification");
    }
  } else if (age >= 18) {
    category = "Adult-Casual";
  } else {
    restrictions.push("providers below 13 are not eligible");
    verified = false;
  }

  if (!verified) {
    restrictions.push("identity verification required via AusweisApp2 or Bank-Ident");
  }

  return {
    category,
    age,
    verified,
    restrictions,
    requiresParentalConsent,
    requiredDocuments
  };
}

export function evaluateYouthTask(taskKey: string): { allowed: boolean; reason?: string } {
  const allowed = youthWorkPolicy.allowedTasks.includes(taskKey);
  return allowed
    ? { allowed: true }
    : { allowed: false, reason: "Task is blocked for youth providers because it is not classified as light or safe work." };
}

export function validateWorkSlot(input: WorkSlotInput): WorkSlotResult {
  const age = calculateAge(input.dateOfBirth);
  const category: ProviderCategory = age >= 13 && age <= 17 ? "Youth" : age >= 18 ? "Adult-Casual" : "Adult-Casual";
  const violations: string[] = [];

  if (category !== "Youth") {
    return {
      allowed: true,
      reason: "No youth restrictions apply.",
      category,
      violations
    };
  }

  const startHour = Number(input.startTime.split(":")[0]);
  const endHour = Number(input.endTime.split(":")[0]);
  const slotMinutes = Math.max(0, endHour * 60 - startHour * 60);
  const workedToday = input.alreadyWorkedMinutesToday ?? 0;
  const workedDays = input.workedDaysThisWeek ?? 0;
  const earnedMonth = input.earnedThisMonthEuro ?? 0;

  if (startHour < youthWorkPolicy.allowedStartHour || endHour > youthWorkPolicy.allowedEndHour) {
    violations.push("Youth work must stay between 08:00 and 18:00.");
  }
  if (slotMinutes + workedToday > youthWorkPolicy.maxDailyMinutes) {
    violations.push("Daily work time exceeds the 120 minute cap.");
  }
  if (workedDays >= youthWorkPolicy.maxDaysPerWeek) {
    violations.push("Weekly work limit of five days has been reached.");
  }
  if (earnedMonth >= youthWorkPolicy.maxMonthlyEuro) {
    violations.push("Monthly earnings cap of 100 EUR has been reached.");
  }

  const taskCheck = evaluateYouthTask(input.taskKey);
  if (!taskCheck.allowed) {
    violations.push(taskCheck.reason ?? "Task is not allowed for youth providers.");
  }

  return {
    allowed: violations.length === 0,
    reason: violations.length === 0 ? "Slot is compliant." : violations[0],
    category,
    violations
  };
}

export function evaluatePsttg(snapshot: PsttgSnapshot): PsttgResult {
  const thresholdReached =
    snapshot.transactions >= psttgThresholds.hardTransactions || snapshot.revenueEuro >= psttgThresholds.hardRevenueEuro;
  const warning =
    snapshot.transactions >= psttgThresholds.warningTransactions || snapshot.revenueEuro >= psttgThresholds.warningRevenueEuro;

  if (thresholdReached && !snapshot.taxIdVerified) {
    return {
      status: "requires_tax_id",
      thresholdReached,
      payoutLocked: true,
      message: "PStTG threshold reached and tax ID is missing.",
      nextAction: "Block payouts until the provider verifies a tax ID."
    };
  }

  if (thresholdReached) {
    return {
      status: "lock_payouts",
      thresholdReached,
      payoutLocked: true,
      message: "PStTG threshold reached.",
      nextAction: "Prepare year-end reporting and keep payout review active."
    };
  }

  if (warning) {
    return {
      status: "warning",
      thresholdReached: false,
      payoutLocked: false,
      message: "Provider is approaching the reporting threshold.",
      nextAction: "Prompt the provider to verify the tax ID early."
    };
  }

  return {
    status: "below_threshold",
    thresholdReached: false,
    payoutLocked: false,
    message: "Provider is below the reporting threshold.",
    nextAction: "Continue normal payouts."
  };
}
