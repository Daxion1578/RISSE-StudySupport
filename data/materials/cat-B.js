window.MATERIALS = window.MATERIALS || {};
Object.assign(window.MATERIALS, {

  b1: {
    unitId: "b1",
    title: "共通鍵暗号と公開鍵暗号",
    sections: [
      { heading: "共通鍵暗号と鍵配送問題", body: "<p>暗号化と復号（元に戻すこと）に同じ鍵を使う方式を共通鍵暗号（対称鍵暗号）と呼びます。代表例はAES（Advanced Encryption Standard）で、計算処理が高速なため、通信内容やファイル全体など大量のデータの暗号化に向いています。しかし弱点があり、通信する2人が「同じ鍵」を事前に安全に共有しておく必要があります。鍵をメールで送れば盗聴されるかもしれませんし、直接会って渡すのは非効率です。この「鍵をどうやって安全に相手に渡すか」という課題を「鍵配送問題」と呼び、共通鍵暗号の仕組みだけでは解決できません。通信相手がn人になると、全員と個別に鍵を共有する場合に必要な鍵の組み合わせ数が急激に増えていくのも、共通鍵暗号だけで大規模なシステムを運用しづらい理由の一つです。</p>" },
      { heading: "公開鍵暗号とハイブリッド暗号", body: "<p>公開鍵暗号は、暗号化用の「公開鍵」と復号用の「秘密鍵」を別々に用意する方式です。公開鍵は誰に知られても問題なく、世界中に公開しても、対応する秘密鍵を持つ本人以外は復号できません。これにより鍵配送問題を解決できますが、その分計算が複雑で、共通鍵暗号に比べると低速です。代表例はRSAや楕円曲線暗号（ECC）です。1990年代までは共通鍵暗号しかなく鍵配送問題の解決が難しかったため、公開鍵暗号の登場はインターネットで安全に通信するうえで画期的な発明でした。そこで実際のTLS通信などでは、最初に公開鍵暗号を使って「共通鍵（セッション鍵）」だけを安全に交換し、その後の実データのやり取りは高速な共通鍵暗号で行う「ハイブリッド暗号」という組み合わせ方式が広く使われています。</p>", svg: "<svg viewBox='0 0 640 280' width='100%' style='max-width:640px;height:auto'><rect x='30' y='30' width='140' height='55' rx='6' fill='none' stroke='var(--grid)'/><text x='100' y='63' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>送信者A</text><rect x='470' y='30' width='140' height='55' rx='6' fill='none' stroke='var(--grid)'/><text x='540' y='63' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>受信者B</text><line x1='170' y1='57' x2='470' y2='57' stroke='var(--indigo)' stroke-width='2'/><polygon points='470,57 458,52 458,62' fill='var(--indigo)'/><text x='320' y='48' font-family='sans-serif' font-size='13' fill='var(--muted)' text-anchor='middle'>Bの公開鍵で共通鍵を暗号化して送る</text><rect x='200' y='120' width='240' height='50' rx='6' fill='none' stroke='var(--emerald)'/><text x='320' y='150' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>Bが秘密鍵で復号→共通鍵を得る</text><line x1='320' y1='170' x2='320' y2='210' stroke='var(--indigo)' stroke-width='2'/><polygon points='320,210 315,198 325,198' fill='var(--indigo)'/><rect x='150' y='220' width='340' height='50' rx='6' fill='none' stroke='var(--grid)'/><text x='320' y='250' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>以後は共通鍵暗号(AES等)で高速に通信</text></svg>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「共通鍵暗号と公開鍵暗号の速度・鍵の数・鍵配送問題の違い」「AES・RSA・楕円曲線暗号の分類」が定番です。</p><p><b>科目B（記述）</b>: TLSのハンドシェイクやシステム設計のシナリオで、「なぜ最初だけ公開鍵暗号を使い、その後は共通鍵暗号に切り替えるのか（速度と安全性の両立）」を説明させる問題が出ます。b3・b4と合わせて、鍵の種類と流れをセットで説明できるようにしておきましょう。</p>" }
    ],
    terms: [
      { term: "共通鍵暗号（対称鍵暗号）", desc: "暗号化と復号に同じ鍵を使う方式。高速だが鍵配送問題を抱える。代表例はAES。" },
      { term: "公開鍵暗号（非対称鍵暗号）", desc: "暗号化用の公開鍵と復号用の秘密鍵が異なる方式。鍵配送問題を解決するが低速。代表例はRSA・楕円曲線暗号。" },
      { term: "鍵配送問題", desc: "共通鍵をどうやって安全に相手と共有するかという課題。" },
      { term: "ハイブリッド暗号", desc: "公開鍵暗号で共通鍵を安全に交換し、以降は共通鍵暗号で高速に通信する方式。TLSで採用される。" },
      { term: "AES", desc: "現在標準的に使われる共通鍵暗号方式。" },
      { term: "RSA", desc: "素因数分解の困難さを安全性の根拠とする公開鍵暗号方式。" },
      { term: "楕円曲線暗号（ECC）", desc: "楕円曲線上の数学的問題の困難さを利用する公開鍵暗号。RSAより短い鍵長で同等の安全性を実現できる。" }
    ]
  },

  b2: {
    unitId: "b2",
    title: "ハッシュ関数とMAC",
    sections: [
      { heading: "ハッシュ関数の性質", body: "<p>ハッシュ関数は、どんな長さのデータを入れても常に一定長の値（ハッシュ値・メッセージダイジェスト）を出力する関数です。代表例はSHA-2（SHA-256など）やSHA-3です。ファイルのダウンロードページに「SHA-256: xxxx」のような値が併記されているのを見たことがあるかもしれませんが、あれは受け取ったファイルのハッシュ値を自分で計算し、公開されている値と一致するかどうかで改ざん・破損の有無を確認するためのものです。重要な性質は3つあり、（1）同じ入力からは必ず同じ出力が得られる、（2）ハッシュ値から元のデータを逆算することは事実上不可能（一方向性）、（3）異なる入力から同じハッシュ値が生まれること（衝突）が起きにくい、というものです。これらの性質のおかげで、データが1ビットでも改ざんされるとハッシュ値がまったく異なる値に変わるため、「データが元のまま変わっていないか」を確認する完全性の検証に広く使われます。</p>" },
      { heading: "パスワード保存とMAC・HMAC", body: "<p>Webサービスがパスワードをそのまま保存すると、漏えい時にすぐ悪用されてしまいます。そこでハッシュ関数（かつ「ソルト」というランダムな値を混ぜたもの）を使い、ハッシュ値だけを保存するのが基本です。一方、通信の完全性を確認したい場合には、ハッシュ関数に「共通鍵」を組み合わせたMAC（Message Authentication Code）を使います。代表的な方式がHMACで、送信者と受信者だけが知る鍵を使ってハッシュ値（MAC値）を計算するため、鍵を持たない第三者はデータを改ざんしてもMAC値を偽造できず、改ざん検知に加えて「鍵を知る正当な相手からのデータであること」もある程度確認できます。</p>", svg: "<svg viewBox='0 0 640 260' width='100%' style='max-width:640px;height:auto'><rect x='30' y='40' width='130' height='50' rx='6' fill='none' stroke='var(--grid)'/><text x='95' y='70' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>データ</text><rect x='230' y='40' width='150' height='50' rx='6' fill='none' stroke='var(--grid)'/><text x='305' y='63' font-family='sans-serif' font-size='12' fill='var(--ink)' text-anchor='middle'>ハッシュ関数</text><text x='305' y='80' font-family='sans-serif' font-size='11' fill='var(--muted)' text-anchor='middle'>+共通鍵</text><rect x='470' y='40' width='140' height='50' rx='6' fill='none' stroke='var(--emerald)'/><text x='540' y='70' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>MAC値</text><line x1='160' y1='65' x2='230' y2='65' stroke='var(--indigo)' stroke-width='2'/><polygon points='230,65 220,60 220,70' fill='var(--indigo)'/><line x1='380' y1='65' x2='470' y2='65' stroke='var(--indigo)' stroke-width='2'/><polygon points='470,65 460,60 460,70' fill='var(--indigo)'/><text x='320' y='140' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>受信側も同じ鍵でMAC値を計算し、送られてきたMAC値と比較する</text><text x='320' y='165' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>一致すれば「改ざんされていない」かつ「鍵を知る相手からのデータ」と分かる</text></svg>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「ハッシュ関数の一方向性・衝突耐性の意味」「MACとハッシュ関数だけの違い（鍵の有無）」「HMACの仕組み」が問われます。</p><p><b>科目B（記述）</b>: パスワード漏えい事案で「ハッシュ化とソルトの有無による被害の違い」を説明させる問題や、通信の改ざん検知の仕組みとしてMAC・HMACを説明させる問題が出ます。デジタル署名（b3）との違い（鍵が共通鍵かペアの公開鍵・秘密鍵か）を混同しないよう整理しておきましょう。</p>" }
    ],
    terms: [
      { term: "ハッシュ関数", desc: "任意長のデータから一定長のハッシュ値を生成する関数。一方向性を持つ。" },
      { term: "一方向性", desc: "ハッシュ値から元のデータを求めることが事実上できないという性質。" },
      { term: "衝突（コリジョン）", desc: "異なる入力データから同じハッシュ値が生成されてしまうこと。安全なハッシュ関数では起きにくい。" },
      { term: "ソルト", desc: "パスワードなどをハッシュ化する際に加えるランダムな値。同じパスワードでも異なるハッシュ値になる。" },
      { term: "MAC（メッセージ認証コード）", desc: "共通鍵とハッシュ関数等を組み合わせて、データの改ざん検知と送信者の確認を行う値。" },
      { term: "HMAC", desc: "ハッシュ関数を使った代表的なMACの構成方式。" },
      { term: "SHA-2/SHA-3", desc: "現在広く使われている安全なハッシュ関数のファミリー。" }
    ]
  },

  b3: {
    unitId: "b3",
    title: "デジタル署名とPKI・証明書",
    sections: [
      { heading: "デジタル署名の仕組み", body: "<p>デジタル署名は、公開鍵暗号の仕組みを逆向きに使って「本人が作成し、改ざんされていない」ことを証明する技術です。送信者はまずデータのハッシュ値を計算し、それを自分の「秘密鍵」で暗号化（これを署名と呼びます）します。受信者は送信者の「公開鍵」でその署名を復号し、自分で計算したハッシュ値と一致するか確認します。一致すれば、秘密鍵を持つ本人が署名したこと（本人性・後から本人が「自分ではない」と言い張れない否認防止）と、データが送信後に変わっていないこと（完全性）の両方が確認できます。</p>", svg: "<svg viewBox='0 0 640 260' width='100%' style='max-width:640px;height:auto'><rect x='30' y='30' width='170' height='70' rx='6' fill='none' stroke='var(--grid)'/><text x='115' y='58' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>送信者:秘密鍵で</text><text x='115' y='78' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>ハッシュ値を署名</text><rect x='440' y='30' width='170' height='70' rx='6' fill='none' stroke='var(--grid)'/><text x='525' y='58' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>受信者:公開鍵で</text><text x='525' y='78' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>署名を検証</text><line x1='200' y1='65' x2='440' y2='65' stroke='var(--indigo)' stroke-width='2'/><polygon points='440,65 428,60 428,70' fill='var(--indigo)'/><text x='320' y='55' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>データ＋署名を送付</text><rect x='170' y='150' width='300' height='60' rx='6' fill='none' stroke='var(--emerald)'/><text x='320' y='175' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>ハッシュ値が一致すれば</text><text x='320' y='195' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>本人性と完全性を確認できる</text><line x1='320' y1='100' x2='320' y2='150' stroke='var(--indigo)' stroke-width='2'/><polygon points='320,150 315,138 325,138' fill='var(--indigo)'/></svg>" },
      { heading: "PKIと証明書チェーン、失効", body: "<p>ここで新たな疑問が生まれます。「その公開鍵が本当にその人（サーバー）のものだ」とどうやって確認するのでしょうか。この信頼を支える仕組みがPKI（公開鍵基盤）です。信頼できる第三者機関である認証局（CA）が、公開鍵の持ち主を確認したうえで「デジタル証明書」を発行し、その証明書自体にCAが署名します。CAには「ルートCA」と、その配下で実務上の発行を行う「中間CA」があり、実際の証明書検証では末端の証明書から中間CA、ルートCAへとさかのぼって信頼を確認します。ブラウザはあらかじめ信頼するCAの一覧を持っており、証明書がそのCA（またはさらに上位のCAからの署名の連鎖=証明書チェーン）によって正しく署名されていることを検証します。証明書は有効期限内であっても、秘密鍵の漏えいなどにより途中で失効させる必要が生じることがあり、その確認にはCRL（失効した証明書の一覧をまとめて配布する方式）やOCSP（1件ずつオンラインで問い合わせる方式）が使われます。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「デジタル署名で確認できること（本人性・完全性）」「CAの役割」「CRLとOCSPの違い」が定番です。</p><p><b>科目B（記述）</b>: サーバー証明書の検証エラーが発生した際の原因切り分け（有効期限切れ・証明書チェーンの不備・失効）や、なぜ自己署名証明書がブラウザに警告されるのかを説明させる問題が出ます。b4（TLS）と合わせて、証明書がTLS通信の中でどう検証されるかを一連の流れとして説明できるようにしておきましょう。</p>" }
    ],
    terms: [
      { term: "デジタル署名", desc: "秘密鍵でハッシュ値を暗号化し、公開鍵で検証することで本人性と完全性を確認する技術。" },
      { term: "PKI（公開鍵基盤）", desc: "認証局を中心に公開鍵の正当性を保証する社会的な仕組み全体。" },
      { term: "認証局（CA）", desc: "公開鍵の持ち主を確認し、デジタル証明書を発行する信頼された第三者機関。" },
      { term: "デジタル証明書", desc: "公開鍵とその持ち主の情報をCAが署名して保証したデータ。" },
      { term: "証明書チェーン", desc: "サーバー証明書からルートCAまで、署名によってつながる信頼の連鎖。" },
      { term: "CRL（証明書失効リスト）", desc: "失効した証明書の一覧。ブラウザ等はこれと照合して失効を確認できる。" },
      { term: "OCSP", desc: "証明書が失効していないかを1件ずつオンラインで問い合わせる仕組み。CRLより即時性が高い。" }
    ]
  },

  b4: {
    unitId: "b4",
    title: "TLSの仕組み",
    sections: [
      { heading: "TLSハンドシェイクの流れ", body: "<p>HTTPS通信の裏側では、実データをやり取りする前にTLS（Transport Layer Security）による「ハンドシェイク」という準備段階が行われます。大まかな流れは、（1）クライアントが対応する暗号方式の一覧を提示し、（2）サーバーがサーバー証明書（公開鍵入り）を提示し、（3）クライアントが証明書をCAの署名の連鎖で検証したうえで共通鍵のもとになる情報を公開鍵で暗号化して送り、（4）双方が同じ共通鍵を導出して以降の通信を暗号化する、というものです。この手順の中に、これまで学んだ公開鍵暗号（b1）・デジタル署名/証明書検証（b3）・共通鍵暗号（b1）がすべて登場します。ハンドシェイクが完了すると、以降のやり取りは暗号化された「TLSセッション」として扱われ、ブラウザのアドレスバーの鍵マークはこのセッションが確立していることの目印です。</p>", svg: "<svg viewBox='0 0 640 300' width='100%' style='max-width:640px;height:auto'><rect x='30' y='30' width='140' height='50' rx='6' fill='none' stroke='var(--grid)'/><text x='100' y='60' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>クライアント</text><rect x='460' y='30' width='140' height='50' rx='6' fill='none' stroke='var(--grid)'/><text x='530' y='60' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>サーバー</text><line x1='170' y1='90' x2='460' y2='90' stroke='var(--indigo)' stroke-width='2'/><polygon points='460,90 448,85 448,95' fill='var(--indigo)'/><text x='320' y='82' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>① 対応可能な暗号方式を提示</text><line x1='460' y1='125' x2='170' y2='125' stroke='var(--indigo)' stroke-width='2'/><polygon points='170,125 182,120 182,130' fill='var(--indigo)'/><text x='320' y='117' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>② サーバー証明書(公開鍵)を提示</text><text x='320' y='150' font-family='sans-serif' font-size='12' fill='var(--emerald)' text-anchor='middle'>③ クライアントがCAの署名で証明書を検証</text><line x1='170' y1='175' x2='460' y2='175' stroke='var(--indigo)' stroke-width='2'/><polygon points='460,175 448,170 448,180' fill='var(--indigo)'/><text x='320' y='200' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>④ 公開鍵で暗号化した鍵情報を送付</text><rect x='180' y='230' width='280' height='50' rx='6' fill='none' stroke='var(--emerald)'/><text x='320' y='260' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>共通鍵で暗号化された通信を開始</text></svg>" },
      { heading: "TLS1.3の改善点", body: "<p>現在推奨されている最新版のTLS1.3は、旧バージョン(TLS1.0〜1.2)で見つかった弱い暗号方式を廃止し、より安全な組み合わせ（暗号スイート）だけに絞り込みました。またハンドシェイクの往復回数を減らして接続を高速化しています。実務上・試験上のポイントは、「TLS＝暗号化だけでなく、サーバーが本物かどうかの認証もセットで行っている」という点です。証明書の検証を省略・無視する設定（例: プログラムの中で証明書エラーを無視するようなコード）は、暗号化されていても通信相手が偽物である可能性を残してしまい、TLSの意味を半分失わせてしまいます。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「TLSハンドシェイクの大まかな流れ」「TLS1.3の特徴（旧方式の廃止・高速化）」「HTTPSが提供する機能（暗号化＋サーバー認証）」が問われます。</p><p><b>科目B（記述）</b>: SaaS連携やシステム間通信のシナリオで、証明書検証を省略した実装がなぜ危険か（中間者攻撃を許してしまう）を説明させる問題や、TLSのどの段階でどんな脆弱性が悪用され得るかを問う問題が頻出です。b3の証明書チェーンの知識とセットで狙われます。</p>" }
    ],
    terms: [
      { term: "TLS", desc: "通信を暗号化し、通信相手の認証も行うプロトコル。HTTPSはHTTP＋TLS。" },
      { term: "TLSハンドシェイク", desc: "実データの送受信前に、暗号方式の決定・証明書検証・鍵交換を行う準備手順。" },
      { term: "暗号スイート", desc: "TLSで使う鍵交換・暗号化・ハッシュ関数などの組み合わせのセット。" },
      { term: "TLS1.3", desc: "現在推奨される最新のTLSバージョン。弱い暗号方式を廃止し高速化した。" },
      { term: "サーバー証明書", desc: "サーバーの公開鍵とその持ち主情報をCAが署名して保証した証明書。TLSハンドシェイクで提示される。" },
      { term: "中間者攻撃（MITM）", desc: "通信の途中に割り込み、盗聴や改ざんを行う攻撃。証明書検証の省略で成立しやすくなる。" }
    ]
  },

  b5: {
    unitId: "b5",
    title: "暗号技術の応用と危殆化",
    sections: [
      { heading: "乱数と鍵管理", body: "<p>暗号技術は、鍵そのものの安全性に加えて「鍵を作るときに使う乱数」の質にも強く依存します。予測できる規則性のある乱数（疑似乱数）で鍵を生成してしまうと、攻撃者が鍵を推測できてしまうことがあり、暗号強度の高いアルゴリズムを使っていても意味がなくなります。そのため暗号用途には「暗号論的に安全な乱数生成器」が使われます。また、生成した鍵は安全な場所（ハードウェアセキュリティモジュール等）で管理し、漏えい時の被害範囲を抑えるために定期的に更新（鍵のローテーション）することも重要な運用ポイントです。</p>" },
      { heading: "危殆化と耐量子暗号", body: "<p>「危殆化」とは、これまで安全とされていた暗号アルゴリズムが、コンピュータの計算能力向上や新しい解読方法の発見によって、次第に安全でなくなっていく現象を指します。実際に古いハッシュ関数（MD5・SHA-1）や短い鍵長のRSAは、衝突や解読の実例が報告され、現在では推奨されていません。さらに将来的な脅威として、量子コンピュータが実用化されると、現在の公開鍵暗号（RSA・楕円曲線暗号）の安全性の根拠となる数学的問題（素因数分解や離散対数問題）が効率的に解かれてしまう可能性が指摘されています。これに備え、量子コンピュータでも解読が困難とされる新しい暗号方式「耐量子暗号（PQC）」の標準化と、既存システムからの移行が国際的に進められています。支援士試験の学習という観点では、耐量子暗号の数式まで理解する必要はなく、「危殆化した暗号は使い続けてはいけない」「危殆化はいつか必ず起こるものとして、鍵長やアルゴリズムを見直す運用（暗号のライフサイクル管理）が必要」という考え方を押さえておけば十分です。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「危殆化の意味」「MD5・SHA-1が非推奨である理由」「耐量子暗号（PQC）という言葉の意味」が問われます。</p><p><b>科目B（記述）</b>: システムで古い暗号方式が使われ続けているリスクを指摘させる問題や、暗号資産（仮想通貨）交換業のセキュリティのように、鍵管理の甘さが被害につながるシナリオ（令和7年秋で出題）で、乱数・鍵管理の重要性を説明させる問題が出ます。新しい技術は台頭から2〜3年で出題されやすい傾向があるため、耐量子暗号のような新しい話題にも軽く目を通しておくとよいでしょう。</p>" }
    ],
    terms: [
      { term: "危殆化", desc: "暗号アルゴリズムが計算能力の向上等により安全でなくなっていく現象。" },
      { term: "暗号論的乱数生成器", desc: "鍵生成などの暗号用途に使う、予測困難性を保証された乱数生成の仕組み。" },
      { term: "鍵のローテーション", desc: "鍵を定期的に更新し、漏えい時の被害範囲や解読リスクを抑える運用。" },
      { term: "MD5・SHA-1", desc: "かつて広く使われたが、衝突が発見され現在は非推奨とされるハッシュ関数。" },
      { term: "耐量子暗号（PQC）", desc: "量子コンピュータでも解読が困難とされるよう設計された次世代の暗号方式。" },
      { term: "HSM（ハードウェアセキュリティモジュール）", desc: "鍵の生成・保管・暗号演算を安全に行う専用のハードウェア機器。" }
    ]
  }

});
