export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface QuizSubmissionData {
  name: string;
  email: string;
  answers: { question: string; answer: string }[];
  ageGroup: string;
  identifyAs: string;
  drinkType: string;
  wellnessGoal: string;
  snackMatters: string;
  sweetSpot: string;
}

const LAMBDA_API_URL =
  process.env.NEXT_PUBLIC_LAMBDA_API_URL || process.env.NEXT_PUBLIC_CONTACT_LAMBDA_URL || "";

/**
 * Sends a contact form message by calling the AWS Lambda endpoint.
 */
export async function sendContactEmail(
  data: EmailData
): Promise<{ success: boolean; error?: string }> {
  if (!LAMBDA_API_URL) {
    console.warn(
      "[Contact Form] NEXT_PUBLIC_LAMBDA_API_URL is not configured in .env. Submission logged locally:",
      data
    );
    // Return friendly notification during development if Lambda URL isn't set yet
    return {
      success: true,
      error: undefined,
    };
  }

  try {
    const response = await fetch(LAMBDA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "contact",
        data,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error || "Failed to send message via Lambda endpoint.",
      };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to submit contact form:", error);
    const message = error instanceof Error ? error.message : "Network error. Please try again.";
    return { success: false, error: message };
  }
}

/**
 * Submits offer quiz answers and lead details via the AWS Lambda endpoint.
 */
export async function sendQuizSubmission(data: QuizSubmissionData): Promise<{
  success: boolean;
  emailSuccess?: boolean;
  webhookSuccess?: boolean;
  error?: string;
}> {
  if (!LAMBDA_API_URL) {
    console.warn(
      "[Quiz Submission] NEXT_PUBLIC_LAMBDA_API_URL is not configured in .env. Submission logged locally:",
      data
    );
    return {
      success: true,
      emailSuccess: true,
      webhookSuccess: true,
    };
  }

  try {
    const response = await fetch(LAMBDA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "quiz",
        data,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        emailSuccess: result.emailSuccess,
        webhookSuccess: result.webhookSuccess,
        error: result.error || "Failed to submit quiz responses.",
      };
    }

    return {
      success: true,
      emailSuccess: result.emailSuccess ?? true,
      webhookSuccess: result.webhookSuccess ?? true,
    };
  } catch (error: unknown) {
    console.error("Failed to submit quiz lead:", error);
    const message = error instanceof Error ? error.message : "Network error. Please try again.";
    return { success: false, error: message };
  }
}
