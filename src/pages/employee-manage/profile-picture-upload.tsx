import "./profile-picture-upload.css";
import React, { Component } from "react";

import { Avatar, Upload, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { ProfilePictureStore } from "../../stores";
import { inject, observer } from "mobx-react";
import { UploadProps } from "antd/lib/upload/interface";
import { BACKEND_URL } from "../../services/http.service";

interface Props {
  profilePictureStore?: ProfilePictureStore;
  value?: string;
  onChange?: (value: string) => void;
}

interface States {
  loading: boolean;
}

@inject("profilePictureStore")
@observer
export class ProfilePictureUpload extends Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  customRequest: UploadProps["customRequest"] = async ({
    file,
    onProgress,
    onSuccess,
    onError,
  }) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      const { data } = await this.props.profilePictureStore!.upload(
        formData,
        ({ total, loaded }) => {
          onProgress({ percent: Math.round((loaded / total) * 100) }, file);
        }
      );
      onSuccess(data, file);
    } catch (e) {
      onError(e);
    }
  };

  handleChange: UploadProps["onChange"] = ({ file }) => {
    if (file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (file.status === "done") {
      this.setState({ loading: false });
      this.props.onChange!(file.response.url);
    }
  };

  render() {
    return (
      <Upload
        name="profilePicture"
        listType="picture-card"
        className="profile-picture-uploader"
        showUploadList={false}
        customRequest={this.customRequest}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        accept=".png, .jpg, .jpeg"
      >
        {this.props.value && !this.state.loading ? (
          <Avatar
            shape="square"
            size={86}
            src={`${BACKEND_URL}/profile-picture/${this.props.value}`}
          />
        ) : (
          <div>
            {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
    );
  }
}
