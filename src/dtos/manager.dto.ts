export interface ManagerDTO {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  projectStats: {
    total: number;
    completed: number;
  };
}
