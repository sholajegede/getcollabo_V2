import React from "react";
import Badge from "shared/Badge/Badge";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="##" color="green" name="Last updated: 30 April 2023" />
          <h1
            className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
            title="Privacy Policy"
          >
            Privacy policy
          </h1>
          <span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">
            Please read through carefully to understand our privacy policy here
            at GetCollabo.
          </span>
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        <h3 className="text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          Who we are?
        </h3>
        <p>
          This website or mobile application (“Application”) is operated by
          Collabo Technologies Limited (“GetCollabo”, “we”, “us” and/or “our”),
          a registered Limited Liability Company registered in Nigeria with
          registration number 6942729. You can contact us as indicated under the
          “Contact” section in the main navigation.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          1. What is this privacy policy for?
        </h3>
        <p>
          This privacy policy (“Privacy Policy”) applies to personal data that
          we collect from you as a user of this Application or as a partner
          applicant, job applicant, member, subscriber, or customer (“you” or
          “your” being interpreted accordingly). It provides information on what
          personal data we collect, why we collect personal data, how it is used
          and the lawful basis on which your personal data is processed, and
          what your rights are under the applicable data protection and privacy
          laws, including the{" "}
          <a
            href="https://gdpr.eu/privacy-notice/"
            target="_blank"
            rel="noopener noreferrer"
          >
            General Data Protection Regulation (“GDPR”)
          </a>{" "}
          which is applicable to us and you as of 25 May 2018. ‘Personal data’
          as used in this Privacy Policy means any information that relates to
          you from which you can be identified. By using our Application or
          submitting your personal data you are taken to accept the terms of
          this Privacy Policy, so please read it carefully.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          2. What personal data do we collect?
        </h3>
        <p>We collect the following personal data about you:</p>

        <ul>
          <li>
            Registrations: The personal details you provide when creating an
            Account, ​such as your email address, name, phone number, job title,
            name of company, year of birth, identification number, payment and
            billing details or other information ​that we require for the
            purpose of recording and processing your campaigns. For further
            details please also refer to the section below headed “Payment
            Information”.
          </li>
          <li>
            Customer Transaction: The personal details you provide when you’re
            registering your account. These transactions typically include your
            full name, address, email address; business address and phone
            number; gender, approximate age, industry, career level, approximate
            budget spend; information about your work and other information that
            you elect to provide to support your application. such as your first
            and last name, email address, billing and payment information (for
            further details please also refer to the section below headed
            “Payment Information”).
          </li>
          <li>
            Other Information: Personal details you choose to give when
            corresponding with us by phone, intercom or e-mail, participating in
            user/customer/member surveys or otherwise visiting and interacting
            with this ​Application or any other ​Applications we operate, and
            personal data that you provide to us when you visit ​our
            Application.
          </li>
        </ul>

        <p>By consenting to the GetCollabo Privacy Policy;</p>
        <ul>
          <li>
            I hereby grant GetCollabo consent to collect my name, official
            Government ID Number (ID Number) and photo image. I understand that
            GetCollabo may share this information with a 3rd party, Smile
            Identity Inc in order to validate it against a Government source. I
            also understand that Smile Identity Inc may use my ID Number to
            collect the following additional data on me: Full Name; Date of
            Birth; ID Number; Image; Address; Phone Number; Gender; Government
            ID Expiry Date; and Or other additional information associated with
            my ID Number that the Issuing Authority may provide.
          </li>
          <li>
            I understand that this data is being used to confirm my identity. I
            understand that this data may be processed or stored outside of the
            borders of Nigeria, Kenya, Ghana, South Africa, etc and I hereby
            consent to this. I am aware that if I wish to change my preferences,
            request that my data be edited or deleted or withdraw my consent at
            any time I must contact GetCollabo.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          3. Automatically collected personal data
        </h3>
        <ul>
          <li>
            Log Data: When you visit our Application, our servers record
            information (“log data”), including information that your browser
            automatically sends whenever you visit the Application. This log
            data includes your Internet Protocol (“IP”) address (from which we
            understand the country you are connecting from at the time you visit
            the Application), browser type and settings, the date and time of
            your request.
          </li>
          <li>
            Our Application uses cookies (small text files placed on your
            device) and similar technologies to distinguish you from other
            users. This is to provide you with a good user experience when you
            browse our Application and allows us to improve its features.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          4. How we use your personal data
        </h3>
        <p>We use your personal data in the following ways:</p>
        <ul>
          <li>
            To acknowledge and confirm receipt of your Social Media Use
            “GetCollabo Account” application (and where necessary put you on our
            waiting list). Such use of your data is necessary in order for
            review to be undertaken on the application and a link created with
            the respective advertiser.
          </li>
          <li>
            To contact you in connection with user/customer/member surveys and
            use any information you choose to submit in response, provided that
            you gave us your consent to be contacted in this way at the time you
            provided us with the personal data.
          </li>
          <li>
            From time to time, we may organize contests and other promotions. If
            you share information with us directly or through one of our third
            party service providers, we may use the email address you provided
            in order to notify you of the results.
          </li>
          <li>
            If you choose to subscribe (opt-in) to one of our various
            newsletters, we will send our periodic newsletter to the email
            address you provided us. Members can opt-out of our newsletters at
            any time by clicking the “Unsubscribe” link that is present on every
            email at the very bottom of the newsletter.
          </li>
          <li>
            GetCollabo and our affiliated businesses, “GetCollabo” in
            particular, may provide you, or permit selected third party service
            providers to provide you with information about goods or services,
            events and other promotions we feel may interest you as a member,
            applicant or customer. We (or such third party providers) will
            contact you by email only with your consent, which was given at the
            time you provided us with the personal data.
          </li>
          <li>
            We may use your personal data for other purposes which you have
            consented to at the time of providing your data.
          </li>
          <li>
            As necessary for certain legitimate business interests, which
            include the following:
            <ul className="list-none">
              <li className="pl-2 border-l-2 border-gray-500">
                where we are asked to deal with any inquiries or complaints you
                make.
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                to administer our Application, to better understand how
                customers interact with our Applications and ensure that our
                Application is presented in the most effective manner for you
                and for your computer/device.
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                to conduct analytics to inform our marketing strategy and enable
                us to enhance and personalize the experience we offer to our
                members and our communications, including by creating customer
                or member profiles to enable personalized direct marketing
                communications.
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                If you ask us to delete your data or to be removed from our
                marketing lists and we are required to fulfil your request, to
                keep basic data to identify you and prevent further unwanted
                processing.
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                to share personal data among our affiliated businesses for
                administrative purposes, for providing customer or member
                services and in relation to our sales and marketing activities.
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                we may anonymize, aggregate and de-identify the data that we
                collect and use such anonymized, aggregated and de-identified
                data for our own internal business purposes, including sharing
                it with our current and prospective members, business partners,
                our affiliated businesses, agents and other third parties for
                commercial, statistical and market research purposes, for
                example to allow those parties to analyse patterns among groups
                of people, and conducting research on demographics, interests
                and behavior.
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                for internal business/technical operations, including
                troubleshooting, data analysis, testing, research, statistical
                and survey purposes and as part of our efforts to keep our
                Application, network and information systems secure.
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                to (a) comply with legal obligations, (b) respond to requests
                from competent authorities; enforce our Terms of Use; (d)
                protect our operations or those of any of our affiliated
                businesses; (e) protect our rights, safety or property, and/or
                that of our affiliated businesses, you or others; and (f)
                enforcing or defending legal rights, or preventing damage.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          As used in this Privacy Policy, “legitimate interests” means the
          interests of GetCollabo and our affiliated businesses, in conducting
          and managing our organization. When we process your personal data for
          our legitimate interests, we make sure to consider and balance any
          potential impact on you, and your rights under the data protection
          laws.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          5. Disclosure of your information
        </h3>
        <p>
          We share your personal data with third parties in the following
          situations:
        </p>
        <ul>
          <li>
            Service Providers: GetCollabo, like many businesses, sometimes hires
            selected third parties who act on our behalf to support our
            operations, such as (i) card processing or payment services (see the
            section below headed “Payment Information”), (ii) credit reference
            agencies to protect against possible fraud, (iii) IT suppliers and
            contractors (e.g. data hosting providers or delivery partners) as
            necessary to provide IT support and enable us to provide users
            services and other goods/services available on this Application or
            to members, (iv) web analytics providers, (v) providers of digital
            advertising services and (vi) providers of, marketing and sales
            software solutions. Pursuant to our instructions, these parties may
            access, process or store your personal data in the course of
            performing their duties to us and solely in order to perform the
            services we have hired them to provide.
          </li>
          <li>
            GetCollabo Affiliated Businesses: We operate on a global scale. In
            order to provide the services you request from us, our affiliated
            businesses may access and process the information which we collect
            from you for the purposes described above, including to offer
            products and services to you. Our affiliated businesses will only
            use your data for the purposes for which we originally collected it.
          </li>
          <li>
            Business Transfers: if we sell our business or our company assets
            are acquired by a third party, personal data held by us about our
            applicants, members, customers may be one of the transferred assets.
          </li>
          <li>
            Administrative and Legal Reasons: if we need to disclose your
            personal data (i) to comply with a legal obligation and/or judicial
            or regulatory proceedings, a court order or other legal process.
            (ii) to enforce our Terms of Use or other applicable contract terms
            that you are subject to or (iii) to protect us, our members,
            applicants, customers, or contractors against loss or damage. This
            may include (without limit) exchanging information with the police,
            courts or law enforcement organizations.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          6. Payment information
        </h3>
        <ul>
          <li>
            Any credit/debit card payments and other payments you make through
            our Application will be processed by our third party payment
            providers and the payment data you submit will be securely stored
            and encrypted by our payment service providers using up to date
            industry standards. Please note that we do not ourselves directly
            process or store the debit/credit card data that you submit.
          </li>
          <li>
            We may arrange that card or payment data you submit in support of a
            member or customer transaction fee is stored for the purpose of
            processing your member or customer transaction fees.
          </li>
          <li>
            You may choose to opt out of our third party payment providers
            holding your card or payment data although this means that you will
            need to re-supply us with card/payment details to initiate your
            membership subscription fee or for the purpose of making any future
            purchases.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          7. Personal data transfers
        </h3>
        <ul>
          <li>
            Your personal data may be transferred to and stored in countries
            other than the country in which the information was originally
            collected, including countries and other destinations outside the
            Federal Republic of Nigeria to our service providers and affiliated
            businesses for the purposes described above.
          </li>
          <li>
            Where we transfer your personal data to countries outside of the
            Federal Republic of Nigeria we will take all steps to ensure that
            your personal data will continue to be protected. We will implement
            appropriate safeguards for the transfer of personal data to our
            service providers in accordance with the applicable law.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          8. Security
        </h3>
        <ul>
          <li>
            Where we have given you (or where you have chosen) a password or
            log-in which enables you to access certain restricted parts of our
            Application, you are responsible for doing everything you reasonably
            can to keep these details secret. You must not share your password
            or log-in details with anyone else.
          </li>
          <li>
            Unfortunately, the transmission of information over the internet or
            public communications networks can never be completely secure. We
            will take appropriate technical and organizational security measures
            to protect the personal data that you submit to us against
            unauthorized/unlawful access or loss, destruction or damage,
            although we cannot 100% guarantee the security of personal data that
            you provide to us online.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          9. Personal data retention
        </h3>
        <ul>
          <li>
            We will keep your personal data only for as long as is reasonably
            necessary for the purposes outlined in this Privacy Policy, or for
            the duration required by any legal, regulatory, accounting or
            reporting requirements, whichever is the longer. In particular, we
            retain membership records for six years after expiration or
            termination of your membership. We retain information submitted
            through the Application and the other Applications we operate for
            two years following account closure or contact with you, as
            applicable. When you consent to receive marketing communications, we
            will keep your data until you unsubscribe.
          </li>
          <li>
            To determine the appropriate retention period for your personal
            data, we consider the amount, nature, and sensitivity of the
            personal data, the purposes for which we process your personal data,
            applicable legal requirements or operational retention needs, and
            whether we can achieve those purposes through other means.
          </li>
          <li>
            Upon expiry of the applicable retention period we will securely
            destroy your personal data in accordance with applicable laws and
            regulations. In some circumstances we may anonymize your personal
            data so that it can no longer be associated with you, in which case
            it is no longer personal data.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          10. Your personal data protection rights
        </h3>
        <p>
          Certain applicable data protection laws give you specific rights in
          relation to your personal data. In particular, if the processing of
          your personal data is subject to the GDPR, you have the following
          rights in relation to your personal data:
        </p>
        <ul>
          <li>
            Right of access: If you ask us, we will confirm whether we are
            processing your personal data and, if so, provide you with a digital
            copy of that personal data along with certain other details such as
            the purpose of the data processing. If you require additional print
            copies, we may need to charge a reasonable fee.
          </li>
          <li>
            Right to rectification: If your personal data is inaccurate or
            incomplete, you are entitled to ask that we correct or complete it.
            If we shared your personal data with others, we will tell them about
            the correction where possible. If you ask us, and where possible and
            lawful to do so, we will also tell you with whom we shared your
            personal data so you can contact them directly.
          </li>
          <li>
            Right to erasure: You may ask us to delete or remove your personal
            data, such as where our legal basis for the processing is your
            consent and you withdraw consent. If we shared your data with
            others, we will tell them about the erasure where possible. If you
            ask us, and where possible and lawful to do so, we will also tell
            you with whom we shared your personal data with so you can contact
            them directly. We may continue processing personal data where this
            is necessary for a legitimate interest in doing so, as described in
            this Privacy Policy.
          </li>
          <li>
            Right to restrict processing: You may ask us to restrict or ‘block’
            the processing of your personal data in certain circumstances, such
            as where you contest the accuracy of the personal data or object to
            us processing it. We will tell you before we lift any restriction on
            processing. If we shared your personal data with others, we will
            tell them about the restriction where possible. If you ask us, and
            where possible and lawful to do so, we will also tell you with whom
            we shared your personal data so you can contact them directly.
          </li>
          <li>
            Right to data portability: You have the right to obtain your
            personal data from us that you consented to give us or that was
            provided to us as necessary in connection with our contract with
            you. We will provide you with your personal data in a structured,
            commonly used and machine-readable format. You may reuse it
            elsewhere.
          </li>
          <li>
            Right to object: You may ask us at any time to stop processing your
            personal data, and we will do so:
            <ul className="list-none">
              <li className="pl-2 border-l-2 border-gray-500">
                If we are relying on a legitimate interest to process your
                personal data — unless we demonstrate compelling legitimate
                grounds for the processing or
              </li>
              <li className="pl-2 border-l-2 border-gray-500">
                If we are processing your personal data for direct marketing.
              </li>
            </ul>
          </li>
          <li>
            Right to withdraw consent: If we rely on your consent to process
            your personal data, you have the right to withdraw that consent at
            any time. This will not affect the lawfulness of processing of your
            data before we received notice that you wished to withdraw your
            consent.
          </li>
        </ul>
        <p>
          If you wish to exercise any of these rights please contact us as
          described in the “Contact” section below. We may also need to ask you
          for further information to verify your identity before we can respond
          to any request.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          11. Deleting profile details
        </h3>
        <ul>
          <li>
            If you would like to delete your account or profile, please send us
            an email from the phone number that is associated with your account
            to support@getcollabo.io. Please let us know your username in that
            email, so that we may complete your request accurately.
          </li>
          <li>
            You should be aware that it may not be technologically possible to
            remove each and every record of the information you have provided to
            us from our servers. The need to back-up our systems to protect
            information from inadvertent loss means that a copy of your Profile
            may exist in a non-erasable form that may be difficult or impossible
            for us to locate.
          </li>
          <li>
            In addition, we have the right to delete any account at any time if
            required to do so by process of law, or if necessary in order to
            investigate fraud, a violation of our Terms of Use or in connection
            with any harm being caused to a third party or their rights.
          </li>
        </ul>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          12. Contact
        </h3>
        <p>
          Questions, comments or requests regarding this Privacy Policy should
          be addressed to support@getcollabo.io.
        </p>
        <p>
          If you would like to delete your account or profile, please send us an
          email from the phone number that is associated with your Membership
          account to support@getcollabo.io. Please let us know your username in
          that email, so that we may complete your request accurately.
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          13. Changes to our privacy policy
        </h3>
        <p>
          Any changes we may make to our Privacy Policy in the future will be
          posted on this page. Please check back frequently to see any updates
          or modifications. If required by the applicable law, we will notify
          you of any material or substantive changes to this Privacy Policy.
        </p>
      </div>
    );
  };

  return (
    <div className="pt-8 nc-PageSingle lg:pt-16 ">
      <Helmet>
        <title>Privacy Policy | GetCollabo</title>
      </Helmet>
      {renderHeader()}
      <div className="container mt-12 space-y-10 nc-SingleContent">
        {renderContent()}
      </div>
      <div className="relative py-16 lg:py-20"></div>
    </div>
  );
};

export default PrivacyPolicy;