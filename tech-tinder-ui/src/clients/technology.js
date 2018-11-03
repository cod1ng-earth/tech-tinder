import { axiosInstance } from "~/main.js";

export default {
  get(id) {
    return axiosInstance
      .get(`/technology/${id}`)
      .then(response => response.data);
  },
  getRandom(cnt) {
    const url = cnt ? `/technology/random/${cnt}` : `/technology/random`;
    return axiosInstance.get(url).then(response => response.data);
  },
  add(payload) {
    return axiosInstance
      .post(`/technology`, payload)
      .then(response => response.data);
  },
  addVote(id, opinion, username) {
    return axiosInstance.post(`/technology/${id}/vote`, {
      opinion: opinion,
      userName: username
    });
  },
  getStats() {
    return axiosInstance
      .get(`/technology/stats`)
      .then(response => response.data);
  },
  getStatsDetails(techId) {
    return axiosInstance
      .get(`/technology/${techId}/stats`)
      .then(response => response.data);
  }
};
