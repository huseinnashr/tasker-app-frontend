import { OnUploadProgress } from "../../services/shared";
import {
  ProfilePictureEDTO,
  ProfilePictureService,
} from "../../services/profile-picture";

export class ProfilePictureStore {
  constructor(private ppService: ProfilePictureService) {}

  async upload(
    data: FormData,
    onUploadProgress: OnUploadProgress
  ): Promise<ProfilePictureEDTO> {
    return this.ppService.upload(data, onUploadProgress);
  }

  get(profilePictureId: string | undefined): string {
    if (profilePictureId) return this.ppService.get(profilePictureId);
    else return "";
  }
}
