window.MATERIALS = window.MATERIALS || {};
Object.assign(window.MATERIALS, {
  h1: {
    unitId: "h1",
    title: "サイバーセキュリティ関連法規",
    sections: [
      {
        heading: "不正アクセス禁止法",
        body: '<p><b>不正アクセス禁止法</b>は、他人のID・パスワードを無断で使ってログインしたり、認証を回避してシステムに侵入したりする行為を処罰する法律です。実際に被害が発生していなくても、不正にログインした時点で成立します。また、他人のID・パスワードを不正に取得・保管・提供する行為（フィッシングでの取得なども含む）も規制対象です。</p>'
      },
      {
        heading: "刑法によるサイバー犯罪の処罰",
        body: '<p>刑法には、ウイルスを作成・提供する行為を処罰する「不正指令電磁的記録に関する罪」や、サーバに大量アクセスを行い機能を停止させる行為を処罰する「電子計算機損壊等業務妨害罪」などの規定があります。不正アクセス禁止法が「侵入（ログイン）」を対象とするのに対し、刑法のこれらの罪は「破壊・妨害・ウイルスの作成」といった行為を対象とする点が異なります。</p>'
      },
      {
        heading: "どの法律が誰に適用されるか",
        body: '<p>サイバーセキュリティ基本法は、国や重要インフラ事業者に対しセキュリティ対策の責務を定める法律で、個人の犯罪行為を直接処罰するものではありません。電子署名法は、電子契約に手書きの署名や押印と同等の法的効力を与えるための法律です。試験では「この行為はどの法律に違反するか」「違反した場合、行為者はどうなるか（懲役・罰金）」という形で、行為と法律の対応関係が問われます。</p>',
        svg: '<svg viewBox="0 0 640 180" width="100%" style="max-width:640px;height:auto"><rect x="20" y="55" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="120" y="80" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">①ID/PW無断使用</text><text x="120" y="98" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">でログイン試行</text><rect x="240" y="55" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="340" y="80" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">②認証回避で</text><text x="340" y="98" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">ログイン成功</text><rect x="460" y="55" width="180" height="60" rx="6" fill="none" stroke="var(--crit)"/><text x="550" y="80" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③不正アクセス</text><text x="550" y="98" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">禁止法違反が成立</text><line x1="220" y1="85" x2="235" y2="85" stroke="var(--indigo)" stroke-width="2"/><polygon points="235,85 225,80 225,90" fill="var(--indigo)"/><line x1="440" y1="85" x2="455" y2="85" stroke="var(--indigo)" stroke-width="2"/><polygon points="455,85 445,80 445,90" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、各法律の対象行為や罰則の有無を問う四択が出題されます。科目Bでは、攻撃者の行為が時系列で示され「この行為は不正アクセス禁止法・刑法のどちらに、どの条項に該当する可能性があるか」を記述させる問題が出ます。「悪いことをした」で終わらせず、どの法律のどの行為類型に当たるかまで具体的に答える必要があります。</p>'
      }
    ],
    terms: [
      { term: "不正アクセス禁止法", desc: "他人のID・パスワードの無断使用やログイン、認証回避を処罰する法律。" },
      { term: "不正指令電磁的記録に関する罪", desc: "ウイルスの作成・提供を処罰する刑法上の罪（通称ウイルス作成罪）。" },
      { term: "電子計算機損壊等業務妨害罪", desc: "サーバなどへの攻撃で業務を妨害する行為を処罰する刑法上の罪。" },
      { term: "サイバーセキュリティ基本法", desc: "国や重要インフラ事業者のセキュリティ対策の責務を定める法律。" },
      { term: "電子署名法", desc: "電子契約に手書き署名・押印と同等の法的効力を与える法律。" },
      { term: "識別符号", desc: "ID・パスワードなど本人確認に使われる符号。不正アクセス禁止法の用語。" }
    ]
  },
  h2: {
    unitId: "h2",
    title: "個人情報保護法とプライバシー",
    sections: [
      {
        heading: "個人情報とは何か",
        body: '<p>個人情報保護法における「個人情報」とは、氏名や生年月日など特定の個人を識別できる情報のことです。中でも人種・病歴・犯罪歴などは「要配慮個人情報」として、取得・利用に本人の同意が必要となるなど、より厳しく扱われます。氏名などを削除・置換して特定の個人を識別できないよう加工した「仮名加工情報」「匿名加工情報」は、一定の条件のもとで通常の個人情報より柔軟に扱うことが認められています。</p>'
      },
      {
        heading: "漏えい時の報告義務",
        body: '<p>個人データの漏えい等が発生し、要配慮個人情報を含む場合や財産的被害のおそれがある場合、不正目的の行為による場合、1,000人を超える漏えいの場合などに該当すると、<b>個人情報保護委員会</b>への報告が法律上の義務となります。まず概ね3〜5日以内に速報を行い、その後30日（不正目的の場合は60日）以内に詳しい確報を行います。あわせて被害を受けた本人への通知も原則として必要です。報告を怠ると是正命令の対象となり、命令に従わない場合は罰則が科されます。</p>',
        svg: '<svg viewBox="0 0 640 230" width="100%" style="max-width:640px;height:auto"><rect x="10" y="30" width="290" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="155" y="60" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">①漏えいを認知し</text><text x="155" y="78" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">該当性を判定</text><rect x="320" y="30" width="310" height="70" rx="6" fill="none" stroke="var(--indigo)"/><text x="475" y="60" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">②委員会へ速報</text><text x="475" y="78" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(概ね3〜5日以内)</text><rect x="320" y="140" width="310" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="475" y="170" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③確報</text><text x="475" y="188" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(30日/60日以内)</text><rect x="10" y="140" width="290" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="155" y="170" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">④本人への通知</text><text x="155" y="188" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(原則必要)</text><line x1="300" y1="65" x2="315" y2="65" stroke="var(--indigo)" stroke-width="2"/><polygon points="315,65 305,60 305,70" fill="var(--indigo)"/><line x1="475" y1="100" x2="475" y2="135" stroke="var(--indigo)" stroke-width="2"/><polygon points="475,135 469,125 481,125" fill="var(--indigo)"/><line x1="320" y1="175" x2="305" y2="175" stroke="var(--indigo)" stroke-width="2"/><polygon points="305,175 315,170 315,180" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "安全管理措置の義務",
        body: '<p>個人情報取扱事業者には、取り扱う個人データの漏えい・滅失・毀損を防ぐために必要かつ適切な「安全管理措置」を講じる義務があります。これは組織的・人的・物理的・技術的の4つの側面から求められ、アクセス制御や従業員教育、入退室管理などがこれにあたります。委託先に個人データの取り扱いを委託する場合は、委託先に対する必要かつ適切な監督義務も負います。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、要配慮個人情報の具体例や、報告義務が発生する条件、報告期限の日数を問う四択が出題されます。科目Bでは、漏えい事故のシナリオが示され「この事案は個人情報保護委員会への報告義務が発生する条件を満たすか、理由とともに述べよ」「委託先の監督義務として何を行うべきだったか」を記述させる問題が頻出です。「義務があるかないか」だけでなく、条文上の該当理由を具体的に書けるようにしておきましょう。</p>'
      }
    ],
    terms: [
      { term: "個人情報", desc: "氏名や生年月日など、特定の個人を識別できる情報。" },
      { term: "要配慮個人情報", desc: "人種・病歴・犯罪歴など特に慎重な扱いが求められる個人情報。" },
      { term: "仮名加工情報", desc: "他の情報と照合しない限り個人を識別できないよう加工した情報。" },
      { term: "匿名加工情報", desc: "特定の個人を識別できないよう加工し、復元もできない情報。" },
      { term: "個人情報保護委員会", desc: "個人情報保護法を所管し、漏えい報告の受付・監督を行う行政機関。" },
      { term: "安全管理措置", desc: "個人データの漏えい等を防ぐための組織的・人的・物理的・技術的対策。" },
      { term: "委託先の監督義務", desc: "個人データの取扱いを委託した際、委託先を適切に監督する義務。" },
      { term: "漏えい等の報告義務", desc: "一定の条件に該当する漏えいが発生した際、委員会への報告と本人通知を行う義務。" }
    ]
  },
  h3: {
    unitId: "h3",
    title: "基準・ガイドライン",
    sections: [
      {
        heading: "なぜ複数の基準があるのか",
        body: '<p>セキュリティ対策の「型」を示す基準・ガイドラインは複数存在し、それぞれ目的や対象範囲が異なります。すべてを暗記するより、「誰のため・何のための基準か」という軸で整理して覚えると混同しにくくなります。</p>'
      },
      {
        heading: "代表的な基準・ガイドラインの違い",
        body: '<p><b>NIST CSF</b>（サイバーセキュリティフレームワーク）は、「識別・防御・検知・対応・復旧」という考え方の枠組みを示すもので、業種を問わず参考にされます。<b>CIS Controls</b>は、優先順位付けされた具体的な対策項目のチェックリストで、何を・どこまでやるべきかの実務的な指針になります。<b>ISMAP</b>は、政府機関がクラウドサービスを調達する際に安全性を評価するための日本の制度です。<b>PCI DSS</b>は、クレジットカード情報を扱う事業者に対して定められた業界標準の基準です。</p>',
        svg: '<svg viewBox="0 0 640 260" width="100%" style="max-width:640px;height:auto"><rect x="20" y="20" width="280" height="100" rx="6" fill="none" stroke="var(--grid)"/><text x="160" y="55" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">NIST CSF</text><text x="160" y="78" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">考え方の枠組み</text><text x="160" y="96" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(識別→防御→検知→対応→復旧)</text><rect x="340" y="20" width="280" height="100" rx="6" fill="none" stroke="var(--grid)"/><text x="480" y="55" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">CIS Controls</text><text x="480" y="78" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">具体的な対策項目の</text><text x="480" y="96" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">チェックリスト</text><rect x="20" y="140" width="280" height="100" rx="6" fill="none" stroke="var(--grid)"/><text x="160" y="175" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">ISMAP</text><text x="160" y="198" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">政府のクラウド調達における</text><text x="160" y="216" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">安全性評価制度</text><rect x="340" y="140" width="280" height="100" rx="6" fill="none" stroke="var(--grid)"/><text x="480" y="175" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">PCI DSS</text><text x="480" y="198" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">クレジットカード情報を扱う</text><text x="480" y="216" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">事業者向け基準</text></svg>'
      },
      {
        heading: "枠組みか、チェックリストか",
        body: '<p>NIST CSFのように「考え方の枠組み」を示す基準と、CIS ControlsやPCI DSSのように「具体的にやるべきこと」を列挙した基準は性格が異なります。前者は自社の状況に合わせて対策の全体像を設計する際に、後者は実際に何を導入・運用すべきかを決める際に使われます。ISMAPのように特定の調達・分野に限定して使われる基準もあり、対象範囲の違いも押さえておく必要があります。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、各基準・ガイドラインの名称と目的・対象を組み合わせて問う四択が頻出します（過去に出題実績あり）。科目Bでは、これらの基準を直接記述させるよりも、基準に基づく対策（最小権限の原則やログ管理など）が事例の中でどう活きるかという形で間接的に問われることが多く、名称と中身を結びつけて理解しておくことが対策になります。</p>'
      }
    ],
    terms: [
      { term: "NIST CSF", desc: "識別・防御・検知・対応・復旧の考え方を示すサイバーセキュリティの枠組み。" },
      { term: "CIS Controls", desc: "優先順位付けされた具体的な対策項目のチェックリスト。" },
      { term: "ISMAP", desc: "政府機関のクラウドサービス調達における安全性評価制度（日本）。" },
      { term: "PCI DSS", desc: "クレジットカード情報を扱う事業者向けの業界標準セキュリティ基準。" },
      { term: "ガイドライン", desc: "具体的な実施方法や手順を示す指針文書。" },
      { term: "フレームワーク", desc: "対策を体系的に整理するための考え方の枠組み。" }
    ]
  },
  h4: {
    unitId: "h4",
    title: "支援士制度と倫理",
    sections: [
      {
        heading: "情報処理安全確保支援士とは",
        body: '<p>情報処理安全確保支援士（登録セキスペ）は、試験合格後に登録することで名乗れる国家資格です。試験合格そのものではなく、登録して初めて「情報処理安全確保支援士」を名乗ることができ、登録後は3年ごとの更新と、継続的な講習の受講が義務付けられています。</p>'
      },
      {
        heading: "支援士に課される義務",
        body: '<p>支援士には、業務上知り得た秘密を漏らしてはならない「秘密保持義務」や、資格の信用を傷つける行為をしてはならない「信用失墜行為の禁止」などが法律上の義務として課されています。これらは資格を持つ専門家として、顧客や社会からの信頼を守るための最低限のルールです。</p>'
      },
      {
        heading: "違反した場合",
        body: '<p>秘密保持義務などに違反した場合、登録の取消しや名称の使用停止といった行政処分の対象となるほか、違反の内容によっては罰則（罰金など）が科されることもあります。資格を持っているだけで安泰なのではなく、義務を守り続けることが資格維持の前提です。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、支援士の登録更新の周期（3年）や、秘密保持義務・信用失墜行為の禁止といった義務の内容、違反時の扱いを問う四択が出題されます。科目Bでの直接的な出題は多くありませんが、他の法規（個人情報保護法など）と絡めて「専門家としてどう行動すべきだったか」という形で間接的に問われることがあります。</p>'
      }
    ],
    terms: [
      { term: "情報処理安全確保支援士", desc: "試験合格後に登録して名乗れる、セキュリティ専門家の国家資格。" },
      { term: "秘密保持義務", desc: "業務上知り得た秘密を正当な理由なく漏らしてはならない義務。" },
      { term: "信用失墜行為の禁止", desc: "資格の信用を傷つける行為をしてはならないという義務。" },
      { term: "登録更新", desc: "支援士の登録は3年ごとに更新が必要。" },
      { term: "継続教育（講習）", desc: "登録更新のために受講が義務付けられている講習。" }
    ]
  },
  h5: {
    unitId: "h5",
    title: "周辺法規（知財・労働ほか）",
    sections: [
      {
        heading: "著作権とソフトウェア",
        body: '<p>プログラムは著作物として著作権法で保護されており、無断で複製・改変・配布すると著作権侵害になります。一方でOSS（オープンソースソフトウェア）は、ライセンス（利用許諾条件）に従うことを条件に、複製・改変・再配布が認められています。ライセンスの条件を守らずに利用すると、OSSであっても著作権侵害になり得る点に注意が必要です。</p>'
      },
      {
        heading: "労働形態と指揮命令権",
        body: '<p>システム開発の委託形態には「請負」と「派遣」があります。請負は成果物の完成を約束する契約で、委託先の労働者への指揮命令は委託先の管理者が行います。派遣は労働者そのものを提供する契約で、派遣先が労働者に直接指揮命令を行うことができます。請負契約でありながら委託元が現場の作業者に直接指示を出すと「偽装請負」として労働関連法規に違反する可能性があります。</p>'
      },
      {
        heading: "下請法による保護",
        body: '<p>下請法（下請代金支払遅延等防止法）は、発注者（親事業者）が下請事業者に対して代金の支払いを不当に遅らせたり、一方的に減額したりすることを禁止する法律です。IT業界では、システム開発を多重下請け構造で行うことが多く、立場の弱い下請事業者を保護する目的でこの法律が適用されます。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、著作権法上OSSライセンスに違反する行為や、請負と派遣における指揮命令権の違い、偽装請負の定義、下請法が保護する対象を問う四択が出題されます。科目Bでの出題頻度は高くありませんが、委託先管理と絡めて契約形態の違いが問われることがあります。頻出ポイントに絞って押さえておけば十分です。</p>'
      }
    ],
    terms: [
      { term: "著作権法", desc: "プログラムを含む著作物の無断複製・改変・配布を規制する法律。" },
      { term: "OSSライセンス", desc: "オープンソースソフトウェアの利用条件を定めた許諾条件。" },
      { term: "請負", desc: "成果物の完成を約束する契約。指揮命令は委託先が行う。" },
      { term: "派遣", desc: "労働者を提供する契約。派遣先が労働者に直接指揮命令できる。" },
      { term: "偽装請負", desc: "請負契約なのに委託元が労働者に直接指示を出す違法な状態。" },
      { term: "下請法", desc: "下請事業者への代金支払いの不当な遅延・減額を禁止する法律。" }
    ]
  }
});
