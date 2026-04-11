import { getAppConfigActionPublic } from "@/actions/app-config-action";
import LandingFooterContainer from "./landing-footer-container";

export default async function LandingFooter() {
  const configResponse = await getAppConfigActionPublic();

  return <LandingFooterContainer config={configResponse.data} />;
}
