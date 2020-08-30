import { action } from "mobx";
import { OnUploadProgress } from "../../services/shared";
import {
  ProfilePictureEDTO,
  ProfilePictureService,
} from "../../services/profile-picture";

export class ProfilePictureStore {
  constructor(private ppService: ProfilePictureService) {}

  @action
  async upload(
    data: FormData,
    onUploadProgress: OnUploadProgress
  ): Promise<ProfilePictureEDTO> {
    return this.ppService.upload(data, onUploadProgress);
  }
}
