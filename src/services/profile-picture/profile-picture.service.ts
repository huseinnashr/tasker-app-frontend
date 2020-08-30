import { HttpService } from "../http.service";
import { OnUploadProgress } from "../shared";
import { ProfilePictureEDTO } from ".";

export class ProfilePictureService extends HttpService {
  async upload(
    data: FormData,
    onUploadProgress: OnUploadProgress
  ): Promise<ProfilePictureEDTO> {
    const endoint = `/profile-picture`;
    const config = { onUploadProgress };
    return this.http<ProfilePictureEDTO>("POST", endoint, data, config);
  }

  get(profilePictureId: string): string {
    return `${this.BACKEND_URL}/profile-picture/${profilePictureId}`;
  }
}
