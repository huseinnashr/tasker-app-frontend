import { SignInDTO } from "../../auth";

export interface AuthStorageSubscriber {
  onAuthStorageChange: (auth: SignInDTO | null) => void;
}
