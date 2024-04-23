import { FetchIdToken } from "./FirebseUtils";

export let GetToken = async () => {
  let Refreshed = await FetchIdToken().then((data) => data);
  return Refreshed;
};
