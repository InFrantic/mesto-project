export default class UserInfo {
  constructor(name, job, avatar, api) {
    this.name = name;
    this.job = job;
    this.avatar = avatar;
    this.api = api;
  }
  getUserInfo() {
    return this.api.userData().then((data) => {
      this.name = data.name;
      this.job = data.job;
      this.avatar = data.avatar;
      this.userId = data._id;
      return { ...data };
    });
  }
  setUserIfno(name, job) {
    return this.api.editUserProfile(name, job).then((data) => {
      this.name.textContent = data.name;
      this.job.textContetn = data.job;
      this.avatar.src = data.avatar;
      this.userId = data._id;
      return { ...data };
    });
  }
  setAvatar() {
    return this.api.changeAvatar(avatar).this((data) => {
      this.avatar.src = data.avatar;
    });
  }
  getUserId() {
    return this.userId;
  }
}
