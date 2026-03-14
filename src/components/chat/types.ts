/* ------------------------------------------------------------------ */
/*  Chat widget types & reducer                                        */
/* ------------------------------------------------------------------ */

export type ServiceType = "cleaning" | "repair" | "question";

export type Step =
  | "serviceType"
  | "poolSize"
  | "schedule"
  | "details"
  | "submitting"
  | "result"
  | "inquiry"
  | "inquirySubmitting"
  | "inquiryResult";

export type PoolSize = "10k-20k" | "20k-30k" | "30k+";
export type Schedule = "weekly" | "biweekly" | "premium";

export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface InquiryDetails {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ChatState {
  step: Step;
  serviceType: ServiceType | null;
  poolSize: PoolSize | null;
  schedule: Schedule | null;
  details: ContactDetails | null;
  inquiry: InquiryDetails | null;
  monthlyPrice: number | null;
  quoteId: string | null;
  error: string | null;
}

export type ChatAction =
  | { type: "SET_SERVICE_TYPE"; serviceType: ServiceType }
  | { type: "SET_POOL_SIZE"; poolSize: PoolSize }
  | { type: "SET_SCHEDULE"; schedule: Schedule }
  | { type: "SET_DETAILS"; details: ContactDetails }
  | { type: "SET_INQUIRY"; inquiry: InquiryDetails }
  | { type: "SET_PRICE"; price: number }
  | { type: "SET_QUOTE_ID"; quoteId: string }
  | { type: "SET_STEP"; step: Step }
  | { type: "SET_ERROR"; error: string }
  | { type: "GO_BACK" }
  | { type: "RESET" };

export const initialChatState: ChatState = {
  step: "serviceType",
  serviceType: null,
  poolSize: null,
  schedule: null,
  details: null,
  inquiry: null,
  monthlyPrice: null,
  quoteId: null,
  error: null,
};

/*
 * Flow A (cleaning): serviceType → poolSize → schedule → details → submitting → result
 * Flow B (repair/question): serviceType → inquiry → inquirySubmitting → inquiryResult
 */
export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_SERVICE_TYPE": {
      const svc = action.serviceType;
      return {
        ...state,
        serviceType: svc,
        step: svc === "cleaning" ? "poolSize" : "inquiry",
      };
    }
    case "SET_POOL_SIZE":
      return { ...state, poolSize: action.poolSize, step: "schedule" };
    case "SET_SCHEDULE":
      return { ...state, schedule: action.schedule, step: "details" };
    case "SET_DETAILS":
      return { ...state, details: action.details, step: "submitting" };
    case "SET_INQUIRY":
      return { ...state, inquiry: action.inquiry, step: "inquirySubmitting" };
    case "SET_PRICE":
      return { ...state, monthlyPrice: action.price };
    case "SET_QUOTE_ID":
      return { ...state, quoteId: action.quoteId, step: "result" };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_ERROR":
      return { ...state, error: action.error, step: "details" };
    case "GO_BACK": {
      const BACK_MAP: Partial<Record<Step, Step>> = {
        poolSize: "serviceType",
        schedule: "poolSize",
        details: "schedule",
        inquiry: "serviceType",
      };
      const prev = BACK_MAP[state.step];
      if (!prev) return state;
      return { ...state, step: prev };
    }
    case "RESET":
      return { ...initialChatState };
    default:
      return state;
  }
}
