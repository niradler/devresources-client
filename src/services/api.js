
const host_url = "https://func.devresources.site/resources/search";

const search = (term='') => {
  return fetch(host_url + '?q=' + term).then(res=>res.json()).catch(e=>console.log(e));
};

export default {
  search
};
