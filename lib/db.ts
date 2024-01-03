export const hostnamesDB = [
  {
    name: "Site 1",
    subdomain: "subdomain-1",
  },
  {
    name: "Site 2",
    subdomain: "subdomain-2",
  },
  {
    name: "Site 3",
    subdomain: "subdomain-3",
  },
];

// export async function getSubdomainPaths() {
//     // get all sites that have subdomains set up
//     const subdomains = hostnamesDB.filter((item) => item.subdomain)

//     // build paths for each of the sites in the previous two lists
//     return subdomains.map((item) => {
//       return { params: { site: item.subdomain } }
//     })
//   }
