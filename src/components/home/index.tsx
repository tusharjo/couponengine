import { RouteComponentProps } from "@reach/router";
import { useStorage } from "../../common/localStorage";
import { CouponDashboard } from "./coupon";
import { ProductDashboard } from "./product";

const Home = (_: RouteComponentProps) => {
  const { apiStore } = useStorage();
  return <>
    <ProductDashboard />
    {apiStore?.products?.length > 0 ?
      apiStore?.coupons?.length > 0 ?
        <CouponDashboard />
        : null
      : null
    }
  </>;
}

export default Home;