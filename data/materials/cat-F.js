window.MATERIALS = window.MATERIALS || {};
Object.assign(window.MATERIALS, {
  f1: {
    unitId: "f1",
    title: `ファイアウォールとネットワーク設計`,
    sections: [
      {
        heading: `ファイアウォールの基本機能`,
        body: `<p>ファイアウォールは、あらかじめ定めたルール（送信元/宛先IPアドレス、ポート番号など）に基づいて通信を許可・遮断する機器です。「必要な通信だけを通し、それ以外はすべて拒否する」という考え方（ホワイトリスト方式）が基本です。ルールは上から順に評価されるのが一般的で、想定外の通信を許可してしまわないよう、最後に「それ以外はすべて拒否」というルールを置いておくことが重要です。また、ルールは定期的に棚卸しし、使われなくなった許可設定を放置しないことも、不要な攻撃対象を減らすうえで重要です。</p>`
      },
      {
        heading: `DMZによるネットワーク分割`,
        body: `<p>外部に公開するサーバーと社内の重要なシステムを同じネットワークに置くと、公開サーバーが攻撃されたときに社内全体へ被害が広がります。そこで、公開サーバーを社内LANとは別の緩衝地帯である<b>DMZ（DeMilitarized Zone）</b>に置き、ファイアウォールで区切ります。</p>`,
        svg: `<svg viewBox="0 0 640 360" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="43" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">インターネット</text>
<line x1="320" y1="60" x2="320" y2="72" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,72 326,72 320,80" fill="var(--grid)"/>
<rect x="70" y="84" width="500" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="111" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">ファイアウォール①</text>
<line x1="320" y1="128" x2="320" y2="140" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,140 326,140 320,148" fill="var(--grid)"/>
<rect x="70" y="152" width="500" height="44" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="179" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">DMZ（公開Webサーバー・メールサーバー）</text>
<line x1="320" y1="196" x2="320" y2="208" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,208 326,208 320,216" fill="var(--grid)"/>
<rect x="70" y="220" width="500" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="247" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">ファイアウォール②</text>
<line x1="320" y1="264" x2="320" y2="276" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,276 326,276 320,284" fill="var(--grid)"/>
<rect x="70" y="288" width="500" height="44" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="320" y="315" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">社内LAN（業務端末・内部サーバー）</text>
</svg>`
      },
      {
        heading: `フィルタリングの方式`,
        body: `<p>フィルタリングには、パケットのヘッダー情報だけを見る<b>パケットフィルタリング型</b>と、通信の流れ（コネクションの状態）を管理してより高精度に判断する<b>ステートフルインスペクション型</b>があります。前者は戻りの通信を許可するルールを個別に用意する必要がありますが、後者は一度許可した通信の応答を自動的に通すため、設定ミスが起きにくいという利点があります。現在の多くのファイアウォールは後者です。ステートフルインスペクション型であっても、許可するポート番号やプロトコルの範囲は必要最小限に絞り込む設計が基本である点は変わりません。</p>`
      },
      {
        heading: `設計のポイント`,
        body: `<p>DMZに置くのは、外部に公開する必要があるサーバー（Web・メール・DNSなど）だけにします。DMZのサーバーが社内LANへ通信を開始することは原則禁止し、万一DMZのサーバーが乗っ取られても社内へ侵入されないようにします。データベースなど機密情報を扱うサーバーは、DMZではなくさらに内側のセグメントに置くのが基本です。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、DMZに配置すべきサーバーの組み合わせや、ファイアウォールの方式（パケットフィルタリング型・ステートフルインスペクション型）の特徴を問う問題が出ます。科目Bでは、ネットワーク構成図が示され、「どの通信を許可・拒否すべきか」「なぜこの構成では侵入が社内まで広がるか」を記述させる出題が見られます。構成図中のどこにどの機器を置くべきかを図と合わせて説明できるようにしておきましょう。あわせて、DMZに置いた機器の脆弱性管理やパッチ適用の運用体制についても問われることがあります。</p>`
      }
    ],
    terms: [
      { term: "ファイアウォール", desc: "定めたルールに基づき通信を許可・遮断する機器。" },
      { term: "DMZ", desc: "インターネットと社内LANの間に置く緩衝地帯。外部公開サーバーを設置する。" },
      { term: "パケットフィルタリング", desc: "パケットのヘッダー情報（アドレス・ポート等）だけを見て通信を制御する方式。" },
      { term: "ステートフルインスペクション", desc: "通信の状態（コネクション）を管理し、より高精度に通信を制御する方式。" },
      { term: "ホワイトリスト方式", desc: "許可する通信だけをあらかじめ定め、それ以外はすべて拒否する考え方。" },
      { term: "セグメント分割", desc: "ネットワークを役割ごとに分割し、被害の範囲を限定する設計手法。" }
    ]
  },

  f2: {
    unitId: "f2",
    title: `IDS/IPS/WAF`,
    sections: [
      {
        heading: `3つの防御機器の違い`,
        body: `<p>IDS・IPS・WAFはいずれも不正な通信を見つける仕組みですが、見る対象と対応が異なります。名前が似ているため、試験では表のように整理して覚えておくと選択肢を絞り込みやすくなります。</p>
<table>
<tr><th>機器</th><th>見る対象</th><th>不正時の対応</th></tr>
<tr><td>IDS</td><td>ネットワーク/ホストの通信全般</td><td>検知して通知するのみ（通信は止めない）</td></tr>
<tr><td>IPS</td><td>ネットワーク/ホストの通信全般</td><td>検知して自動的に遮断する</td></tr>
<tr><td>WAF</td><td>Webアプリへの通信内容（SQLi/XSS等）</td><td>検知して遮断・通知する</td></tr>
</table>
<p>WAFは通信内容（アプリケーション層）まで見るため、ネットワーク層の機器であるIDS/IPSでは検知できないSQLインジェクションやXSSのような攻撃も検知できます。</p>`
      },
      {
        heading: `検知方式：シグネチャ型とアノマリ型`,
        body: `<p>不正の見つけ方には、既知の攻撃パターン（<b>シグネチャ</b>）と一致するかを見る<b>シグネチャ型</b>と、普段と違う通信量やふるまいを見つける<b>アノマリ型</b>があります。シグネチャ型は未知の攻撃を見逃しやすく（フォールスネガティブ）、アノマリ型は正常な通信を誤って攻撃と判定する<b>フォールスポジティブ（誤検知）</b>が起きやすいという弱点があります。多くの製品は両方を組み合わせて検知精度を高めています。近年ではAI・機械学習を用いた異常検知を組み合わせ、誤検知を減らしながら未知の攻撃にも対応しようとする製品も増えています。</p>`
      },
      {
        heading: `配置と誤検知`,
        body: `<p>IDSは通信経路の外に置いて監視だけを行い、IPSは通信経路の途中（インライン）に置いて遮断まで行います。WAFはWebサーバーの手前に置きます。配置場所の違いが、それぞれの機器が「止められるか、止められないか」を決めています。</p>`,
        svg: `<svg viewBox="0 0 640 300" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="50" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="46" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">インターネット</text>
<line x1="320" y1="66" x2="320" y2="78" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,78 326,78 320,86" fill="var(--grid)"/>
<rect x="70" y="86" width="500" height="50" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="116" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">WAF（Webアプリ層の攻撃を検査・遮断）</text>
<line x1="320" y1="136" x2="320" y2="148" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,148 326,148 320,156" fill="var(--grid)"/>
<rect x="70" y="156" width="500" height="50" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="186" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">IPS（ネットワーク層の不正な通信を検知・遮断）</text>
<line x1="320" y1="206" x2="320" y2="218" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,218 326,218 320,226" fill="var(--grid)"/>
<rect x="70" y="226" width="500" height="50" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="320" y="256" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">Webサーバー・社内ネットワーク</text>
</svg>`
      },
      {
        heading: `運用上の注意`,
        body: `<p>IPSやWAFは自動遮断するため、誤検知（フォールスポジティブ）が起きると正常な利用者の通信まで止めてしまいます。導入直後は検知のみのモードで様子を見てからルールを調整し、遮断モードへ切り替える運用が一般的です。検知後のアラートを誰がどう確認し対応するか、運用体制もあわせて決めておく必要があります。遮断ルールを追加・変更した際は、正常な通信への影響がないか事前にテストしてから本番環境へ適用することも欠かせません。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、IDS/IPS/WAFの守備範囲の違いや、フォールスポジティブ・フォールスネガティブの意味を問う問題が出ます。科目Bでは、ログの一部が示され「これはどの機器で検知できるか」「誤検知を減らすにはどう設定すべきか」を答えさせる出題が見られます。検知後の運用フローまで含めて問われることもあります。</p>`
      }
    ],
    terms: [
      { term: "IDS", desc: "不正な通信を検知し通知する仕組み。通信を自動では遮断しない。" },
      { term: "IPS", desc: "不正な通信を検知し自動で遮断する仕組み。通信経路上（インライン）に設置する。" },
      { term: "WAF", desc: "Webアプリケーションへの攻撃（SQLi/XSS等）を検知・遮断する仕組み。" },
      { term: "シグネチャ型", desc: "既知の攻撃パターン（シグネチャ）と一致するかで不正を検知する方式。" },
      { term: "アノマリ型", desc: "普段と異なる通信量やふるまいから不正を検知する方式。" },
      { term: "フォールスポジティブ", desc: "正常な通信を誤って攻撃と判定してしまう誤検知。" },
      { term: "フォールスネガティブ", desc: "実際の攻撃を見逃してしまう検知漏れ。" },
      { term: "インライン配置", desc: "通信経路の途中に機器を設置し、通過する通信を直接制御できる配置方法。" }
    ]
  },

  f3: {
    unitId: "f3",
    title: `VPNとリモートアクセス・ゼロトラスト`,
    sections: [
      {
        heading: `VPNの仕組み`,
        body: `<p><b>VPN（Virtual Private Network）</b>は、インターネットのような公衆網の上に、暗号化された仮想的な専用回線を作る技術です。テレワークで社外から社内ネットワークに安全に接続する用途で広く使われ、暗号化にIPsecやTLSを使う方式が代表的です。拠点間を結ぶ用途と、個人の端末から社内に接続する用途の両方で使われます。近年はSSL-VPN（TLSを用いたVPN）が普及しており、専用ソフトなしでブラウザから接続できる製品も増えています。</p>`
      },
      {
        heading: `従来型（境界防御）とゼロトラストの違い`,
        body: `<p>従来型のVPNは「社内ネットワークに入れた通信は信頼する」という<b>境界防御</b>の考え方が前提でした。しかしテレワークやクラウド利用が進み、「社内か社外か」で区別する意味が薄れています。VPNの入り口さえ突破されれば、内部ネットワークを自由に移動できてしまう点が弱点です。</p>`,
        svg: `<svg viewBox="0 0 640 260" width="100%" style="max-width:640px;height:auto">
<text x="320" y="20" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">従来型（境界防御）</text>
<rect x="10" y="36" width="150" height="56" rx="6" fill="none" stroke="var(--grid)"/>
<text x="85" y="68" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">社外の端末</text>
<line x1="160" y1="64" x2="186" y2="64" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="186,58 186,70 195,64" fill="var(--grid)"/>
<rect x="195" y="36" width="210" height="56" rx="6" fill="none" stroke="var(--grid)"/>
<text x="300" y="68" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">VPNで社内NWに接続</text>
<line x1="405" y1="64" x2="431" y2="64" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="431,58 431,70 440,64" fill="var(--grid)"/>
<rect x="440" y="36" width="190" height="56" rx="6" fill="none" stroke="var(--crit)"/>
<text x="535" y="68" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">社内は信頼され自由にアクセス</text>
<text x="320" y="160" font-family="sans-serif" font-size="13" fill="var(--muted)" text-anchor="middle">ゼロトラスト</text>
<rect x="10" y="176" width="150" height="56" rx="6" fill="none" stroke="var(--grid)"/>
<text x="85" y="208" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">社外の端末</text>
<line x1="160" y1="204" x2="186" y2="204" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="186,198 186,210 195,204" fill="var(--grid)"/>
<rect x="195" y="176" width="210" height="56" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="300" y="208" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">毎回ID・端末状態を検証</text>
<line x1="405" y1="204" x2="431" y2="204" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="431,198 431,210 440,204" fill="var(--grid)"/>
<rect x="440" y="176" width="190" height="56" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="535" y="208" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">必要な範囲のみ最小権限で許可</text>
</svg>`
      },
      {
        heading: `ゼロトラストの考え方`,
        body: `<p><b>ゼロトラスト</b>は「何も信頼せず、常に検証する」という考え方です。社内・社外を区別せず、アクセスのたびに利用者の認証情報・端末の状態（最新のパッチが当たっているか等）を確認し、必要なリソースだけに最小権限でアクセスを許可します。実装の一つに<b>ZTNA（Zero Trust Network Access）</b>があり、利用者ごと・アプリケーションごとに個別の通信経路を確立する製品もあります。導入には利用者ごとのID管理基盤や端末管理（MDM）の整備が前提となるため、単に製品を導入するだけでは実現しません。</p>`
      },
      {
        heading: `導入のポイント`,
        body: `<p>VPNは「入り口」を一つに絞れる利点がある一方、その入り口が破られると内部に広く侵入されるリスクがあります。ゼロトラストへの移行は一度に全社では難しいため、重要度の高いシステムから段階的にアクセス制御を厳格化していくのが現実的です。既存のVPNとゼロトラストを併用しながら移行する組織も多くあります。優先順位を決める際は、重要度の高いシステムだけでなく、外部から狙われやすい公開範囲の広いシステムも早期に対象とすることが望まれます。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、VPNの暗号化方式やゼロトラストの基本概念を問う問題が出ます。科目Bでは、テレワーク環境の構成が示され、「境界防御の限界」や「ゼロトラストではどのようにアクセス制御すべきか」を説明させる出題が見られます。従来型構成の問題点を具体的に指摘できるようにしておきましょう。あわせて、なぜVPNの入り口さえ突破されると内部を自由に移動できてしまうのかを、認証と認可の観点から説明できるようにしておくと得点につながります。</p>`
      }
    ],
    terms: [
      { term: "VPN", desc: "公衆網の上に暗号化された仮想的な専用回線を作る技術。" },
      { term: "IPsec", desc: "IPパケット単位で暗号化・認証を行うVPNの代表的な方式。" },
      { term: "境界防御", desc: "社内と社外の境界を守り、境界の内側の通信は信頼するという考え方。" },
      { term: "ゼロトラスト", desc: "何も信頼せず、アクセスのたびに利用者や端末を検証するという考え方。" },
      { term: "ZTNA", desc: "Zero Trust Network Accessの略。ゼロトラストの考え方に基づくリモートアクセス方式。" },
      { term: "最小権限", desc: "必要な範囲のリソースだけに、必要最小限の権限でアクセスを許可すること。" }
    ]
  },

  f4: {
    unitId: "f4",
    title: `メールセキュリティ(SPF/DKIM/DMARC)`,
    sections: [
      {
        heading: `なぜなりすましメール対策が必要か`,
        body: `<p>メールの送信元（Fromアドレス）は誰でも自由に書き換えられるため、実在する組織を装ったなりすましメール（フィッシングやビジネスメール詐欺）が容易に作れてしまいます。これを防ぐための送信ドメイン認証の仕組みが<b>SPF・DKIM・DMARC</b>です。科目Bで繰り返し出題される定番テーマであり、3つの役割の違いを正確に説明できることが求められます。3つのうちどれか1つだけを導入しても効果は限定的で、SPF・DKIM・DMARCをそろえて運用することが推奨されています。</p>`
      },
      {
        heading: `SPF・DKIM・DMARCの役割`,
        body: `<table>
<tr><th>仕組み</th><th>確認する内容</th></tr>
<tr><td>SPF</td><td>送信元メールサーバーのIPアドレスが、送信ドメインが公開したDNSのリストに含まれるか</td></tr>
<tr><td>DKIM</td><td>メールに付与された電子署名が、送信ドメインの公開鍵で正しく検証できるか（改ざん検知）</td></tr>
<tr><td>DMARC</td><td>SPF・DKIMの結果を踏まえ、失敗したメールを「隔離」「拒否」などどう扱うかをドメイン側が指定</td></tr>
</table>
<p>SPFは経路（送信元IP）を、DKIMは内容の完全性（署名）を、DMARCはその2つの結果をどう扱うかの方針を、それぞれ担っていると整理すると覚えやすくなります。</p>`
      },
      {
        heading: `検証の流れ`,
        body: `<p>受信側のメールサーバーは、次のような順序でなりすましを判定します。いずれか一方でも失敗すればDMARCのポリシーに従って隔離や拒否が行われます。</p>`,
        svg: `<svg viewBox="0 0 640 340" width="100%" style="max-width:640px;height:auto">
<rect x="100" y="16" width="440" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="43" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">送信者がメールを送信</text>
<line x1="320" y1="60" x2="320" y2="70" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,70 326,70 320,76" fill="var(--grid)"/>
<rect x="100" y="76" width="440" height="44" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="103" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">SPF: 送信元IPが正規サーバーの一覧に含まれるか検証</text>
<line x1="320" y1="120" x2="320" y2="130" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,130 326,130 320,136" fill="var(--grid)"/>
<rect x="100" y="136" width="440" height="44" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="163" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">DKIM: 電子署名を送信ドメインの公開鍵で検証</text>
<line x1="320" y1="180" x2="320" y2="190" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,190 326,190 320,196" fill="var(--grid)"/>
<rect x="100" y="196" width="440" height="44" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="320" y="223" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">DMARC: 判定結果に基づき隔離・拒否・配信を決定</text>
<line x1="230" y1="240" x2="185" y2="264" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="180,258 191,265 182,270" fill="var(--grid)"/>
<line x1="410" y1="240" x2="455" y2="264" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="459,265 448,258 450,270" fill="var(--grid)"/>
<rect x="60" y="270" width="230" height="50" rx="6" fill="none" stroke="var(--crit)"/>
<text x="175" y="300" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">認証失敗 → 隔離・拒否</text>
<rect x="350" y="270" width="230" height="50" rx="6" fill="none" stroke="var(--emerald)"/>
<text x="465" y="300" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">認証成功 → 受信トレイへ配信</text>
</svg>`
      },
      {
        heading: `設定のポイント`,
        body: `<p>SPFはDNSのTXTレコードに送信元サーバーの一覧を記載します。DKIMは送信サーバーが秘密鍵でメールに署名し、受信側は公開鍵（同じくDNSのTXTレコード）で検証します。DMARCも同様にDNSのTXTレコードでポリシー（<code>p=quarantine</code>や<code>p=reject</code>など）を宣言し、判定結果のレポートを送信元ドメインの管理者に送る機能も持っています。3つとも自ドメインのDNSレコードを正しく整備することが前提で、ドメイン名やメールサーバーを変更する際は設定の移行漏れに注意が必要です。DMARCのポリシーは、いきなり拒否(reject)にするのではなく、まずレポートのみを受け取るモード(p=none)で運用状況を確認してから段階的に強化するのが一般的です。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、SPF・DKIM・DMARCそれぞれが確認する内容の組み合わせを問う問題が定番です。科目Bでは、ドメイン名変更やメールシステム更改を題材に、DNSレコードの設定内容や「なぜなりすましメールを検知できたか／できなかったか」を記述させる出題が実際にありました（R6秋）。設定変更のタイミングで生じる一時的な不整合についても問われることがあります。</p>`
      }
    ],
    terms: [
      { term: "SPF", desc: "送信元メールサーバーのIPアドレスがドメインの正規リストに含まれるか検証する仕組み。" },
      { term: "DKIM", desc: "メールに付与した電子署名を公開鍵で検証し、改ざんやなりすましを検知する仕組み。" },
      { term: "DMARC", desc: "SPF・DKIMの結果を踏まえ、失敗したメールの扱い方をドメイン側が指定する仕組み。" },
      { term: "送信ドメイン認証", desc: "メールの送信元ドメインが正当であることを検証する技術の総称。" },
      { term: "TXTレコード", desc: "DNSに任意の文字列情報を登録するレコード。SPF/DKIM/DMARCの設定に使われる。" },
      { term: "なりすましメール", desc: "実在する組織や人物を装って送られる偽のメール。" },
      { term: "ビジネスメール詐欺(BEC)", desc: "取引先や経営者になりすまし、送金や情報提供をだまし取る詐欺の手口。" }
    ]
  },

  f5: {
    unitId: "f5",
    title: `DNSセキュリティ`,
    sections: [
      {
        heading: `DNSがなぜ攻撃対象になるか`,
        body: `<p>DNSは名前解決という重要な役割を担う一方、応答の正当性を検証する仕組みが本来備わっていません。偽の応答を信じ込ませることができれば、利用者を偽サイトへ誘導したり通信を盗聴したりできてしまいます。DNSはほぼすべての通信の入り口となるため、ここが偽装されると気づかれにくいまま被害が広がる危険があります。特にインターネットバンキングやWebメールなど、認証情報を入力するサイトへの誘導は被害が大きくなりやすい点に注意が必要です。</p>`
      },
      {
        heading: `キャッシュポイズニングの手順`,
        body: `<p>代表的な攻撃が<b>DNSキャッシュポイズニング</b>です。キャッシュDNSサーバー（利用者の問い合わせを受けて答えを一時保存するサーバー）に偽の情報を覚え込ませます。一度キャッシュに保存されると、有効期限（TTL）が切れるまで多数の利用者が誤った情報を受け取り続けます。</p>`,
        svg: `<svg viewBox="0 0 640 360" width="100%" style="max-width:640px;height:auto">
<rect x="70" y="16" width="500" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="43" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">① 利用者がキャッシュDNSサーバーに問い合わせ</text>
<line x1="320" y1="60" x2="320" y2="72" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,72 326,72 320,80" fill="var(--grid)"/>
<rect x="70" y="84" width="500" height="44" rx="6" fill="none" stroke="var(--grid)"/>
<text x="320" y="111" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">② キャッシュサーバーが権威DNSサーバーへ問い合わせ</text>
<line x1="320" y1="128" x2="320" y2="140" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,140 326,140 320,148" fill="var(--grid)"/>
<rect x="70" y="152" width="500" height="44" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="179" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">③ 攻撃者が偽の応答を先回りして送りつける</text>
<line x1="320" y1="196" x2="320" y2="208" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,208 326,208 320,216" fill="var(--grid)"/>
<rect x="70" y="220" width="500" height="44" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="247" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">④ 偽の応答を正規の回答と誤認しキャッシュに保存</text>
<line x1="320" y1="264" x2="320" y2="276" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="314,276 326,276 320,284" fill="var(--grid)"/>
<rect x="70" y="288" width="500" height="44" rx="6" fill="none" stroke="var(--crit)"/>
<text x="320" y="315" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">⑤ 利用者が偽サイトへ誘導される（対策: DNSSEC等）</text>
</svg>`
      },
      {
        heading: `DNSSECによる対策`,
        body: `<p>対策として、DNSの応答に電子署名を付けて改ざん・偽装を検知できるようにする<b>DNSSEC</b>があります。また、問い合わせのポート番号や識別子(トランザクションID)をランダム化し、攻撃者が偽応答を当てにくくする対策も基本的な防御として有効です。DNSSECは署名の検証に対応した受信側でなければ効果が出ないため、普及には両者の対応が必要という課題もあります。DNSSECを利用する場合、署名の生成・更新や鍵の管理といった運用負荷が増える点も理解しておく必要があります。</p>`
      },
      {
        heading: `その他の脅威（サブドメインテイクオーバー）`,
        body: `<p>もう一つの脅威が<b>サブドメインテイクオーバー</b>です。クラウドサービスなどを紐付けたサブドメイン（例: shop.example.jp）のDNS設定を消し忘れたまま、紐付け先のサービス契約を解約すると、そのサブドメイン名を他人が乗っ取り、正規ドメインの一部として悪意あるコンテンツを配信できてしまいます。利用者からは正規ドメインに見えるため信頼されやすく、フィッシングにも悪用されます。使わなくなったDNSレコードは速やかに削除することが対策です。クラウドサービスの契約を解約する手順の中に、紐付けたDNSレコードの削除を必ず含めておくことが実務上のポイントです。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、DNSSECの目的やキャッシュポイズニングの成立条件を問う問題が出ます。科目Bでは、ドメイン名の変更や移管を題材に「DNS設定の切り替え時にどのようなリスクがあるか」「サブドメインテイクオーバーをどう防ぐか」を記述させる出題が実際にありました（R6秋）。DNSレコードの棚卸しの重要性を説明させる設問もあります。</p>`
      }
    ],
    terms: [
      { term: "DNSキャッシュポイズニング", desc: "キャッシュDNSサーバーに偽の名前解決情報を覚え込ませ、利用者を偽サイトへ誘導する攻撃。" },
      { term: "DNSSEC", desc: "DNSの応答に電子署名を付け、改ざんや偽装を検知できるようにする仕組み。" },
      { term: "権威DNSサーバー", desc: "特定のドメインについて正式な名前解決の答えを持つサーバー。" },
      { term: "キャッシュDNSサーバー", desc: "利用者からの問い合わせを受け、権威DNSサーバーに問い合わせて答えを一時保存するサーバー。" },
      { term: "トランザクションID", desc: "DNSの問い合わせと応答を対応付ける識別子。ランダム化により偽装を防ぐ。" },
      { term: "サブドメインテイクオーバー", desc: "解除されずに残ったDNS設定を悪用し、第三者がサブドメインを乗っ取る攻撃。" }
    ]
  },

  f6: {
    unitId: "f6",
    title: `プロキシとログによる検知`,
    sections: [
      {
        heading: `フォワードプロキシとリバースプロキシ`,
        body: `<p>プロキシは通信を代理で中継する仕組みですが、置く場所によって役割が異なります。「誰の代理として動くか」に注目すると、フォワードとリバースの違いを整理しやすくなります。</p>`,
        svg: `<svg viewBox="0 0 640 280" width="100%" style="max-width:640px;height:auto">
<rect x="10" y="36" width="140" height="66" rx="6" fill="none" stroke="var(--grid)"/>
<text x="80" y="73" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">社内の端末</text>
<line x1="150" y1="69" x2="176" y2="69" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="176,63 176,75 185,69" fill="var(--grid)"/>
<rect x="185" y="36" width="230" height="66" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="300" y="64" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">フォワードプロキシ</text>
<text x="300" y="82" font-family="sans-serif" font-size="12" fill="var(--muted)" text-anchor="middle">URLフィルタ・ログ記録</text>
<line x1="415" y1="69" x2="441" y2="69" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="441,63 441,75 450,69" fill="var(--grid)"/>
<rect x="450" y="36" width="180" height="66" rx="6" fill="none" stroke="var(--grid)"/>
<text x="540" y="73" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">外部のWebサイト</text>
<rect x="10" y="192" width="140" height="66" rx="6" fill="none" stroke="var(--grid)"/>
<text x="80" y="229" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">外部の利用者</text>
<line x1="150" y1="225" x2="176" y2="225" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="176,219 176,231 185,225" fill="var(--grid)"/>
<rect x="185" y="192" width="230" height="66" rx="6" fill="none" stroke="var(--indigo)"/>
<text x="300" y="220" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">リバースプロキシ</text>
<text x="300" y="238" font-family="sans-serif" font-size="12" fill="var(--muted)" text-anchor="middle">負荷分散・WAF機能</text>
<line x1="415" y1="225" x2="441" y2="225" stroke="var(--grid)" stroke-width="1.5"/>
<polygon points="441,219 441,231 450,225" fill="var(--grid)"/>
<rect x="450" y="192" width="180" height="66" rx="6" fill="none" stroke="var(--grid)"/>
<text x="540" y="229" font-family="sans-serif" font-size="13" fill="var(--ink)" text-anchor="middle">社内のWebサーバー</text>
</svg>`
      },
      {
        heading: `ログに残る情報`,
        body: `<p>プロキシやWebサーバーのログには、アクセス日時、送信元IPアドレス、リクエストされたURL、HTTPメソッド、応答ステータスコード、User-Agent（利用ブラウザの情報）などが記録されます。これらは平常時の記録であると同時に、インシデント発生時の重要な調査材料になります。どの情報がどのログに残るかを普段から把握しておくと、有事の調査がスムーズになります。ログの保存形式や項目は製品によって異なるため、あらかじめどのログをどこで確認できるかを整理しておくことが役立ちます。</p>`
      },
      {
        heading: `ログから攻撃を読む`,
        body: `<p>例えば、同一IPアドレスから短時間に大量の401（認証失敗）が記録されていれば総当たり攻撃、URLに<code>' OR '1'='1</code>のような文字列が含まれていればSQLインジェクションの試行が疑われます。ログを時系列に並べ、通常と異なるパターン（普段アクセスしない時間帯・国、大量の同一パターンのリクエストなど）を見つけることが検知の基本です。単発のエラーと、機械的に繰り返されるパターンを見分ける視点が重要です。単一のログだけでなく、FW・IDS/IPS・プロキシなど複数のログを突き合わせることで、攻撃の全体像がより正確に見えてきます。</p>`
      },
      {
        heading: `運用のポイント`,
        body: `<p>ログは改ざんされると調査ができなくなるため、ログ専用サーバーに転送し、書き込んだサーバー側では変更できないようにする、保存期間を定めて必要な期間残す、といった管理が必要です。ログの取得漏れや保存期間の不足は、インシデント発生後の原因調査を困難にする大きな要因になります。複数のログを一元的に集約し相関分析するSIEM（セキュリティ情報イベント管理）ツールを導入する運用も広がっています。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、フォワードプロキシとリバースプロキシの役割の違いを問う問題が出ます。科目Bでは、実際のアクセスログの抜粋が提示され、「どの行が攻撃の痕跡か」「攻撃の種類は何か」を読み取らせる出題が頻出です。ログの読み方に慣れておくことが得点につながります。時刻・IPアドレス・URL・ステータスコードのどこに着目すべきかを意識して練習しましょう。あわせて、フォワードプロキシのログから業務外のサイトへのアクセスを検知するような、内部不正の兆候を見つける観点も出題されることがあります。</p>`
      }
    ],
    terms: [
      { term: "フォワードプロキシ", desc: "社内端末が外部にアクセスする際に経由する、URLフィルタやログ記録を行う中継サーバー。" },
      { term: "リバースプロキシ", desc: "外部利用者が社内サーバーにアクセスする際に経由する、負荷分散等を行う中継サーバー。" },
      { term: "アクセスログ", desc: "誰が・いつ・何にアクセスしたかを記録したログ。インシデント調査の重要な材料。" },
      { term: "ステータスコード", desc: "HTTPの応答結果を表す3桁の数値。401は認証失敗、403は権限不足などを示す。" },
      { term: "User-Agent", desc: "アクセスに使われたブラウザやソフトウェアの情報を示すHTTPヘッダー。" },
      { term: "ログ改ざん対策", desc: "ログを専用サーバーに転送し書き込み後の変更を防ぐなど、証拠能力を保つ仕組み。" }
    ]
  },

  f7: {
    unitId: "f7",
    title: `無線LANセキュリティ`,
    sections: [
      {
        heading: `暗号化方式の変遷（WEP→WPA2→WPA3）`,
        body: `<p>無線LANの暗号化方式は、脆弱性が見つかるたびに置き換えられてきました。<b>WEP</b>は既に解読方法が確立しており使用してはいけません。<b>WPA2</b>はAESベースの暗号化で長く使われてきましたが、事前共有鍵（パスワード）を推測される弱点があり、後継の<b>WPA3</b>ではより安全な鍵交換方式（SAE）が採用されています。古い機器の中にはWPA3に対応していないものもあるため、更新時には対応状況の確認が必要です。無線LANルーターを選ぶ際は、ボタン一つで接続できる簡易設定機能であるWPSに脆弱性が指摘されているため、無効化しておくことも基本的な対策の一つです。</p>`
      },
      {
        heading: `エンタープライズ認証（WPA2/3-Enterprise）`,
        body: `<p>家庭用の多くは全員が同じパスワード（事前共有鍵）を使う<b>パーソナルモード</b>ですが、企業では利用者ごとにIDとパスワードで認証する<b>エンタープライズモード</b>（WPA2/WPA3-Enterprise）を使い、IEEE802.1XとRADIUSサーバーによる個別認証を行います。これにより、退職者のアクセスだけを個別に無効化できます。パーソナルモードでは、パスワードを知っている人全員が同じ鍵を共有するため、退職者だけを締め出すには全員のパスワードを変更する必要があり運用負荷が高くなります。エンタープライズモードの導入にはRADIUSサーバーの構築・運用が必要になるため、小規模な事業所では導入のハードルになることもあります。</p>`
      },
      {
        heading: `偽アクセスポイントのリスクと対策`,
        body: `<p>攻撃者が正規のアクセスポイントに似せた名前（SSID）の<b>偽アクセスポイント（Evil Twin）</b>を用意し、利用者を誤って接続させて通信を盗聴する手口があります。対策として、企業では利用者証明書によるエンタープライズ認証を使う、公衆Wi-Fi利用時は必ずVPNを併用する、といった対策が有効です。利用者への教育として、見慣れないSSIDや認証を求める画面には安易に接続・入力しないよう周知することも欠かせません。接続前にSSIDや証明書の情報を確認する習慣をつけることが、偽アクセスポイントへの誤接続を防ぐ第一歩になります。</p>`
      },
      {
        heading: `試験ではこう出る`,
        body: `<p>科目A-2では、WEP/WPA2/WPA3の暗号化方式の違いや、パーソナルモードとエンタープライズモードの違いを問う問題が出ます。科目Bでは、社外での無線LAN利用を題材に、偽アクセスポイントのリスクや、社員に周知すべき対策を記述させる出題が見られます。テレワークやカフェ等での利用シーンを想定した設問に慣れておくとよいでしょう。</p>`
      }
    ],
    terms: [
      { term: "WEP", desc: "初期の無線LAN暗号化方式。解読方法が確立しており使用してはならない。" },
      { term: "WPA2", desc: "AESベースの無線LAN暗号化方式。長く標準として使われてきた。" },
      { term: "WPA3", desc: "WPA2の後継規格。より安全な鍵交換方式(SAE)を採用している。" },
      { term: "パーソナルモード", desc: "全員が同じ事前共有鍵（パスワード）で接続する認証方式。" },
      { term: "エンタープライズモード", desc: "利用者ごとにIDとパスワードで個別認証する無線LAN認証方式。" },
      { term: "IEEE802.1X", desc: "ネットワーク接続時に利用者を個別認証するための規格。" },
      { term: "RADIUS", desc: "利用者IDとパスワードによる認証を一元的に行うサーバー・プロトコル。" },
      { term: "Evil Twin(偽アクセスポイント)", desc: "正規のアクセスポイントに似せた名前(SSID)で利用者を騙し接続させる偽のAP。" }
    ]
  }
});
