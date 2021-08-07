import axios from "axios";

const baseURL =`http://jsonplaceholder.typicode.com/`;

export const api = {
    login: (async payload => {
        const res = await axios.get(`${baseURL}users/${payload.userId}`);
        return res.data;
      }),
      getPostsById: (async payload => {
        const res = await axios.get(`${baseURL}posts?userId=${payload.userId}`);
        return res.data;
      }),
      createPost:  (async payload => {
        let url = `${baseURL}posts/`
        // const options = {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //     data: JSON.stringify(payload.post),
        //     url,
        //   };
        const res = await axios.post(url,payload.post);
        return res.data;
      }),
}