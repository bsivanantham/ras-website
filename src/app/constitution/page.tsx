import Link from "next/link";
import { ScrollText, ChevronRight } from "lucide-react";
import SeychellesFlag from "@/components/SeychellesFlag";

const articles = [
  {
    number: "I",
    title: "Name of the Association",
    content: [
      {
        text: 'The name of the association shall be "Retailers Association of Seychelles" hereinafter referred to as the "Association".',
      },
    ],
  },
  {
    number: "II",
    title: "Place of the Meeting",
    content: [
      {
        text: "The Management Committee shall decide and arrange a conducive place for the meetings.",
      },
    ],
  },
  {
    number: "III",
    title: "Aims & Objects",
    intro: "The aims and objects for which the Association is formed are:",
    content: [
      { label: "a", text: "To bring and maintain good standards in the retail business of all kinds in the Republic of Seychelles." },
      { label: "b", text: "To protect, safeguard and represent the interests of all the retail traders, merchants, businessmen, and shop-keepers for all issues affecting them individually or collectively and to voice the interests with Government of Seychelles and its Agencies." },
      { label: "c", text: "To foster goodwill, understanding and good fellowship among members of the Association and the consumers as a whole." },
      { label: "d", text: "To nurture, develop and maintain good relationship with the Agencies of the Government so as to better achieve the objectives of this Association." },
      { label: "e", text: "To extend all kinds of help to fellow members of the Association at the time of need." },
      { label: "f", text: "To hold gatherings so as to discuss the development of the retail business in the Republic of Seychelles and the objectives of the Association." },
    ],
  },
  {
    number: "IV",
    title: "Membership",
    content: [
      {
        subtitle: "Eligibility",
        text: "All retailers duly licensed by the Seychelles Licensing Authority carrying on the business of retail of general merchandise, shop keepers, small merchants in the Republic of Seychelles, as would be approved by the Management Committee are eligible to become a member of the Association. The membership shall remain on the licensee's name of the shop. As and when the licensee has leased the shop out to a lessee, either the licensee or the lessee as would be decided by the lessee shall represent the meetings including voting.",
      },
      {
        subtitle: "Mode of Application",
        text: "Any eligible person as stated above, who desires to become a member shall complete the prescribed form available from the Management Committee and pay the prescribed membership fee. The Management Committee shall, upon receipt of the application from duly filled in and upon receipt of the subscription, discuss and decide to admit or reject the applicant. The member, upon admission shall be entitled to all privileges of the Association. There shall be no limit to the number of the members of the Association. Any member may resign at any time and upon request be re-admitted by the Management at its sole discretion.",
      },
    ],
  },
  {
    number: "V",
    title: "Membership Fees",
    content: [
      {
        text: "The annual membership fee to be paid on or before 31st March of every year shall be SR 500.00 (Five Hundred only). The Membership fee may be revised by the General Body upon recommendation by the Management Committee. Any member joining during the second half of the financial year may be required to pay only half of the membership fee. Any member who allows his subscription to the Association to be in arrears for more than 2 months from the due date, shall cease to be a member of the Association.",
      },
    ],
  },
  {
    number: "VI",
    title: "Annual General Meeting",
    content: [
      {
        subtitle: "(I) Annual General Meeting",
        text: "In order to elect a proper Management Committee, to conduct all businesses relevant to the affairs of the Association and to carry out other statutory transactions of the Association, an Annual General Meeting shall be held every year. The Annual General Meeting shall be held not later than 3 months of the closing of the financial year namely, 31st December and members shall be given 14 days' notice in a national daily newspaper and individually to the members as regards time, place and date of the Meeting.",
      },
      {
        subtitle: "(II) Business of the Annual General Meeting",
        items: [
          "To receive the Management Committee's report on the workings of the Association of the previous year.",
          "To receive Treasurer's report and adopt the audited accounts of the Association of the previous year.",
          "To elect a Management Committee and to appoint auditor for the ensuing year.",
          "To transact and deal with such other matters as may be placed before it.",
        ],
      },
      {
        subtitle: "(b) Extraordinary General Meeting",
        text: "An Extraordinary General Meeting may be held:",
        items: [
          "At any time by the Management Committee.",
          "At the written request of at least twenty members of the Association. The chairman of the Association shall arrange to hold the Extraordinary General Meeting within 2 months of the receipt of such request stating the purpose of which the meeting is required.",
        ],
      },
      {
        subtitle: "(c) Annual Report and Statement of Accounts",
        text: "The annual report and audited statement of accounts of the Association for the period ended 31st March of the preceding year shall be presented by the outgoing management committee to those members present at the Annual General Meeting.",
      },
      {
        subtitle: "(d) Quorum",
        text: "There must be at 20 members or one third of the registered members whichever is lesser shall be present in any General Meeting to constitute quorum. No business shall be transacted at any meeting unless quorum of members is present at the time when the meeting proceeds to business. In the absence of necessary quorum, the meeting shall be adjourned to a day in the next one week at the same time. If within one hour from the time prescribed for the meeting, a quorum is not present, the meeting shall stand adjourned to the same day on the following week or as may be decided by the management committee. In case of lack of quorum on the adjourned meeting, the members present shall have power to proceed with the business of the day except the amendment of the Constitution.",
      },
    ],
  },
  {
    number: "VII",
    title: "Management Committee",
    content: [
      {
        subtitle: "a. Composition",
        text: "The Management of the Association shall be vested with a management committee which shall be elected at the Annual General Meeting which shall consist of 11 members in addition to 1 Ex officio member who shall be the chairman of the previous committee.",
      },
      {
        subtitle: "b. Office Bearers",
        text: "From and out of the management committee, the following posts shall be filled in by election within the management committee or by consensus reached among the elected members of the management committee:",
        items: [
          "1 Chairman",
          "1 Vice Chairman",
          "1 Secretary",
          "1 Assistant Secretary",
          "1 Treasurer",
          "1 Assistant Treasurer",
          "5 Committee Members",
        ],
        note: "Mode of Voting: The voting for the election of management Committee by the general members in the Annual General Meeting shall be by printed balloting.",
      },
      {
        subtitle: "c. Election of the Management Committee",
        text: "Nominations of all candidates for the committee members shall be in writing, signed by the proposer and seconder and shall be received by the Secretary 7 days before such General Meeting. The nomination form shall be void unless the candidate shall have expressed to the Secretary in writing his/her willingness to stand for election at least 7 days before the date of such general Meeting. If the valid nominations received are more than the number required for each office, the candidates securing the highest number of votes at the general meeting shall be deemed elected, and shall hold office until the next Annual General Meeting.",
      },
      {
        subtitle: "d. Loss of Office",
        text: "If a Member of the Management Committee fails to attend three consecutive meetings of the Management Committee without any leave and or apologies, he shall be deemed to have resigned and stands to lose the office.",
      },
      {
        subtitle: "e. Conduct of Meetings",
        text: "The meetings of the Management Committee shall take place not less than once in a month. At any meeting of the Management Committee, 5 members shall constitute quorum. If within half an hour from the time appointed for the meeting, a quorum is not present, the meeting shall stand adjourned to a suitable future date to be determined by the Chairman within one month from the date of the adjourned meeting and all members of the management committee shall be notified of such adjourned date at least five days before the date of the meeting. If at the adjourned meeting, quorum is not present within fifteen minutes from the time appointment for the meeting, the members present shall have the power to proceed with the business of the day.",
      },
      {
        subtitle: "f. Functions of the Management Committee",
        text: "The funds and affairs of the Association shall be managed and carried by the Management Committee. The management committee is empowered to accept and receive donations and grants on behalf of the Association.",
      },
      {
        subtitle: "g. Duties of Office Bearers",
        items: [
          "The Chairman shall preside over the regular and general meetings and shall be responsible for the proper conduct of all such meetings. He shall have the casting vote and shall sign the minutes of each meeting at the time they are approved.",
          "The Vice Chairman shall assist the Association during the absence of the Chairman and shall have power to preside over the meeting.",
          "The Secretary shall conduct the business of the Association in accordance with the rules and shall carry out the instructions of the Annual General Meeting, any EGM or meetings convened at any time. He shall be responsible for all the correspondences, books, documents and papers, the accounts and financial records of the Association. He shall attend all meetings and record the proceedings in the form of minutes and keep a record of minutes of the Management Committee. The Assistant Secretary shall in the absence of the Secretary or as authorised by the Management committee and or as authorised by the Secretary shall carry out the duties of the Secretary.",
          "The Treasurer shall be responsible for the finances of the Association and he shall keep the accounts of all financial transactions of the Association properly and diligently. He shall be responsible to prepare and table statements of accounts of the Association once in three months of the financial year at the management committee meetings while he is also responsible to submit proper accounts to the auditor of the Association before the Annual General Meeting. The Assistant Treasurer shall in the absence of the Treasurer or as authorised by the Management committee and or as authorised by the Treasurer shall carry out the duties of the Treasurer.",
          "Other Committee Members shall assist in the running of the Association in accordance with its rules as and when they are required to do so.",
        ],
      },
    ],
  },
  {
    number: "XI",
    title: "Dissolution",
    content: [
      {
        text: "The Association may be voluntarily dissolved by a special resolution passed at the general meeting provided that at least 90% of the total membership vote in favor of the resolution of such dissolution.",
      },
    ],
  },
  {
    number: "XII",
    title: "Amendment",
    content: [
      {
        text: "Only by the majority votes of 2/3rd of the members present at an extraordinary or annual general meeting, any amendment of this constitution is permissible while any member desirous to amend the existing regulations should bring in a special notice three weeks before such meetings. Any such amendment shall be brought to the Registrar of Associations and record the same in the Registry. All such amendment duly approved shall be binding on the members of the Association. This constitution and its amendments shall be recorded in a book maintained by the Association and is open to inspection by the members of the Association.",
      },
    ],
  },
  {
    number: "XIII",
    title: "Provisions Not Provided For",
    content: [
      {
        text: "All matters not specifically provided for in this Constitution shall be left to the discretion of the Management Committee, subject to the provisions of the Association Act in the Seychelles. The ruling of the Management Committee shall be final and conclusive unless countermanded by the decision of the members present in an annual general or extraordinary general meetings.",
      },
    ],
  },
  {
    number: "XIV",
    title: "Interpretation",
    content: [
      {
        text: "Any question as to the interpretation of the provisions of this Constitution shall be left to the reasoning of the Management Committee whose decision on any point shall be final unless countermanded by the decision of a General Meeting.",
      },
    ],
  },
  {
    number: "XV",
    title: "General Provisions",
    content: [
      {
        text: "All matters not specifically provided for by these rules and regulations shall be left to the discretion of the management committee whose decisions shall be conclusive and final, unless countermanded by the decision of a General meeting. Any question as to the interpretation of the rules and regulations and the by-laws shall be left to the Management Committee whose decision on any point shall be final countermanded by the decision of the General Meeting.",
      },
    ],
  },
];

export default function ConstitutionPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-[#0D3572] text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none">
          <SeychellesFlag width={320} height={213} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Constitution</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/20">
              <ScrollText className="h-5 w-5 text-[#C9A227]" />
            </div>
            <p className="text-[#C9A227] text-sm font-semibold uppercase tracking-wider">
              Governance
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">
            RAS Constitution
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl">
            The governing document of the Retailers Association of Seychelles, outlining our
            objectives, membership rules, and management structure.
          </p>
        </div>
      </section>

      {/* Notice */}
      <div className="bg-[#C9A227]/15 border-b border-[#C9A227]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-[#0D3572]">
            This constitution is the foundational governing document of the Retailers Association of
            Seychelles. Amendments require a 2/3 majority at a General Meeting and must be recorded
            with the Registrar of Associations.
          </p>
        </div>
      </div>

      {/* Constitution Articles */}
      <section className="py-16 bg-[#EFF4FF]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          {articles.map((article) => (
            <div
              key={article.number}
              className="bg-white rounded-2xl border border-[#0D3572]/10 shadow-sm overflow-hidden"
            >
              {/* Article Header */}
              <div className="bg-[#0D3572] px-6 py-4 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A227]/20 shrink-0">
                  <span className="text-[#C9A227] text-sm font-bold">{article.number}</span>
                </div>
                <h2 className="text-white font-bold text-lg">{article.title}</h2>
              </div>

              {/* Article Body */}
              <div className="px-6 py-6 space-y-5">
                {"intro" in article && (
                  <p className="text-gray-700 leading-relaxed text-sm">{article.intro}</p>
                )}

                {article.content.map((block, idx) => (
                  <div key={idx} className="space-y-3">
                    {"subtitle" in block && block.subtitle && (
                      <h3 className="font-semibold text-[#0D3572] text-sm uppercase tracking-wide">
                        {block.subtitle}
                      </h3>
                    )}

                    {"text" in block && block.text && (
                      <p className="text-gray-700 leading-relaxed text-sm">{block.text}</p>
                    )}

                    {"label" in block && (
                      <div className="flex items-start gap-3">
                        <span className="text-[#C9A227] font-bold text-sm mt-0.5 shrink-0 w-5">
                          {block.label}.
                        </span>
                        <p className="text-gray-700 leading-relaxed text-sm">{block.text}</p>
                      </div>
                    )}

                    {"items" in block && block.items && (
                      <ul className="space-y-2 mt-2">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#C9A227] font-bold shrink-0 mt-0.5 text-sm">
                              {i + 1}.
                            </span>
                            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {"note" in block && block.note && (
                      <div className="bg-[#EFF4FF] rounded-lg px-4 py-3 text-sm text-[#0D3572] leading-relaxed">
                        <strong>Note:</strong> {block.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            This constitution is maintained by the Retailers Association of Seychelles and is open
            to inspection by all members. For queries or amendment proposals, contact the Secretary.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              href="/about"
              className="text-sm font-medium text-[#0D3572] hover:text-[#C9A227] transition-colors"
            >
              ← Back to About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-[#0D3572] hover:text-[#C9A227] transition-colors"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
