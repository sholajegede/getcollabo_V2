import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import BrandDashboardPage from "containers/Dashboards/BrandDashboardPage";
import InfluencerDashboardPage from "containers/Dashboards/InfluencerDashboardPage";
import AccountPage from "containers/AccountPage/AccountPage";
import CreateAccountPage from "containers/AccountPage/CreateAccountPage";
import CreateInfluencerAccountPage from "containers/AccountPage/CreateInfluencerAccountPage";
import UpdateInfluencerAccount from "containers/AccountPage/UpdateInfluencerAccount";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import BrandLogin from "containers/PageLogin/BrandLogin";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import SiteHeader from "containers/SiteHeader";
import InfluencerDetailPage from "containers/InfluencerDetails/InfluencerDetailPage";
import InfluencerProfile from "containers/InfluencerDetails/InfluencerProfile";
import PageSearch from "containers/PageSearch";
import PageConnectWallet from "containers/PageConnectWallet";
import PageHome2 from "containers/PageHome/PageHome2";
import PagePay from "containers/PagePay";
import PagePayNoFee from "containers/PagePayNoFee";
import InfluencerUpdated from "containers/AccountUpdated/InfluencerUpdated";
import BrandUpdated from "containers/AccountUpdated/BrandUpdated";
import SignUp from "containers/Onboard/SignUp";
import Login from "containers/Onboard/Login";
import PaymentComplete from "containers/PaymentComplete";
import ChangePasswordInfluencer from "containers/ChangePasswordInfluencer";
import ForgotPasswordInfluencer from "containers/ForgotPasswordInfluencer";
import ForgotPasswordBrand from "containers/ForgotPasswordBrand";
import VerifyInfluencerOTP from "containers/VerifyInfluencerOTP";
import VerifyBrand from "containers/VerifyBrand";
import ResetSuccessful from "containers/ResetSuccessful";
import BrandVerified from "containers/BrandVerified";
import VerifyBrandOTP from "containers/VerifyBrandOTP";
import ChangePasswordBrand from "containers/ChangePasswordBrand";
import BankAccountCreator from "containers/BankAccountCreator";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BrandChat from "containers/ChatsPage/BrandChat";
import InfluencerChat from "containers/ChatsPage/InfluencerChat";
import BrandRegistration from "containers/AccountPage/BrandRegistration";
import CustomPayment from "containers/CustomPayment";
import InfluencerVerified from "containers/InfluencerVerified";
import VerifyInfluencer from "containers/VerifyInfluencer";
import PrivacyPolicy from "containers/TermsAndPrivacy/PrivacyPolicy";
import Terms from "containers/TermsAndPrivacy/Terms";
import PageFaq from "containers/PageFaq/PageFaq";
import BuildProfile from "containers/AccountPage/BuildProfile";
import SubmitDeliverable from "containers/Dashboards/SubmitDeliverable";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome2 },
  { path: "/#", exact: true, component: PageHome2 },
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },

  //Sign Up or Login Pages
  { path: "/signup", component: SignUp },
  { path: "/login", component: Login },


  //Pricing Page
  { path: "/pricing", component: PageSubcription },
  { path: "/privacy", component: PrivacyPolicy },
  { path: "/terms", component: Terms },

  //FAQs
  { path: "/faqs", component: PageFaq },
  

  //-----------------------------------------------------------------//

  //Brand Signup
  { path: "/create-brand", component: CreateAccountPage },
  { path: "/complete-registration", component: BrandRegistration },
  { path: "/verifyBrand", component: VerifyBrand },
  { path: "/brand-verified", component: BrandVerified },

  //Brand
  { path: "/login-brand", component: BrandLogin },
  { path: "/brand", component: BrandDashboardPage },
  { path: "/update/:id", component: AccountPage },
  { path: "/brand-updated", component: BrandUpdated },
  { path: "/search", component: PageSearch },
  { path: "/book/:username", component: InfluencerDetailPage },
  { path: "/booking/:username", component: PageConnectWallet },

  //Brand Chat
  { path: "/messages", component: BrandChat },

  //Booking
  { path: "/order/:username/:deliverableId", component: PagePay },
  { path: "/custom-booking/:username", component: CustomPayment },
  { path: "/confirmed", component: PaymentComplete },

  //Password Reset
  { path: "/forgot-password-brand", component: ForgotPasswordBrand },
  { path: "/verifyBrandOTP/:email", component: VerifyBrandOTP },
  { path: "/reset-password-brand", component: ChangePasswordBrand },
  { path: "/reset-successful", component: ResetSuccessful },


  //-----------------------------------------------------------------//

  //Creator Signup
  { path: "/create-profile", component: CreateInfluencerAccountPage },
  { path: "/build-profile/:id", component: BuildProfile },
  { path: "/verifyCreator", component: VerifyInfluencer },
  { path: "/creator-verified", component: InfluencerVerified },


  //Creator
  { path: "/login-creator", component: InfluencerLogin },
  { path: "/dashboard", component: InfluencerDashboardPage },
  { path: "/submitDeliverable/:username/:indexId", component: SubmitDeliverable },

  //Edits
  { path: "/edit-bank/:id", component: BankAccountCreator },
  { path: "/edit-profile/:id", component: UpdateInfluencerAccount },


  { path: "/myprofile/:username", component: InfluencerProfile },
  { path: "/profile-updated", component: InfluencerUpdated },

  //Creator Chat
  { path: "/chat", component: InfluencerChat },

  //Password Reset
  { path: "/forgot-password-creator", component: ForgotPasswordInfluencer },
  { path: "/verifyCreatorOTP/:email", component: VerifyInfluencerOTP },
  { path: "/reset-password-creator", component: ChangePasswordInfluencer },
  { path: "/reset-successful", component: ResetSuccessful },
];

const Routes = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <SiteHeader />
        <Switch>
          {pages.map(({ component, path, exact }) => {
            return (
              <Route
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          })}
          <Route component={Page404} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Routes;
