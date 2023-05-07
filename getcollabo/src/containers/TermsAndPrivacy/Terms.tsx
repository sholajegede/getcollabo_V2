import React from "react";
import Badge from "shared/Badge/Badge";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Terms = () => {
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="##" color="green" name="Last updated: 30 April 2023" />
          <h1
            className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
            title="Privacy Policy"
          >
            Terms of Service
          </h1>
          <span className="block pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400">
            PLEASE READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE
            SERVICES.
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
          1. Contractual relationship
        </h3>
        <p>
          These Terms of Use (“Terms”) govern the access or use by you, from
          within territories and possessions, of the applications, websites,
          content, products, and services of the Country in which you are
          situate made available by GetCollabo, it’s subsidiaries,
          representatives, affiliates, officers and directors (hereinafter
          referred to as “GetCollabo”).
        </p>

        <p>
          Your access and use of the Services constitutes your agreement to be
          bound by these Terms, which establishes a contractual relationship
          between you and GetCollabo. If you do not agree to these Terms, you may not
          access or use the Services. These Terms expressly supersede prior
          agreements or arrangements with you. GetCollabo may immediately terminate
          these Terms or any Services with respect to you, or generally cease
          offering or deny access to the Services or any portion thereof, at any
          time for any reason.
        </p>

        <p>
          Supplemental terms may apply to certain Services, such as policies for
          a particular event, activity or promotion, and such supplemental terms
          will be disclosed to you in connection with the applicable Services.
          Supplemental terms are in addition to, and shall be deemed a part of,
          the Terms for the purposes of the applicable Services. Supplemental
          terms shall prevail over these Terms in the event of a conflict with
          respect to the applicable Services.
        </p>

        <p>
          GetCollabo may amend the Terms related to the Services from time to time.
          Amendments will be effective upon GetCollabo posting of such updated Terms
          at this location or the amended policies or supplemental terms on the
          applicable Service. Your continued access or use of the Services after
          such posting constitutes your consent to be bound by the Terms, as
          amended.
        </p>

        <p>
          GetCollabo collection and use of personal information in connection with
          the Services is described in GetCollabo Privacy Statements located here:{" "}
          <Link to="/privacy" className="font-semibold underline">
            Privacy Policy
          </Link>
        </p>

        <h3 className="mt-4 text-neutral-900 font-semibold md:!leading-[120%] dark:text-neutral-100 max-w-4xl">
          2. The services
        </h3>
        <p>
          The Services constitute a technology platform that enables users of
          GetCollabo mobile applications or websites provided as part of the Services
          (each, an “Application”) for Advertisers to develop Social Media
          Marketing Campaigns and to procure the Services of an Influencer who
          would execute Marketing Services based on the information provided by
          Users (the “Services”). Unless otherwise agreed by GetCollabo in a separate
          written agreement with you, the Services are made available solely for
          your personal use.
        </p>

        <p>
          YOU ACKNOWLEDGE THAT GETCOLLABO DOES NOT PROVIDE SOCIAL MEDIA MARKETING
          CAMPAIGNS OR MARKETING SERVICES OR FUNCTION AS AN ADVERTISER OR
          INFLUENCER AND THAT ALL SUCH SERVICES ARE PROVIDED BY INDEPENDENT
          THIRD PARTY CONTRACTORS WHO ARE NOT EMPLOYED BY GETCOLLABO OR ANY OF ITS
          AFFILIATES.
        </p>

        <p>
          <strong>License</strong>
        </p>

        <p>
          Subject to your compliance with these Terms, GetCollabo grants you a
          limited, non-exclusive, non-sublicensable, revocable, non-transferable
          license to: (i) access and use the Applications on your personal
          device solely in connection with your use of the Services; and (ii)
          access and use any content, information and related materials that may
          be made available through the Services, in each case solely for your
          personal, non- commercial use. Any rights not expressly granted herein
          are reserved by GetCollabo and GetCollabo’s licensors.
        </p>

        <p>
          <strong>Restrictions</strong>
        </p>

        <p>
          You may not: (i) remove any copyright, trademark or other proprietary
          notices from any portion of the Services; (ii) reproduce, modify,
          prepare derivative works based upon, distribute, license, lease, sell,
          resell, transfer, publicly display, publicly perform, transmit,
          stream, broadcast or otherwise exploit the Services except as
          expressly permitted by GetCollabo; (iii) decompile, reverse engineer or
          disassemble the Services except as may be permitted by applicable law;
          (iv) link to, mirror or frame any portion of the Services; (v) cause
          or launch any programs or scripts for the purpose of scraping,
          indexing, surveying, or otherwise data mining any portion of the
          Services or unduly burdening or hindering the operation and/or
          functionality of any aspect of the Services; or (vi) attempt to gain
          unauthorized access to or impair any aspect of the Services or its
          related systems or networks.
        </p>

        <p>
          <strong>Provision of the Services</strong>
        </p>

        <p>
          You acknowledge that portions of the Services may be made available
          under GetCollabo various brands or request options. You also acknowledge
          that the Services may be made available under such brands or request
          options by or in connection with: (i) certain of GetCollabo’s subsidiaries
          and affiliates; or (ii) independent Third Party Providers, including
          Marketing Companies or Media House and Network company advertisers,
          Influencers or individuals and/or companies with similar permits,
          authorizations or licenses.
        </p>

        <p>
          <strong>Third Party Services and Content</strong>
        </p>

        <p>
          The Services may be made available or accessed in connection with
          third party services and content (including advertising) that GetCollabo
          does not control. You acknowledge that different terms of use and
          privacy policies may apply to your use of such third party services
          and content. GetCollabo does not endorse such third party services and
          content and in no event shall GetCollabo be responsible or liable for any
          products or services of such third party providers.
        </p>

        <p>
          <strong>Ownership</strong>
        </p>

        <p>
          The Services and all rights therein are and shall remain GetCollabo’s
          property or the property of GetCollabo’s licensors. Neither these Terms nor
          your use of the Services convey or grant to you any rights: (i) in or
          related to the Services except for the limited license granted above;
          or (ii) to use or reference in any manner GetCollabo’s company names,
          logos, product and service names, trademarks or services marks or
          those of GetCollabo’s licensors.
        </p>

        <h3>3. Your use of the services</h3>
        <p>
          <strong>User Accounts</strong>
        </p>
        <p>
          In order to use most aspects of the Services, you must register for
          and maintain an active personal user Services account (“Account”). You
          must be at least 18 years of age, or the age of legal majority in your
          jurisdiction (if different than 18), to obtain an Account. Account
          registration requires you to submit to GetCollabo certain personal
          information, such as your name, address, mobile phone number, and age,
          as well as at least one valid payment method (either a credit card or
          accepted payment partner). You agree to maintain accurate, complete,
          and up-to-date information in your Account. Your failure to maintain
          accurate, complete, and up-to-date Account information, including
          having an invalid or expired payment method on file, may result in
          your inability to access and use the Services or GetCollabo’s termination
          of these Terms with you. You are responsible for all activity that
          occurs under your Account, and you agree to maintain the security and
          secrecy of your Account username and password at all times. Unless
          otherwise permitted by GetCollabo in writing, you may only possess one
          Account.
        </p>

        <p>
          <strong>User Requirements and Conduct</strong>
        </p>
        <p>
          The Service is not available for use by persons under the age of 18.
          You may not authorize third parties to use your Account, and you may
          not allow persons under the age of 18 to receive services from Third
          Party Providers unless they are accompanied by you. You may not assign
          or otherwise transfer your Account to any other person or entity. You
          agree to comply with all applicable laws when using the Services, and
          you may only use the Services for lawful purposes (e.g., no
          dissemination of unlawful or hazardous materials). You will not, in
          your use of the Services, cause nuisance, annoyance, inconvenience, or
          personal damage, whether to the Third Party Provider or any other
          party. In certain instances, you may be asked to provide proof of
          identity to access or use the Services, and you agree that you may be
          denied access to or use of the Services if you refuse to provide proof
          of identity.
        </p>

        <p>
          <strong>User-Provided Content</strong>
        </p>
        <p>
          GetCollabo may, in GetCollabo’s sole discretion, permit you from time to time to
          submit, upload, publish or otherwise make available to GetCollabo through
          the Services textual, audio, and/or visual content and information,
          including commentary and feedback related to the Services, initiation
          of support requests, and submission of entries for competitions and
          promotions (“User Content”). Any User Content provided by you remains
          your property. However, by providing User Content to GetCollabo, you grant
          GetCollabo a worldwide, perpetual, irrevocable, transferable, royalty-free
          license, with the right to sublicense, to use, copy, modify, create
          derivative works of, distribute, publicly display, publicly perform,
          and otherwise exploit in any manner such User Content in all formats
          and distribution channels now known or hereafter devised (including in
          connection with the Services and GetCollabo business and on third-party
          sites and services), without further notice to or consent from you,
          and without the requirement of payment to you or any other person or
          entity.
        </p>
        <p>
          You represent and warrant that: (i) you either are the sole and
          exclusive owner of all User Content or you have all rights, licenses,
          consents and releases necessary to grant GetCollabo the license to the User
          Content as set forth above; and (ii) neither the User Content nor your
          submission, uploading, publishing or otherwise making available of
          such User Content nor GetCollabo’s use of the User Content as permitted
          herein will infringe, misappropriate or violate a third party’s
          intellectual property or proprietary rights, or rights of publicity or
          privacy, or result in the violation of any applicable law or
          regulation.
        </p>
        <p>
          You agree to not provide User Content that is defamatory, libellous,
          hateful, violent, obscene, pornographic, unlawful, or otherwise
          offensive, as determined by GetCollabo in its sole discretion, whether or
          not such material may be protected by law. GetCollabo may, but shall not be
          obligated to, review, monitor, or remove User Content, at GetCollabo’s sole
          discretion and at any time and for any reason, without notice to you.
        </p>
        <p>
          <strong>Network Access and Devices</strong>
        </p>
        <p>
          You are responsible for obtaining the data network access necessary to
          use the Services. Your mobile network’s data and messaging rates and
          fees may apply if you access or use the Services from a
          wireless-enabled device and you shall be responsible for such rates
          and fees. You are responsible for acquiring and updating compatible
          hardware or devices necessary to access and use the Services and
          Applications and any updates thereto. GetCollabo does not guarantee that
          the Services, or any portion thereof, will function on any particular
          hardware or devices. In addition, the Services may be subject to
          malfunctions and delays inherent in the use of the Internet and
          electronic communications.
        </p>

        <h3>4. Payment</h3>
        <p>
          You understand that use of the Services may result in charges to you
          for the services or goods you receive from a Third Party Provider
          (“Charges”). Upon your request to access certain services obtained
          through your use of GetCollabo, GetCollabo will facilitate your payment of the
          applicable Charges on behalf of the Third Party Provider as such Third
          Party Provider’s limited payment collection agent. Payment of the
          Charges in such manner shall be considered the same as payment made
          directly by you to the Third Party Provider. Charges may include other
          applicable fees, including a booking fee, processing fees, and will be
          inclusive of applicable taxes where required by law. Charges paid by
          you are final and non-refundable unless otherwise determined by GetCollabo.
        </p>
        <p>
          All Charges are due immediately and payment will be facilitated by
          GetCollabo using the preferred payment method designated in your Account,
          after which GetCollabo will send you a receipt by email. If your primary
          Account payment method is determined to be expired, invalid or
          otherwise not able to be charged, you agree that GetCollabo may, as the
          Third Party Provider’s limited payment collection agent, use a
          secondary payment method in your Account, if available.
        </p>
        <p>
          As between you and GetCollabo, GetCollabo reserves the right to establish,
          remove and/or revise Charges for any or all services obtained through
          the use of the Services at any time in GetCollabo’s sole discretion.
          Further, you acknowledge and agree that Charges applicable in certain
          geographical areas may increase substantially during times of high
          demand. GetCollabo will use reasonable efforts to inform you of Charges
          that may apply, provided that you will be responsible for Charges
          incurred under your Account regardless of your awareness of such
          Charges or the amounts thereof. GetCollabo may from time to time provide
          certain users with promotional offers and discounts that may result in
          different amounts charged for the same or similar services or goods
          obtained through the use of the Services, and you agree that such
          promotional offers and discounts, unless also made available to you,
          shall have no bearing on your use of the Services or the Charges
          applied to you. You may elect to cancel your request for services from
          a Third Party Provider at any time prior to such Third Party
          Provider’s acceptance, in which case you may be charged a cancellation
          fee.
        </p>
        <p>
          This payment structure is intended to fully compensate the Third Party
          Provider for the services provided.
        </p>

        <h3>5. Disclaimers; limitation of liability; indemnity</h3>
        <p>
          <strong>DISCLAIMER</strong>
        </p>
        <p>
          THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” GETCOLLABO DISCLAIMS
          ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED OR STATUTORY, NOT
          EXPRESSLY SET OUT IN THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NON-INFRINGEMENT. IN ADDITION, GETCOLLABO MAKES NO REPRESENTATION,
          WARRANTY, OR GUARANTEE REGARDING THE RELIABILITY, TIMELINESS, QUALITY,
          SUITABILITY OR AVAILABILITY OF THE SERVICES OR ANY SERVICES OR GOODS
          REQUESTED THROUGH THE USE OF THE SERVICES, OR THAT THE SERVICES WILL
          BE UNINTERRUPTED OR ERROR-FREE. GETCOLLABO DOES NOT GUARANTEE THE QUALITY,
          SUITABILITY, SAFETY OR ABILITY OF THIRD PARTY PROVIDERS. YOU AGREE
          THAT THE ENTIRE RISK ARISING OUT OF YOUR USE OF THE SERVICES, AND ANY
          SERVICE OR GOOD REQUESTED IN CONNECTION THEREWITH, REMAINS SOLELY WITH
          YOU, TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.
        </p>

        <p>
          <strong>LIMITATION OF LIABILITY</strong>
        </p>
        <p>
          GETCOLLABO SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
          EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS,
          LOST DATA, PERSONAL INJURY OR PROPERTY DAMAGE RELATED TO, IN
          CONNECTION WITH, OR OTHERWISE RESULTING FROM ANY USE OF THE SERVICES,
          EVEN IF GETCOLLABO HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          GETCOLLABO SHALL NOT BE LIABLE FOR ANY DAMAGES, LIABILITY OR LOSSES ARISING
          OUT OF: (i) YOUR USE OF OR RELIANCE ON THE SERVICES OR YOUR INABILITY
          TO ACCESS OR USE THE SERVICES; OR (ii) ANY TRANSACTION OR RELATIONSHIP
          BETWEEN YOU AND ANY THIRD PARTY PROVIDER, EVEN IF GETCOLLABO HAS BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. GETCOLLABO SHALL NOT BE LIABLE
          FOR DELAY OR FAILURE IN PERFORMANCE RESULTING FROM CAUSES BEYOND
          GETCOLLABO’S REASONABLE CONTROL.
        </p>
        <p>
          YOU ACKNOWLEDGE THAT THIRD PARTY MARKETING PROVIDERS PROVIDING
          MARKETING PLATFORM AND CAMPAIGN SERVICES REQUESTED THROUGH SOME
          REQUEST BRANDS MAY NOT BE PROFESSIONALLY LICENSED OR PERMITTED.
        </p>
        <p>
          GETCOLLABO’S SERVICES MAY BE USED BY YOU TO REQUEST AND SCHEDULE MARKETING
          SERVICES OR CAMPAIGNS WITH THIRD PARTY PROVIDERS, BUT YOU AGREE THAT
          GETCOLLABO HAS NO RESPONSIBILITY OR LIABILITY TO YOU RELATED TO ANY
          MARKETING SERVICES, OR CAMPAIGNS PROVIDED TO YOU BY THIRD-PARTY
          PROVIDERS OTHER THAN AS EXPRESSLY SET FORTH IN THESE TERMS.
        </p>
        <p>
          THE LIMITATIONS AND DISCLAIMER IN THIS SECTION 5 DO NOT PURPORT TO
          LIMIT LIABILITY OR ALTER YOUR RIGHTS AS A CONSUMER THAT CANNOT BE
          EXCLUDED UNDER APPLICABLE LAW.
        </p>

        <p>
          <strong>Indemnity</strong>
        </p>
        <p>
          You agree to indemnify and hold GetCollabo and its officers, directors,
          employees and agents harmless from any and all claims, demands,
          losses, liabilities, and expenses (including attorneys’ fees) arising
          out of or in connection with: (i) your use of the Services or services
          or goods obtained through your use of the Services; (ii) your breach
          or violation of any of these Terms; (iii) GetCollabo’s use of your User
          Content; or (iv) your violation of the rights of any third party,
          including Third-Party Providers.
        </p>

        <h3>6. Governing law; arbitration</h3>
        <p>
          Except as otherwise set forth in these Terms, these Terms shall be
          exclusively governed by and construed in accordance with the laws of
          The United Kingdom. Any dispute, conflict, claim or controversy
          arising out of or broadly in connection with or relating to the
          Services or these Terms, including those relating to its validity, its
          construction or its enforceability (any “Dispute”) shall be first
          mandatorily submitted under the rules of or by the LCIA, the London
          Court of International Arbitration, the London Court of Arbitration or
          the London Court, the parties thereto shall be taken to have agreed in
          writing that any arbitration between them shall be conducted in
          accordance with the LCIA Rules or such amended rules as the LCIA may
          have adopted hereafter to take effect before the commencement of the
          arbitration and that such LCIA Rules form part of their agreement
          (collectively, the “Arbitration Agreement”). These LCIA Rules comprise
          this Preamble, the Articles, and the Index, together with the Annex to
          the LCIA Rules and the Schedule of Costs as both from time to time may
          be separately amended by the LCIA (the “LCIA Rules”).
        </p>

        <h3>7. Other provisions</h3>
        <p>
          <strong>Claims of Copyright Infringement</strong>
        </p>
        <p>
          Claims of copyright infringement should be sent to GetCollabo’s designated
          agent. Please visit GetCollabo’s web page at www.getcollabo.io for the
          designated address and additional information.
        </p>

        <p>
          <strong>Notice</strong>
        </p>
        <p>
          GetCollabo may give notice by means of a general notice on the Services,
          electronic mail to your email address in your Account, or by written
          communication sent to your address as set forth in your Account. You
          may give notice to GetCollabo by written communication to GetCollabo's address.
        </p>

        <p>
          <strong>General</strong>
        </p>
        <p>
          You may not assign or transfer these Terms in whole or in part without
          GetCollabo’s prior written approval. You give your approval to GetCollabo for it
          to assign or transfer these Terms in whole or in part, including to:
          (i) a subsidiary or affiliate; (ii) an acquirer of GetCollabo’s equity,
          business or assets; or (iii) a successor by merger. No joint venture,
          partnership, employment or agency relationship exists between you,
          GetCollabo or any Third Party Provider as a result of the contract between
          you and GetCollabo or use of the Services.
        </p>
        <p>
          If any provision of these Terms is held to be illegal, invalid or
          unenforceable, in whole or in part, under any law, such provision or
          part thereof shall to that extent be deemed not to form part of these
          Terms but the legality, validity, and enforceability of the other
          provisions in these Terms shall not be affected. In that event, the
          parties shall replace the illegal, invalid or unenforceable provision
          or part thereof with a provision or part thereof that is legal, valid
          and enforceable and that has, to the greatest extent possible, a
          similar effect as the illegal, invalid or unenforceable provision or
          part thereof, given the contents and purpose of these Terms. These
          Terms constitute the entire agreement and understanding of the parties
          with respect to its subject matter and replaces and supersedes all
          prior or contemporaneous agreements or undertakings regarding such
          subject matter. In these Terms, the words “including” and “include”
          mean “including, but not limited to.”
        </p>

        <h3>8. Advertising on GetCollabo limits the following:</h3>
        <p>
          <strong>(a) Alcohol Content:</strong> The target audience is
          restricted to the age of appropriation [18 and over] and are entirely
          prohibited in some countries, including, but not limited to Gambia,
          Egypt, Afghanistan, Brunei, Bangladesh, Kuwait, Libya, and Turkey. Age
          appropriation and other policies regarding alcohol marketing and
          distribution must be adhered to as per government regulations in your
          locale.
        </p>

        <p>
          <strong>(b) Discriminatory Practices:</strong> Ads must not
          discriminate or encourage discrimination against people based on
          personal attributes such as race, ethnicity, color, national origin,
          religion, age, sex, sexual orientation, gender identity, family
          status, disability, medical or genetic condition.
        </p>
        <p>
          <strong>(c) Government and Social Affairs:</strong> Government
          advertisements and Social Issues which include community based
          developments, economic processes and societal trends are allowed with
          the condition that they bear factual information and do not contain
          misleading information.
        </p>
        <p>
          <strong>(d) Pharmaceuticals:</strong> Prescription medication is
          prohibited be promoted through GetCollabo. Over-the-counter drugs on the
          other hand are permitted as long as they comply with the local
          government regulation.
        </p>
        <p>
          <strong>(e) Political Content:</strong>
          <ul>
            <li>
              This includes an ad that:
              <ul className="list-none">
                <li className="pl-2 border-l-2 border-gray-500">
                  is made by, on behalf of or about a candidate for public
                  office, a political figure, a political party, a political
                  action committee or advocates for the outcome of an election
                  to public office; or
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  is about any election, referendum or ballot initiative,
                  including "get out the vote" or election information
                  campaigns; or
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  is about any social issue in any place where the ad is being
                  run; or
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  is regulated as political advertising
                </li>
              </ul>
            </li>

            <li>
              Political campaigns are allowed on this platform as long as they
              comply with the following terms:
              <ul className="list-none">
                <li className="pl-2 border-l-2 border-gray-500">
                  They must display factual information about their past
                  accomplishments and their present fulfilled agenda.
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  They must not contain prejudice against any political rival or
                  acquaintance. Under-the-belt politics will not be endorsed.
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  Your disclaimer must accurately represent the name of the
                  entity or person responsible for the ad.
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  Your disclaimer must not include URLs or acronyms unless URLs
                  or acronyms make up the name of the organisation, which must
                  also be accurately reflected on the website provided
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  Your disclaimer must not include profanity, objectionable
                  language or unrecognisable words or phrases.
                </li>
                <li className="pl-2 border-l-2 border-gray-500">
                  Your disclaimer must not wrongfully imply that a foreign
                  leader is responsible for the ad.
                </li>
              </ul>
            </li>
          </ul>
        </p>
        <p>
          <strong>(f) Inappropriate Content:</strong> Sexual content, gambling,
          cryptocurrency, spyware or malware, drug and drug paraphernalia,
          copyright and trademark infringement, counterfeit goods, unauthorized
          ticket sales and weapons and weapons accessories are prohibited.
        </p>
        <p>
          See the description under “Inappropriate content for further details”
        </p>

        <h3>9. Inappropriate content</h3>
        <p>
          <strong>(a) Sexual Content:</strong> Sexual content is prohibited from
          this channel, including and not restricted to:
          <ul>
            <li>Pornography</li>
            <li>Escort services and prostitution</li>
            <li>Full and partial nudity</li>
            <li>Modelled clothing that is sexual in nature</li>
            <li>
              Dating sites which focus on facilitating sexual encounters or
              infidelity
            </li>
            <li>
              Dating sites in which money, goods or services are exchanged in
              return for a date
            </li>
          </ul>
        </p>
        <p>
          <strong>(b) Gambling content:</strong> Gambling content is prohibited
          in and around the GetCollabo platform.
        </p>
        <p>
          <strong>(c) Cryptocurrency:</strong> Promotion of trading or mining
          any cryptocurrency is prohibited.
        </p>
        <p>
          <strong>(d) Drug and Drug paraphernalia:</strong> Promotion of any
          illegal substances according to local state laws is prohibited. This
          includes and is not limited to: illegal drugs, recreational and herbal
          drugs, accessories associated with drug use, drug dispensaries, and
          depictions of hard drug use.
        </p>
        <p>
          <strong>(e) Trademark and copyright infringement:</strong>{" "}
          International trademark and copyright laws must be adhered to when
          driving any campaign so as not do display:
          <ul>
            <li>
              Content that misleads users about the advertiser’s brand
              affiliation.
            </li>
            <li>
              Links, images, or other embedded media that could create user
              confusion regarding the advertiser's brand affiliation.
            </li>
            <li>
              Promoted Trend names that feature third-party names in a way that
              could mislead users about the advertiser’s brand affiliation.
            </li>
          </ul>
        </p>
        <p>
          <strong>(f) Weapons and weapon accessories:</strong> Promotion of
          gadgets that pose a danger to the safety of its user and those in
          their surrounding is prohibited. Weapons and their accessories, in
          particular, are not allowed.
        </p>
      </div>
    );
  };

  return (
    <div className="pt-8 nc-PageSingle lg:pt-16 ">
      <Helmet>
        <title>Terms of Service | GetCollabo</title>
      </Helmet>
      {renderHeader()}
      <div className="container mt-12 space-y-10 nc-SingleContent">
        {renderContent()}
      </div>
      <div className="relative py-16 lg:py-20"></div>
    </div>
  );
};

export default Terms;