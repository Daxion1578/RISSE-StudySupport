window.MATERIALS = window.MATERIALS || {};
Object.assign(window.MATERIALS, {
  g1: {
    unitId: "g1",
    title: "情報セキュリティマネジメントとISMS",
    sections: [
      {
        heading: "情報セキュリティの3要素（CIA）",
        body: '<p>情報セキュリティとは、情報を「機密性（Confidentiality）」「完全性（Integrity）」「可用性（Availability）」の3つの観点から守ることです。頭文字を取って<b>CIA</b>と呼びます。機密性は許可された人だけが情報にアクセスできること、完全性は情報が改ざんされず正確な状態を保つこと、可用性は必要なときにシステムを使える状態を保つことです。</p><p>試験では、事故の内容がこの3要素のどれを損なったかを問う問題が頻出します。「顧客名簿が外部に漏えいした」は機密性の侵害、「注文データが書き換えられた」は完全性の侵害、「DDoS攻撃でサイトが止まった」は可用性の侵害、というように事例に当てはめて考える練習をしておきましょう。</p>'
      },
      {
        heading: "セキュリティポリシーの階層",
        body: '<p>組織のセキュリティ対策の文書は、3階層で整理されるのが一般的です。最上位が経営層の理念を示す「基本方針（ポリシー）」、中間が部門ごとのルールである「対策基準（スタンダード）」、最下位が作業者向けの具体的な手順を示す「実施手順（プロシージャ）」です。上位ほど抽象的、下位ほど具体的になります。例えば「情報を適切に保護する」という基本方針の下に、「パスワードは12文字以上とする」という対策基準があり、さらに「システムのパスワード変更画面の操作手順」という実施手順が続く、というイメージです。監査では、現場のルール（実施手順）が上位の対策基準・基本方針と矛盾していないかも確認されます。</p>'
      },
      {
        heading: "ISMSとPDCAサイクル",
        body: '<p>ISMS（情報セキュリティマネジメントシステム）は、組織全体で継続的にセキュリティレベルを維持・改善する仕組みで、国際規格<b>ISO/IEC 27001</b>に基づき第三者認証を取得できます。運用の骨格は<b>PDCAサイクル</b>です。Plan（リスクを評価し計画）、Do（対策を導入・運用）、Check（監査や指標で点検）、Act（是正し次の計画へ反映）を繰り返すことで、一度作って終わりでなく継続的に改善していく点がポイントです。</p>',
        svg: '<svg viewBox="0 0 640 280" width="100%" style="max-width:640px;height:auto"><rect x="60" y="40" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="160" y="66" font-family="sans-serif" font-size="15" fill="var(--ink)" text-anchor="middle">Plan（計画）</text><text x="160" y="86" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">リスク評価・目標設定</text><rect x="380" y="40" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="480" y="66" font-family="sans-serif" font-size="15" fill="var(--ink)" text-anchor="middle">Do（実行）</text><text x="480" y="86" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">対策の導入・運用</text><rect x="380" y="180" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="480" y="206" font-family="sans-serif" font-size="15" fill="var(--ink)" text-anchor="middle">Check（点検）</text><text x="480" y="226" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">監査・評価</text><rect x="60" y="180" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="160" y="206" font-family="sans-serif" font-size="15" fill="var(--ink)" text-anchor="middle">Act（改善）</text><text x="160" y="226" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">是正処置・見直し</text><line x1="260" y1="70" x2="373" y2="70" stroke="var(--indigo)" stroke-width="2"/><polygon points="373,70 361,64 361,76" fill="var(--indigo)"/><line x1="480" y1="100" x2="480" y2="173" stroke="var(--indigo)" stroke-width="2"/><polygon points="480,173 474,161 486,161" fill="var(--indigo)"/><line x1="380" y1="210" x2="267" y2="210" stroke="var(--indigo)" stroke-width="2"/><polygon points="267,210 279,204 279,216" fill="var(--indigo)"/><line x1="160" y1="180" x2="160" y2="107" stroke="var(--indigo)" stroke-width="2"/><polygon points="160,107 154,119 166,119" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目A（四択）では、CIAのどれに該当するかの判定や、ISMSの認証規格名（ISO/IEC 27001）、PDCAの各段階で行う作業の穴埋めが出題されます。科目B（記述）では、インシデント事例を読み「この事象はCIAのうちどれを損なったか、理由とともに述べよ」という設問や、「監査で指摘された不備をPDCAのどの段階の問題として是正すべきか」を問う形で出題されます。用語の暗記でなく、事例に当てはめて説明できることが重要です。</p>'
      }
    ],
    terms: [
      { term: "機密性", desc: "許可された人だけが情報にアクセスできる状態。漏えいは機密性の侵害。" },
      { term: "完全性", desc: "情報が改ざんされず正確な状態を保っていること。" },
      { term: "可用性", desc: "必要なときにシステムや情報を使える状態を保っていること。" },
      { term: "ISMS", desc: "組織全体で継続的にセキュリティを維持・改善する仕組み。ISO/IEC 27001で認証可能。" },
      { term: "PDCA", desc: "Plan-Do-Check-Actを繰り返して継続的に改善する運用サイクル。" },
      { term: "セキュリティポリシー", desc: "基本方針・対策基準・実施手順の3階層で構成される社内規程。" },
      { term: "是正処置", desc: "監査などで見つかった不備の原因を取り除き、再発を防ぐ対応。" }
    ]
  },
  g2: {
    unitId: "g2",
    title: "リスクアセスメント",
    sections: [
      {
        heading: "資産・脅威・脆弱性の洗い出し",
        body: '<p>リスクアセスメントは、守るべき「資産」（情報や機器）に対して、どんな「脅威」（攻撃や事故の原因）が存在し、その脅威が突けこめる「脆弱性」（弱点）がどれだけあるかを洗い出す作業です。この3つが揃って初めてリスクが成立すると考えます。「顧客DB（資産）」に対して「不正アクセス（脅威）」があっても、多要素認証で保護されていて脆弱性が小さければ、リスクは相対的に低くなります。資産の洗い出しでは、サーバやPCといった目に見える機器だけでなく、クラウド上のデータや、紙の書類、従業員の知識・ノウハウといった無形の情報資産も対象になる点に注意が必要です。</p>'
      },
      {
        heading: "リスクの大きさと評価",
        body: '<p>リスクの大きさは、一般に「発生可能性」×「影響度（被害の大きさ）」で評価します。両方が高い項目から優先的に対策を検討するのが基本です。評価は担当者の主観に頼りすぎないよう、金額や件数などの基準を決めて相対的にランク付け（高・中・低など）することが多く行われます。例えば「発生可能性：高、影響度：大」の項目を最優先とし、「発生可能性：低、影響度：小」の項目は対応を後回しにする、というように限られた予算と人員を優先度の高い項目から配分していくのが実務の考え方です。評価結果は表（リスク一覧表）にまとめ、対応状況とあわせて定期的に見直します。</p>'
      },
      {
        heading: "リスク対応の4つの選択肢",
        body: '<p>評価したリスクへの対応は「低減」「保有（受容）」「回避」「移転」の4つに分類されます。低減はファイアウォール導入など対策でリスクを小さくすること、保有は許容できる小さいリスクをそのまま受け入れること、回避はリスクの原因となる業務自体をやめること、移転は保険加入や外部委託で影響を他者と分担することです。すべてのリスクをゼロにはできないため、コストと影響のバランスで選択します。</p>',
        svg: '<svg viewBox="0 0 640 260" width="100%" style="max-width:640px;height:auto"><rect x="210" y="15" width="220" height="55" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="47" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">資産×脅威×脆弱性の評価</text><rect x="20" y="150" width="140" height="60" rx="6" fill="none" stroke="var(--indigo)"/><text x="90" y="176" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">低減</text><text x="90" y="196" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(対策を実施)</text><rect x="180" y="150" width="140" height="60" rx="6" fill="none" stroke="var(--emerald)"/><text x="250" y="176" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">保有</text><text x="250" y="196" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(小さいリスクを許容)</text><rect x="340" y="150" width="140" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="410" y="176" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">回避</text><text x="410" y="196" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(業務自体をやめる)</text><rect x="500" y="150" width="140" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="570" y="176" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">移転</text><text x="570" y="196" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(保険/委託で分担)</text><line x1="280" y1="70" x2="90" y2="148" stroke="var(--grid)" stroke-width="2"/><line x1="310" y1="70" x2="250" y2="148" stroke="var(--grid)" stroke-width="2"/><line x1="330" y1="70" x2="410" y2="148" stroke="var(--grid)" stroke-width="2"/><line x1="360" y1="70" x2="570" y2="148" stroke="var(--grid)" stroke-width="2"/></svg>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは「発生可能性が低く影響も小さいリスクへの対応として適切なものはどれか」のような四択で、保有（受容）を選ばせる問題が定番です。科目Bでは、シナリオ中の資産・脅威・脆弱性を読み取らせたり、「このリスクにはどの対応（低減/保有/回避/移転）が適切か、理由とともに答えよ」という記述が出題されます。コストと被害のバランスで判断理由を書けるようにしておきましょう。単に「低減すべき」と書くのではなく、「対策コストに対して想定被害額が大きいため低減が妥当」のように、判断の根拠となる比較を示すことで記述の説得力が増します。</p>'
      }
    ],
    terms: [
      { term: "リスクアセスメント", desc: "資産・脅威・脆弱性を洗い出し、リスクの大きさを評価する作業。" },
      { term: "資産", desc: "守るべき情報や機器・システムのこと。" },
      { term: "脅威", desc: "資産に被害を与える可能性のある攻撃や事故の原因。" },
      { term: "脆弱性", desc: "脅威が突けこめる弱点。対策により小さくできる。" },
      { term: "リスク低減", desc: "対策を実施してリスクの大きさを小さくすること。" },
      { term: "リスク保有", desc: "許容できる小さいリスクをそのまま受け入れること。" },
      { term: "リスク回避", desc: "リスクの原因となる業務やサービス自体をやめること。" },
      { term: "リスク移転", desc: "保険や外部委託によってリスクの影響を他者と分担すること。" },
      { term: "残留リスク", desc: "対策を実施してもなお残るリスク。ゼロにはできない。" }
    ]
  },
  g3: {
    unitId: "g3",
    title: "インシデント対応とCSIRT",
    sections: [
      {
        heading: "インシデント対応の6段階",
        body: '<p>セキュリティインシデント（事故）発生時の対応は、一般に「検知」「初動対応・報告」「トリアージ・分析」「封じ込め・根絶」「復旧」「再発防止」の6段階で進めます。検知はIDSやユーザー通報で異常に気づく段階、初動対応は被害拡大を防ぐ応急処置と関係者への報告、トリアージは影響範囲や深刻度の判断、封じ込め・根絶は原因の除去、復旧は正常状態への回復、再発防止は原因分析を踏まえた恒久対策です。R6年秋 問1でもこの流れが題材となりました。</p>',
        svg: '<svg viewBox="0 0 640 260" width="100%" style="max-width:640px;height:auto"><rect x="20" y="30" width="170" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="105" y="65" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">①検知</text><rect x="235" y="30" width="170" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="65" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">②初動対応</text><rect x="450" y="30" width="170" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="535" y="65" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">③トリアージ</text><rect x="450" y="170" width="170" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="535" y="205" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">④封じ込め</text><rect x="235" y="170" width="170" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="205" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">⑤復旧</text><rect x="20" y="170" width="170" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="105" y="205" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">⑥再発防止</text><line x1="190" y1="60" x2="230" y2="60" stroke="var(--indigo)" stroke-width="2"/><polygon points="230,60 220,55 220,65" fill="var(--indigo)"/><line x1="405" y1="60" x2="445" y2="60" stroke="var(--indigo)" stroke-width="2"/><polygon points="445,60 435,55 435,65" fill="var(--indigo)"/><line x1="535" y1="90" x2="535" y2="165" stroke="var(--indigo)" stroke-width="2"/><polygon points="535,165 529,153 541,153" fill="var(--indigo)"/><line x1="450" y1="200" x2="410" y2="200" stroke="var(--indigo)" stroke-width="2"/><polygon points="410,200 420,195 420,205" fill="var(--indigo)"/><line x1="235" y1="200" x2="195" y2="200" stroke="var(--indigo)" stroke-width="2"/><polygon points="195,200 205,195 205,205" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "CSIRTの役割と報告体制",
        body: '<p><b>CSIRT</b>（シーサート）は、組織内でインシデント対応を統括する専門チームです。現場が異常を検知したらCSIRTに集約し、CSIRTが技術的な分析と対応の指揮を行うと同時に、経営層へ公表判断の報告を上げ、必要に応じてJPCERT/CCやIPAへの届出、監督官庁や取引先への法令・契約に基づく報告を行います。報告先を誤ると対応が遅れたり法令違反になったりするため、平時から連絡体制を整備しておくことが重要です。誰が経営層への報告や外部発表の最終判断を行うのかをあらかじめ決めておかないと、インシデント発生時に責任の所在が曖昧になり、対応の遅れにつながります。</p>',
        svg: '<svg viewBox="0 0 640 300" width="100%" style="max-width:640px;height:auto"><rect x="240" y="125" width="160" height="50" rx="6" fill="none" stroke="var(--indigo)"/><text x="320" y="155" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">CSIRT（対応チーム）</text><rect x="240" y="20" width="160" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="41" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">経営層</text><text x="320" y="59" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(公表判断)</text><rect x="20" y="125" width="160" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="100" y="146" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">現場・システム部門</text><text x="100" y="164" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(検知・一次対応)</text><rect x="460" y="125" width="160" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="540" y="146" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">監督官庁・取引先</text><text x="540" y="164" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(法令・契約報告)</text><rect x="240" y="230" width="160" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="251" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">JPCERT/CC・IPA</text><text x="320" y="269" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(届出・情報提供)</text><line x1="320" y1="70" x2="320" y2="123" stroke="var(--grid)" stroke-width="2"/><line x1="180" y1="150" x2="238" y2="150" stroke="var(--grid)" stroke-width="2"/><line x1="402" y1="150" x2="458" y2="150" stroke="var(--grid)" stroke-width="2"/><line x1="320" y1="177" x2="320" y2="228" stroke="var(--grid)" stroke-width="2"/></svg>'
      },
      {
        heading: "封じ込めで優先すべきこと",
        body: '<p>封じ込めの段階では、証拠保全と業務継続のバランスが問われます。感染した端末をすぐに電源オフにすると揮発性データ（メモリ上の情報）が失われ原因究明が難しくなるため、まずネットワークから切り離す「隔離」が優先されます。対応中も業務影響を最小化する判断が求められ、あらかじめ定めた優先順位（重要システムの継続性）に基づいて止める範囲を決めます。例えば、感染端末が1台であれば当該端末のみをLANケーブル抜線やスイッチ側での通信遮断で隔離し、業務全体を止めずに済ませます。一方、ランサムウェアがファイルサーバにまで拡散している疑いがある場合は、被害の連鎖を防ぐため一時的にサーバ側のネットワークを広く遮断する判断が必要になることもあります。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、6段階の名称や順序、CSIRTの略称・役割を問う四択が出題されます。科目Bでは、インシデントのタイムラインが提示され「この時点で取るべき初動対応を述べよ」「なぜ電源を切らずネットワークから切り離すべきか述べよ」といった記述が頻出です。証拠保全（フォレンジックス）や報告義務（個人情報保護法など）と組み合わせた複合問題として出ることも多く、他単元と関連づけて理解しておくことが大切です。</p>'
      }
    ],
    terms: [
      { term: "CSIRT", desc: "組織内でインシデント対応を統括する専門チーム。" },
      { term: "インシデント", desc: "情報セキュリティ上の事故・不正な事象のこと。" },
      { term: "トリアージ", desc: "検知した事象の影響範囲や深刻度を判断し優先順位をつける作業。" },
      { term: "封じ込め", desc: "被害の拡大を止めるため、感染機器をネットワークから隔離するなどの対応。" },
      { term: "JPCERT/CC", desc: "国内のインシデント対応を調整する組織。届出・情報連携の窓口。" },
      { term: "IPA", desc: "情報処理推進機構。脆弱性情報の届出先の一つ。" },
      { term: "初動対応", desc: "検知直後に行う被害拡大防止のための応急処置と報告。" },
      { term: "揮発性データ", desc: "電源を切ると失われるメモリ上のデータ。証拠保全で重視される。" }
    ]
  },
  g4: {
    unitId: "g4",
    title: "脆弱性管理とIT資産管理",
    sections: [
      {
        heading: "CVEとCVSS",
        body: '<p>ソフトウェアの脆弱性が発見されると「<b>CVE</b>」（共通脆弱性識別子）という番号が採番され、公開データベースに登録されます。深刻度を客観的な数値で表す指標が「<b>CVSS</b>」（共通脆弱性評価システム）で、攻撃のしやすさや影響範囲などから0〜10点で算出されます。点数が高いほど緊急度は高いとされますが、点数だけでなく自社の環境に実際にその脆弱性のある資産が存在するかを合わせて判断する必要があります。例えばCVSS値が9点台の深刻な脆弱性でも、対象製品を自社が一切使っていなければ緊急対応の必要はありません。逆に7点台でも、インターネットに公開しているサーバに関わる脆弱性であれば優先度は高くなります。</p>'
      },
      {
        heading: "資産台帳がなければ管理できない",
        body: '<p>脆弱性が公表されても、自社にその製品・バージョンを使っている機器があるかを把握できなければパッチ適用の判断ができません。そのため、ハードウェア・ソフトウェアの棚卸しと台帳管理である<b>IT資産管理</b>は脆弱性管理の前提となります。R7年春の試験でもIT資産管理と脆弱性管理を組み合わせた出題が2問見られ、最重点分野の一つです。</p>'
      },
      {
        heading: "パッチ適用の優先度判断",
        body: '<p>脆弱性情報を入手したら、まず資産台帳と照合して該当資産の有無を確認し、次にCVSS値や実際に攻撃コード（Exploit）が出回っているかを評価します。深刻度が高く該当資産があり悪用の懸念が大きい場合は緊急対応、影響が限定的だが放置できない場合は次回の定期メンテナンスでの計画的対応、影響が小さい場合は監視を続けながらリスクを保有する、という3段階で優先度を判断するのが実務的な流れです。</p>',
        svg: '<svg viewBox="0 0 640 340" width="100%" style="max-width:640px;height:auto"><rect x="200" y="20" width="240" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="50" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">①脆弱性情報を入手</text><rect x="200" y="100" width="240" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="130" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">②資産台帳と照合</text><rect x="200" y="180" width="240" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="210" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">③CVSS値・重要度を評価</text><rect x="20" y="270" width="180" height="60" rx="6" fill="none" stroke="var(--crit)"/><text x="110" y="296" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">緊急対応</text><text x="110" y="316" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(即日パッチ)</text><rect x="230" y="270" width="180" height="60" rx="6" fill="none" stroke="var(--indigo)"/><text x="320" y="296" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">計画的対応</text><text x="320" y="316" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(次回メンテ)</text><rect x="440" y="270" width="180" height="60" rx="6" fill="none" stroke="var(--emerald)"/><text x="530" y="296" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">監視継続</text><text x="530" y="316" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(リスク保有)</text><line x1="320" y1="70" x2="320" y2="98" stroke="var(--indigo)" stroke-width="2"/><polygon points="320,98 314,88 326,88" fill="var(--indigo)"/><line x1="320" y1="150" x2="320" y2="178" stroke="var(--indigo)" stroke-width="2"/><polygon points="320,178 314,168 326,168" fill="var(--indigo)"/><line x1="320" y1="230" x2="110" y2="268" stroke="var(--grid)" stroke-width="2"/><line x1="320" y1="230" x2="320" y2="268" stroke="var(--grid)" stroke-width="2"/><line x1="320" y1="230" x2="530" y2="268" stroke="var(--grid)" stroke-width="2"/></svg>'
      },
      {
        heading: "資産のライフサイクル管理",
        body: '<p>IT資産は「調達」「登録（台帳への記録）」「運用・保守（パッチ適用や設定変更）」「廃棄（データ消去）」というライフサイクルで管理します。廃棄時にデータを完全に消去せず機器を処分すると情報漏えいにつながるため、廃棄も脆弱性管理・資産管理の一部として扱われます。</p>',
        svg: '<svg viewBox="0 0 640 280" width="100%" style="max-width:640px;height:auto"><rect x="60" y="40" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="160" y="76" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">調達</text><rect x="380" y="40" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="480" y="66" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">登録</text><text x="480" y="86" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(台帳に記録)</text><rect x="380" y="180" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="480" y="206" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">運用・保守</text><text x="480" y="226" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(パッチ適用)</text><rect x="60" y="180" width="200" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="160" y="206" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">廃棄</text><text x="160" y="226" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(データ消去)</text><line x1="260" y1="70" x2="373" y2="70" stroke="var(--indigo)" stroke-width="2"/><polygon points="373,70 361,64 361,76" fill="var(--indigo)"/><line x1="480" y1="100" x2="480" y2="173" stroke="var(--indigo)" stroke-width="2"/><polygon points="480,173 474,161 486,161" fill="var(--indigo)"/><line x1="380" y1="210" x2="267" y2="210" stroke="var(--indigo)" stroke-width="2"/><polygon points="267,210 279,204 279,216" fill="var(--indigo)"/><line x1="160" y1="180" x2="160" y2="107" stroke="var(--indigo)" stroke-width="2"/><polygon points="160,107 154,119 166,119" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、CVE・CVSSの用語の意味や、CVSS値が高い脆弱性への対応として適切な選択肢を選ぶ問題が出ます。科目Bでは、複数の脆弱性情報とCVSS値、自社の資産構成が示され「どの脆弱性から優先的に対応すべきか、理由とともに述べよ」という記述が頻出です。CVSS値の高さだけでなく「該当資産が公開サーバかどうか」「攻撃コードが出回っているか」を根拠に含めて答えることが高得点のポイントです。</p>'
      }
    ],
    terms: [
      { term: "CVE", desc: "公開された脆弱性に割り振られる共通識別番号。" },
      { term: "CVSS", desc: "脆弱性の深刻度を0〜10点の数値で表す共通評価システム。" },
      { term: "ゼロデイ脆弱性", desc: "修正パッチが未提供の状態で悪用される脆弱性。" },
      { term: "パッチ", desc: "脆弱性などの不具合を修正するための更新プログラム。" },
      { term: "IT資産管理", desc: "ハードウェア・ソフトウェアの棚卸しと台帳管理。脆弱性管理の前提。" },
      { term: "資産台帳", desc: "保有する機器・ソフトウェアとバージョンを記録した一覧。" },
      { term: "Exploit（エクスプロイト）", desc: "脆弱性を悪用するために作られた攻撃コード。" },
      { term: "パッチマネジメント", desc: "パッチの検証・適用計画・展開を管理する一連のプロセス。" }
    ]
  },
  g5: {
    unitId: "g5",
    title: "セキュリティ監視とSIEM/SOC",
    sections: [
      {
        heading: "ログを集めるだけでは検知できない",
        body: '<p>ファイアウォールやサーバは大量のログを日々出力していますが、個別のログをバラバラに見ているだけでは、複数の機器にまたがる攻撃の兆候に気づけません。様々な機器のログを一箇所に集約し、時系列や関連性を突き合わせて分析する仕組みが必要になります。人手だけで大量のログを常時監視するのは現実的でなく、機械的にルールへ照らして絞り込み、そのうえで人が最終判断するという役割分担が前提になります。</p>'
      },
      {
        heading: "SIEMとSOCの役割",
        body: '<p><b>SIEM</b>（Security Information and Event Management）は、ログを集約・正規化し、あらかじめ定めたルールや相関分析によって不審な兆候を検知し、アラートを発報するシステムです。<b>SOC</b>（Security Operation Center）はそのアラートを24時間体制で監視・分析する人と組織を指します。SOCのアナリストはアラートが本当に攻撃なのか誤検知（フォールスポジティブ）なのかをトリアージし、深刻なものはCSIRTにエスカレーションします。</p>',
        svg: '<svg viewBox="0 0 640 220" width="100%" style="max-width:640px;height:auto"><rect x="10" y="80" width="140" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="80" y="106" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">各種ログ</text><text x="80" y="126" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(FW/IDS/端末)</text><rect x="185" y="80" width="140" height="60" rx="6" fill="none" stroke="var(--indigo)"/><text x="255" y="106" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">SIEM</text><text x="255" y="126" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">(集約・相関分析)</text><rect x="360" y="80" width="140" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="430" y="115" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">アラート発報</text><rect x="535" y="80" width="100" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="585" y="106" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">SOC</text><text x="585" y="126" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">対応</text><line x1="150" y1="110" x2="180" y2="110" stroke="var(--indigo)" stroke-width="2"/><polygon points="180,110 170,105 170,115" fill="var(--indigo)"/><line x1="325" y1="110" x2="355" y2="110" stroke="var(--indigo)" stroke-width="2"/><polygon points="355,110 345,105 345,115" fill="var(--indigo)"/><line x1="500" y1="110" x2="530" y2="110" stroke="var(--indigo)" stroke-width="2"/><polygon points="530,110 520,105 520,115" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "相関分析で見える化する攻撃",
        body: '<p>例えば「短時間に同一アカウントへの大量のログイン失敗」と「その直後の海外IPからのログイン成功」という2つのログは、単体では見過ごされがちですが、時系列で相関させると「パスワードリスト攻撃による不正ログイン」の兆候として検知できます。複数のログを組み合わせて意味のある脅威情報にする作業が相関分析です。他にも「深夜の大量ファイルダウンロード」と「通常業務時間外の管理者権限アカウントの利用」を組み合わせることで、内部不正やアカウント乗っ取りの兆候を早期に検知できる場合があります。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目AではSIEM・SOCの役割の違いや、ログの相関分析の目的を問う四択が出題されます。科目Bでは、複数のログ（認証ログ・通信ログなど）が提示され「これらのログから読み取れる攻撃の兆候を述べよ」「なぜこの2つのログを組み合わせて判断する必要があるのか」を記述させる問題が頻出です。個々のログの意味を読み取る力と、それらをつなげて解釈する力の両方が問われます。</p>'
      }
    ],
    terms: [
      { term: "SIEM", desc: "ログを集約・相関分析し不審な兆候を検知・アラート発報するシステム。" },
      { term: "SOC", desc: "アラートを24時間体制で監視・分析する組織や機能。" },
      { term: "相関分析", desc: "複数のログを時系列や関連性で突き合わせ、意味のある脅威情報にすること。" },
      { term: "フォールスポジティブ", desc: "実際には脅威でないものを誤って検知してしまう誤検知。" },
      { term: "アラート", desc: "SIEMなどが不審な兆候を検知した際に発する警告通知。" },
      { term: "エスカレーション", desc: "深刻な事象をより上位の担当（CSIRTなど）へ引き継ぐこと。" },
      { term: "ログ集約", desc: "複数機器のログを一箇所に集めて管理・分析すること。" }
    ]
  },
  g6: {
    unitId: "g6",
    title: "クラウド・SaaSのセキュリティ",
    sections: [
      {
        heading: "責任共有モデル",
        body: '<p>クラウドサービスでは、セキュリティ対策を「クラウド事業者が担う範囲」と「利用者が担う範囲」に分けて考える<b>責任共有モデル</b>という考え方が基本になります。サービス形態がIaaS・PaaS・SaaSと利用者の管理範囲が狭くなるほど事業者が担う範囲は広がりますが、どの形態でも「データそのものの管理やアクセス権限の設定」は利用者側の責任として残り続けます。R7年秋 問1でもこの考え方が題材になりました。</p>',
        svg: '<svg viewBox="0 0 640 275" width="100%" style="max-width:640px;height:auto"><text x="75" y="34" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle"> </text><text x="201" y="34" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">オンプレミス</text><text x="323" y="34" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">IaaS</text><text x="445" y="34" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">PaaS</text><text x="567" y="34" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">SaaS</text><text x="15" y="72" font-family="sans-serif" font-size="13" fill="var(--ink)">データ/アカウント</text><rect x="140" y="45" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="262" y="45" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="384" y="45" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="506" y="45" width="122" height="45" fill="none" stroke="var(--grid)"/><text x="15" y="117" font-family="sans-serif" font-size="13" fill="var(--ink)">アプリケーション</text><rect x="140" y="90" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="262" y="90" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="384" y="90" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="506" y="90" width="122" height="45" fill="var(--indigo)" fill-opacity="0.18" stroke="var(--grid)"/><text x="15" y="162" font-family="sans-serif" font-size="13" fill="var(--ink)">OS/ミドルウェア</text><rect x="140" y="135" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="262" y="135" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="384" y="135" width="122" height="45" fill="var(--indigo)" fill-opacity="0.18" stroke="var(--grid)"/><rect x="506" y="135" width="122" height="45" fill="var(--indigo)" fill-opacity="0.18" stroke="var(--grid)"/><text x="15" y="207" font-family="sans-serif" font-size="13" fill="var(--ink)">仮想化/NW/HW</text><rect x="140" y="180" width="122" height="45" fill="none" stroke="var(--grid)"/><rect x="262" y="180" width="122" height="45" fill="var(--indigo)" fill-opacity="0.18" stroke="var(--grid)"/><rect x="384" y="180" width="122" height="45" fill="var(--indigo)" fill-opacity="0.18" stroke="var(--grid)"/><rect x="506" y="180" width="122" height="45" fill="var(--indigo)" fill-opacity="0.18" stroke="var(--grid)"/><rect x="20" y="240" width="20" height="14" fill="none" stroke="var(--grid)"/><text x="46" y="252" font-family="sans-serif" font-size="13" fill="var(--muted)">利用者の責任</text><rect x="180" y="240" width="20" height="14" fill="var(--indigo)" fill-opacity="0.18" stroke="var(--grid)"/><text x="206" y="252" font-family="sans-serif" font-size="13" fill="var(--muted)">事業者の責任</text></svg>'
      },
      {
        heading: "設定ミスが最大の原因",
        body: '<p>クラウドでの情報漏えい事故の多くは、クラウド事業者側の欠陥ではなく、利用者側の設定ミス（ストレージを誤って公開設定にする、アクセス権限を広く設定しすぎるなど）が原因です。公開設定のミスは、攻撃者が手動で狙わなくても自動スキャンツールにより短時間で発見されてしまうため、初期設定の見直しと定期的な棚卸しが欠かせません。</p>',
        svg: '<svg viewBox="0 0 640 200" width="100%" style="max-width:640px;height:auto"><rect x="10" y="70" width="140" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="80" y="100" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">①公開設定</text><text x="80" y="118" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">ミス</text><rect x="175" y="70" width="140" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="245" y="100" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">②スキャナが</text><text x="245" y="118" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">検出</text><rect x="340" y="70" width="140" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="410" y="100" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③無認証で</text><text x="410" y="118" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">データ取得</text><rect x="505" y="70" width="125" height="70" rx="6" fill="none" stroke="var(--crit)"/><text x="567" y="100" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">④漏えい</text><text x="567" y="118" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">公表</text><line x1="150" y1="105" x2="170" y2="105" stroke="var(--indigo)" stroke-width="2"/><polygon points="170,105 160,100 160,110" fill="var(--indigo)"/><line x1="315" y1="105" x2="335" y2="105" stroke="var(--indigo)" stroke-width="2"/><polygon points="335,105 325,100 325,110" fill="var(--indigo)"/><line x1="480" y1="105" x2="500" y2="105" stroke="var(--indigo)" stroke-width="2"/><polygon points="500,105 490,100 490,110" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "クラウドならではのID管理",
        body: '<p>クラウド環境では社内ネットワークの外からもアクセスできるため、ID・パスワードだけに頼らない多要素認証や、必要最小限の権限のみを付与する「最小権限の原則」、利用していないアカウント・APIキーの棚卸しが重要になります。管理者権限を持つアカウントの乗っ取りは被害が広範囲に及ぶため、特に厳重な保護（多要素認証の必須化など）が求められます。退職者や異動者のアカウントを削除・権限変更し忘れると、不要なアクセス経路が残り続けてしまう点も見落とされがちなポイントです。開発時に発行したAPIキーをコードにそのまま書き込んで公開リポジトリにアップロードしてしまう事故も後を絶たず、キーの管理・失効の運用ルールを定めておく必要があります。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは責任共有モデルの考え方や、IaaS/PaaS/SaaSでの責任分界点を問う四択が出題されます。科目Bでは、クラウド設定のミスによって情報が漏えいした事例が示され「この漏えいの直接的な原因は何か」「今後同様の事故を防ぐために利用者側が講じるべき対策を述べよ」という記述が頻出です。「クラウド事業者が悪い」ではなく利用者側の設定・運用の問題として捉えて答えるのがポイントです。</p>'
      }
    ],
    terms: [
      { term: "責任共有モデル", desc: "セキュリティ対策をクラウド事業者と利用者で分担して担う考え方。" },
      { term: "IaaS", desc: "サーバ等のインフラを提供するクラウド形態。OS以上は利用者が管理。" },
      { term: "PaaS", desc: "アプリの実行基盤を提供するクラウド形態。アプリとデータは利用者が管理。" },
      { term: "SaaS", desc: "完成したアプリをサービスとして提供する形態。データ・設定は利用者が管理。" },
      { term: "最小権限の原則", desc: "業務に必要な最小限の権限のみを付与する考え方。" },
      { term: "多要素認証", desc: "パスワードに加え生体認証やワンタイムコードなど複数要素で認証する方式。" },
      { term: "アクセス制御", desc: "権限のある人だけがリソースを利用できるよう制限する仕組み。" },
      { term: "設定ミス（misconfiguration）", desc: "クラウドの公開範囲や権限設定を誤ること。漏えい事故の主因。" }
    ]
  },
  g7: {
    unitId: "g7",
    title: "サプライチェーンと委託先管理",
    sections: [
      {
        heading: "自社だけでは守れない時代",
        body: '<p>多くの企業は、システム開発や運用の一部を外部の委託先に任せたり、オープンソースソフトウェア（OSS）などの外部の部品を利用してソフトウェアを作っています。攻撃者は、直接守りの堅い大企業を狙うのではなく、セキュリティ対策が手薄な委託先や、広く使われているOSSの脆弱性を経由して侵入する「サプライチェーン攻撃」を仕掛けることが増えています。R7年春 問1でもこの分野が題材となりました。委託先を踏み台にして本命の取引先企業に侵入する手口や、正規のソフトウェア更新プログラムに不正なコードを紛れ込ませる手口など、利用者側の注意だけでは防ぎきれない点が特徴です。</p>'
      },
      {
        heading: "委託先管理のライフサイクル",
        body: '<p>委託先管理は、契約前の「選定時評価」（委託先のセキュリティ体制を確認する）、「契約」（機密保持・監査権限・事故時の責任分担を条項に盛り込む）、「運用監視」（定期的な報告や立入監査）、「事故対応・報告」という流れで行います。契約時に責任分担を明確にしておかないと、事故が起きた際に対応が後手に回ります。</p>',
        svg: '<svg viewBox="0 0 640 200" width="100%" style="max-width:640px;height:auto"><rect x="10" y="60" width="150" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="85" y="99" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">①選定時評価</text><rect x="180" y="60" width="150" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="255" y="99" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">②契約</text><rect x="350" y="60" width="150" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="425" y="99" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">③運用監視</text><rect x="520" y="60" width="115" height="70" rx="6" fill="none" stroke="var(--grid)"/><text x="577" y="90" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">④事故対応</text><text x="577" y="108" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">・報告</text><line x1="160" y1="95" x2="175" y2="95" stroke="var(--indigo)" stroke-width="2"/><polygon points="175,95 165,90 165,100" fill="var(--indigo)"/><line x1="330" y1="95" x2="345" y2="95" stroke="var(--indigo)" stroke-width="2"/><polygon points="345,95 335,90 335,100" fill="var(--indigo)"/><line x1="500" y1="95" x2="515" y2="95" stroke="var(--indigo)" stroke-width="2"/><polygon points="515,95 505,90 505,100" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "ソフトウェア部品表（SBOM）",
        body: '<p><b>SBOM</b>（Software Bill of Materials、ソフトウェア部品表）は、自社の製品がどのOSSライブラリやコンポーネントで構成されているかを一覧化したものです。ある部品に脆弱性が発見されたとき、SBOMがあれば「自社のどの製品がその部品を使っているか」を即座に照合でき、影響範囲の特定と対応が迅速になります。SBOMがなければ、影響の有無を確認するだけで多くの時間がかかってしまいます。</p>',
        svg: '<svg viewBox="0 0 640 260" width="100%" style="max-width:640px;height:auto"><rect x="10" y="20" width="180" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="100" y="50" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">自社コード</text><rect x="230" y="20" width="180" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="50" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">OSSライブラリA</text><rect x="450" y="20" width="180" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="540" y="50" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">OSSライブラリB</text><rect x="170" y="110" width="300" height="50" rx="6" fill="none" stroke="var(--indigo)"/><text x="320" y="140" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">SBOMを作成・維持</text><rect x="130" y="190" width="380" height="50" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="220" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">脆弱性DBと突合し影響範囲を特定</text><line x1="100" y1="70" x2="270" y2="108" stroke="var(--grid)" stroke-width="2"/><line x1="320" y1="70" x2="320" y2="108" stroke="var(--grid)" stroke-width="2"/><line x1="540" y1="70" x2="370" y2="108" stroke="var(--grid)" stroke-width="2"/><line x1="320" y1="160" x2="320" y2="188" stroke="var(--indigo)" stroke-width="2"/><polygon points="320,188 314,178 326,178" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、サプライチェーン攻撃の手口やSBOMの目的を問う四択が出題されます。科目Bでは、委託先や利用しているOSSの脆弱性が起点となったインシデント事例が示され、「委託元として契約時にどのような条項を盛り込んでおくべきだったか」「SBOMがあれば今回の対応がどう変わったか」を記述させる問題が頻出です。自社の直接的な過失だけでなく、委託先・部品を含めた管理体制を問う視点が特徴です。</p>'
      }
    ],
    terms: [
      { term: "サプライチェーン攻撃", desc: "委託先や取引先、利用部品を経由して標的組織に侵入する攻撃。" },
      { term: "SBOM", desc: "ソフトウェアを構成する部品を一覧化したソフトウェア部品表。" },
      { term: "OSS（オープンソースソフトウェア）", desc: "ソースコードが公開され、ライセンス条件下で利用・改変できるソフトウェア。" },
      { term: "委託先評価", desc: "契約前に委託先のセキュリティ体制を確認すること。" },
      { term: "SLA", desc: "委託先と取り交わすサービス水準の合意事項。" },
      { term: "監査権限", desc: "委託元が委託先の運用状況を確認できる契約上の権利。" },
      { term: "再委託", desc: "委託先がさらに別の会社に業務を委託すること。管理範囲が複雑になる。" }
    ]
  },
  g8: {
    unitId: "g8",
    title: "デジタルフォレンジックス",
    sections: [
      {
        heading: "証拠として通用させるために",
        body: '<p><b>デジタルフォレンジックス</b>とは、インシデントや不正行為が起きた際に、機器やログに残るデータを法的な証拠として通用する形で収集・分析する技術と手続きのことです。単にログを見て原因を推測するだけでなく、「いつ・誰が・どのように」証拠を取り扱ったかを記録し、データが改ざんされていないことを証明できるようにする必要があります。社内での懲戒処分の根拠にしたり、警察への被害届や民事訴訟の証拠として使ったりする場面もあるため、技術部門だけでなく法務部門とも連携して手続きを進めることが望まれます。</p>'
      },
      {
        heading: "証拠保全からタイムライン分析まで",
        body: '<p>フォレンジックスは一般に「証拠保全」（対象機器のディスクイメージをビット単位で複製し、ハッシュ値を記録して原本との同一性を保証する）、「分析」（複製データから操作の痕跡やファイルの作成・削除履歴を抽出する）、「タイムライン作成」（出来事を時系列に並べ侵入から被害拡大までの流れを再構成する）、「報告」（分析結果を証拠として提出できる形にまとめる）という手順で進めます。</p>',
        svg: '<svg viewBox="0 0 640 180" width="100%" style="max-width:640px;height:auto"><rect x="10" y="55" width="150" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="85" y="90" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">①証拠保全</text><rect x="180" y="55" width="150" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="255" y="90" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">②分析</text><rect x="350" y="55" width="150" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="425" y="90" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">③タイムライン化</text><rect x="520" y="55" width="115" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="577" y="90" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">④報告</text><line x1="160" y1="85" x2="175" y2="85" stroke="var(--indigo)" stroke-width="2"/><polygon points="175,85 165,80 165,90" fill="var(--indigo)"/><line x1="330" y1="85" x2="345" y2="85" stroke="var(--indigo)" stroke-width="2"/><polygon points="345,85 335,80 335,90" fill="var(--indigo)"/><line x1="500" y1="85" x2="515" y2="85" stroke="var(--indigo)" stroke-width="2"/><polygon points="515,85 505,80 505,90" fill="var(--indigo)"/></svg>'
      },
      {
        heading: "chain of custody（証拠の連鎖）",
        body: '<p>証拠を誰がいつ受け渡したかを記録し続けることを「chain of custody（証拠保全の連鎖）」と呼びます。この記録が途切れると、法廷や社内調査で「証拠が本物である」ことを証明できなくなり、証拠としての価値が失われます。証拠保全時に電源を安易に切らない、原本には直接触れず複製で分析するといった原則も、この連鎖を保つための工夫です。例えば「保管していた証拠ディスクを誰でも自由に持ち出せる棚に置いていた」場合、後から改ざんされていないと証明できず、証拠として採用されない恐れがあります。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、証拠保全の際にハッシュ値を記録する目的や、chain of custodyの意味を問う四択が出題されます。科目Bでは、インシデント対応の記述問題の一部として「証拠保全の観点からこの対応の何が問題か」「なぜ原本のディスクではなく複製を分析に使うのか」を答えさせる形が典型です。インシデント対応（CSIRT）と合わせて出題されることが多い単元です。</p>'
      }
    ],
    terms: [
      { term: "デジタルフォレンジックス", desc: "デジタルデータを法的証拠として扱えるよう収集・分析する技術と手続き。" },
      { term: "chain of custody（証拠保全の連鎖）", desc: "証拠の受け渡し記録を途切れさせず、証拠の同一性を保証すること。" },
      { term: "ディスクイメージ", desc: "対象機器のディスクをビット単位で複製したデータ。" },
      { term: "ハッシュ値", desc: "データから算出される固定長の値。改ざんの有無を確認するのに使う。" },
      { term: "タイムライン分析", desc: "出来事を時系列に並べて事象の流れを再構成する分析手法。" },
      { term: "証拠保全", desc: "証拠となるデータを改ざん・消失させずに確保すること。" }
    ]
  },
  g9: {
    unitId: "g9",
    title: "OT・IoTセキュリティ",
    sections: [
      {
        heading: "工場やインフラを狙う攻撃が増えている",
        body: '<p><b>OT</b>（Operational Technology、制御技術）とは、工場の生産ラインや電力・水道などの社会インフラを制御するシステムのことです。従来は外部ネットワークから隔離されていることが多く安全とされてきましたが、遠隔監視やIoT機器の普及により外部と接続される機会が増え、攻撃対象として狙われるようになりました。R7年秋の「製造業」を題材にした問題でもこの分野が扱われています。ランサムウェアに感染して生産ラインが停止すれば、情報漏えいだけでなく工場の稼働そのものが止まり、直接的な売上損失や納期遅延につながる点がOTならではの深刻さです。</p>'
      },
      {
        heading: "ITとOTでは優先順位が違う",
        body: '<p>一般的なITシステムのセキュリティは機密性を最優先しますが、OTシステムでは「可用性（止めないこと）」と「安全性（人や設備に危害を与えないこと）」が最優先されます。そのため、ITで当たり前のパッチ適用や再起動を伴う対策が、OTでは生産ラインの停止や事故につながるとして簡単には実施できないという制約があります。休日や計画停止のタイミングに合わせてまとめて適用するなど、ITとは異なるスケジュール感で対策を進める必要があります。</p>'
      },
      {
        heading: "IT/OTネットワークの分離",
        body: '<p>IT/OTの境界を守る基本策は、両ネットワークを直接つなげず、間にDMZやゲートウェイを挟んで通信を必要最小限に制限することです。必要なデータ連携（生産実績の集計など）は、あらかじめ許可した方向・ポートのみに限定し、OT側からIT側への一方向的なデータ転送のみを許可するといった構成が代表的です。IoT機器も初期パスワードの変更やファームウェア更新が後回しにされがちな点が弱点です。</p>',
        svg: '<svg viewBox="0 0 640 300" width="100%" style="max-width:640px;height:auto"><rect x="120" y="20" width="400" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="55" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">IT系ネットワーク（社内LAN・業務システム）</text><rect x="120" y="120" width="400" height="60" rx="6" fill="none" stroke="var(--indigo)"/><text x="320" y="155" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">DMZ・ゲートウェイ</text><rect x="120" y="220" width="400" height="60" rx="6" fill="none" stroke="var(--grid)"/><text x="320" y="255" font-family="sans-serif" font-size="14" fill="var(--ink)" text-anchor="middle">OT系ネットワーク（制御システム）</text><line x1="320" y1="80" x2="320" y2="117" stroke="var(--grid)" stroke-width="2"/><polygon points="320,117 314,107 326,107" fill="var(--grid)"/><line x1="320" y1="180" x2="320" y2="217" stroke="var(--grid)" stroke-width="2"/><polygon points="320,217 314,207 326,207" fill="var(--grid)"/><text x="530" y="103" font-family="sans-serif" font-size="13" fill="var(--muted)">許可された</text><text x="530" y="119" font-family="sans-serif" font-size="13" fill="var(--muted)">通信のみ</text></svg>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、OTでITと異なり可用性・安全性が優先される理由や、IT/OT分離の考え方を問う四択が出題されます。科目Bでは、工場や制御システムの構成図が示され「IT側で発生したマルウェア感染がOT側に波及するのを防ぐにはどうすべきか」「なぜOT側にすぐパッチを適用できないのか」を記述させる問題が頻出です。ITの常識をそのまま当てはめると誤りになりやすい単元です。</p>'
      }
    ],
    terms: [
      { term: "OT（制御技術）", desc: "工場や社会インフラを制御するシステム・技術のこと。" },
      { term: "IoT", desc: "インターネットに接続されるセンサーや機器全般。" },
      { term: "IT/OT分離", desc: "業務系ネットワークと制御系ネットワークを分けて接続を制限する考え方。" },
      { term: "DMZ", desc: "外部と内部の中間に置く緩衝ネットワーク領域。" },
      { term: "ゲートウェイ", desc: "異なるネットワーク間の通信を中継・制御する機器。" },
      { term: "可用性優先", desc: "OTシステムで機密性より止めないことが優先される考え方。" },
      { term: "ファームウェア", desc: "機器に組み込まれた基本ソフトウェア。更新が後回しにされやすい。" }
    ]
  },
  g10: {
    unitId: "g10",
    title: "物理・人的セキュリティと教育",
    sections: [
      {
        heading: "技術対策だけでは防げない事故",
        body: '<p>どれだけ高度な技術的対策を導入しても、社員が机の上に重要書類を放置したり、部外者が無施錠のドアから侵入できたりすれば、情報は簡単に漏えいします。物理的・人的な対策は、技術的対策と並ぶセキュリティの柱です。実際、退職者の私物USBメモリへの顧客データの持ち出しや、清掃業者を装って社内に侵入し放置されたノートPCを盗む、といった事故は技術的対策だけでは防げません。</p>'
      },
      {
        heading: "入退室管理とクリアデスク",
        body: '<p>入退室管理は、ICカードや生体認証によって「誰が」「いつ」重要エリアに出入りしたかを記録・制限する仕組みです。クリアデスク・クリアスクリーンは、離席時に書類を片付け、画面をロックする習慣を指し、盗み見や書類の持ち出しを防ぎます。ともに特別な技術投資がなくても徹底できる基本的な対策です。サーバ室のような特に重要なエリアには、通常のオフィスより厳格な入室権限や、入退室のたびの記録・定期的な棚卸しを行うことが望まれます。</p>'
      },
      {
        heading: "教育・訓練の効果",
        body: '<p>標的型攻撃メールの多くは、技術的な防御をすり抜けて従業員に直接届きます。定期的な教育や、訓練メールを送って開封率を測る「標的型攻撃メール訓練」を行うことで、従業員の気づく力を高め、実際の攻撃を受けた際の被害を抑えられます。訓練は一度で終わらせず、継続して実施することが重要です。開封してしまった従業員を一方的に責めるのではなく、報告しやすい雰囲気を作り、早期報告を促すことのほうが被害拡大の防止には効果的です。</p>'
      },
      {
        heading: "内部不正への備え",
        body: '<p>外部からの攻撃だけでなく、従業員や委託先の担当者による内部不正も情報漏えいの大きな原因です。権限の集中を避け複数人でチェックする体制（相互けん制）、退職前後のアクセス権限の速やかな停止、重要データへのアクセスログの記録・監視といった対策が有効です。動機・機会・正当化の3要素がそろうと不正が起きやすいとされ、機会（アクセスできてしまう状況）を減らすことが組織側でコントロールしやすい対策になります。</p>'
      },
      {
        heading: "試験ではこう出る",
        body: '<p>科目Aでは、クリアデスクの意味や入退室管理の目的を問う基本的な四択が出題されます。科目Bでは、書類の放置や共連れ入室（許可された人の後についていく不正入室）などの事例が示され「この事例で見られた物理的な不備を指摘し、対策を述べよ」という記述が出ることがあります。技術的対策に偏らず、運用・教育面の対策も答えられるようにしておきましょう。</p>'
      }
    ],
    terms: [
      { term: "クリアデスク", desc: "離席時に書類を片付け、机の上に放置しない運用ルール。" },
      { term: "クリアスクリーン", desc: "離席時に画面をロックし、他人に見られないようにする運用ルール。" },
      { term: "入退室管理", desc: "重要エリアへの出入りを記録・制限する仕組み。" },
      { term: "共連れ", desc: "許可された人の後についていき認証なしで入室する不正行為。" },
      { term: "標的型攻撃メール訓練", desc: "従業員に模擬の攻撃メールを送り気づく力を測る・高める訓練。" },
      { term: "生体認証", desc: "指紋や顔などの身体的特徴を使った本人確認方式。" },
      { term: "内部不正", desc: "従業員や委託先など内部の者による情報の持ち出しや不正利用。" },
      { term: "相互けん制", desc: "権限を一人に集中させず複数人で確認し合い不正を防ぐ体制。" }
    ]
  }
});
