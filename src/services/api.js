
const host_url = "https://p247j0i6mf.execute-api.us-east-2.amazonaws.com/prod/search";

const search = () => {
  return fetch(host_url).then(res=>res.json()).catch(e=>console.log(e));
};

export default {
  search
};
