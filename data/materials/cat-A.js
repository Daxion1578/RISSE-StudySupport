window.MATERIALS = window.MATERIALS || {};
Object.assign(window.MATERIALS, {

  a1: {
    unitId: "a1",
    title: "コンピュータとOSの基礎",
    sections: [
      { heading: "OSがやっていること", body: "<p>OS（オペレーティングシステム。Windows・Linuxなど）は、CPUやメモリ、ディスクといったハードウェアを管理し、複数のアプリケーションを同時に動かすための土台です。実行中のプログラムを「プロセス」と呼び、OSはプロセスごとにメモリ領域を分離して割り当てます。この分離があるおかげで、あるアプリが暴走したりバグを含んでいたりしても、他のアプリやOS本体には（本来は）影響しません。この境界を意図的に突破し、本来アクセスできないメモリ領域を書き換えてしまうのが、バッファオーバーフローなどの脆弱性を悪用する攻撃です（d6で詳しく学びます）。</p>" },
      { heading: "ファイルとアクセス権限", body: "<p>OSはファイルやフォルダごとに「誰が読める・書ける・実行できるか」という権限を管理します。Linuxではファイルの所有者・所属グループ・その他の利用者に対して、読み取り(r)・書き込み(w)・実行(x)の権限を個別に設定する方式が代表的です。Windowsもアクセス制御リスト（ACL）で同様の管理を行います。管理者権限（Windowsの Administrator、Linuxの root）を奪われると、こうした権限チェックの仕組みそのものを迂回されてしまうため、攻撃者は侵入後に一般ユーザー権限から管理者権限へ引き上げる「権限昇格（Privilege Escalation）」を狙います。日常業務では管理者権限でログインし続けず、必要な作業のときだけ昇格する運用（最小権限の原則）が基本的な対策です。</p>" },
      { heading: "仮想化とコンテナ", body: "<p>1台の物理サーバー上で複数のOSを独立して動かす技術を仮想化と呼びます。仮想マシン（VM）はCPUやメモリなどハードウェアごとエミュレートして、ゲストOSを丸ごと1つ動かす方式です。一方コンテナ（Dockerなどが代表例）は、ホストOSのカーネルを共有しつつ、プロセスやファイルシステムだけをアプリケーションごとに分離する、より軽量で起動の速い方式です。クラウドサービスの多くはこの仮想化技術の上に成り立っており、1台の物理基盤を複数の利用者で分け合う構造になっています。この構造を理解しておくことは、後述するクラウドセキュリティにおける「責任共有モデル」（クラウド事業者と利用者のどちらがどこまで責任を負うか）を理解する前提にもなります。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「プロセスとスレッドの違い」「アクセス権限（rwx）の意味」「仮想化とコンテナの違い」「最小権限の原則」など、用語の定義と特徴を問う四択が中心です。</p><p><b>科目B（記述）</b>: 単独の大問になることは少なく、インシデント対応やマルウェア感染のシナリオの中で「管理者権限で常時ログインしていたため被害が拡大した」「サーバーのOSやミドルウェアのアップデート（パッチ適用）が長期間放置されていた」といった、運用の甘さを指摘させる設問の背景知識として繰り返し登場します。</p>" }
    ],
    terms: [
      { term: "プロセス", desc: "実行中のプログラムの単位。OSはプロセスごとにメモリ領域を分離して管理する。" },
      { term: "権限昇格（Privilege Escalation）", desc: "一般ユーザー権限から管理者権限などへ不正に権限を引き上げる攻撃手法。" },
      { term: "最小権限の原則", desc: "利用者やプロセスには業務に必要な最小限の権限のみを与えるという設計原則。" },
      { term: "仮想化", desc: "1台の物理マシン上に複数の独立したOS環境（仮想マシン）を作る技術。" },
      { term: "コンテナ", desc: "OSのカーネルを共有しながらアプリケーションの実行環境を分離する軽量な仮想化技術。" },
      { term: "アクセス制御リスト（ACL）", desc: "誰がどのファイルに対しどんな操作を許可されているかを定義した一覧。" },
      { term: "パッチ適用", desc: "OSやソフトウェアの脆弱性を修正する更新プログラムを適用すること。放置は攻撃の入り口になる。" }
    ]
  },

  a2: {
    unitId: "a2",
    title: "TCP/IPとIPアドレス",
    sections: [
      { heading: "IPアドレスとルーティング", body: "<p>インターネット上の機器を識別する住所がIPアドレスです。IPv4は「192.168.1.1」のような32ビットの数値、IPv6はアドレス枯渇に対応するためより広い空間を持つ128ビットの表記を使います。ネットワーク機器（ルーター）は宛先IPアドレスを見て、次にどの経路へパケットを転送するかを判断します。これを「ルーティング」と呼びます。社内LANなどで使われる「プライベートIPアドレス」（192.168.x.xなど）は、そのままではインターネットに出られないため、NAT（NAPT）という技術でインターネット上で使えるグローバルIPアドレスに変換して通信します。1つのグローバルIPアドレスを複数の端末で共有できるのは、このNAPTがポート番号まで使って変換しているためです。</p>" },
      { heading: "TCPとUDP、ポート番号", body: "<p>IPが「どのコンピュータに届けるか」を担当するのに対し、TCP/UDPは「そのコンピュータの中のどのアプリケーションに届けるか」をポート番号で識別します。TCPはコネクション（3ウェイハンドシェイク）を確立し、パケットが届いたかどうかを確認応答しながら通信する信頼性重視の方式で、Web（HTTP/HTTPS）やメール、ファイル転送に使われます。UDPは確認応答や順序制御を省いた軽量な方式で、DNSの問い合わせや動画配信、音声通話など速度優先の用途に使われます。ポート番号は0〜65535のうち、80(HTTP)・443(HTTPS)・22(SSH)・25(SMTP)・53(DNS)などが「well-knownポート」として世界共通で決まっています。</p>", svg: "<svg viewBox='0 0 640 260' width='100%' style='max-width:640px;height:auto'><rect x='40' y='40' width='160' height='60' rx='6' fill='none' stroke='var(--grid)'/><text x='120' y='75' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>クライアント</text><rect x='440' y='40' width='160' height='60' rx='6' fill='none' stroke='var(--grid)'/><text x='520' y='75' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>サーバー</text><line x1='200' y1='95' x2='440' y2='95' stroke='var(--indigo)' stroke-width='2'/><polygon points='440,95 428,90 428,100' fill='var(--indigo)'/><text x='320' y='85' font-family='sans-serif' font-size='13' fill='var(--muted)' text-anchor='middle'>SYN</text><line x1='440' y1='130' x2='200' y2='130' stroke='var(--indigo)' stroke-width='2'/><polygon points='200,130 212,125 212,135' fill='var(--indigo)'/><text x='320' y='122' font-family='sans-serif' font-size='13' fill='var(--muted)' text-anchor='middle'>SYN/ACK</text><line x1='200' y1='165' x2='440' y2='165' stroke='var(--indigo)' stroke-width='2'/><polygon points='440,165 428,160 428,170' fill='var(--indigo)'/><text x='320' y='157' font-family='sans-serif' font-size='13' fill='var(--muted)' text-anchor='middle'>ACK</text><text x='320' y='200' font-family='sans-serif' font-size='13' fill='var(--emerald)' text-anchor='middle'>3ウェイハンドシェイクでコネクション確立</text><text x='320' y='225' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>宛先IP=どのサーバーか／宛先ポート=サーバー内のどのアプリか（例:443=HTTPS）</text></svg>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「IPアドレスとポート番号の役割の組み合わせ」「TCPとUDPの違い（信頼性と速度のトレードオフ）」「NAPTの役割」「well-knownポート番号（80/443/22/25/53など）」が定番です。</p><p><b>科目B（記述）</b>: 単独出題は少ないですが、ネットワーク構成図を読んでどの機器・区間が攻撃経路になり得るかを答える設問の前提知識として頻繁に使われます。DDoS攻撃の通信の流れやNW機器のログを説明する場合にも、IP・ポートの理解が欠かせません。</p>" }
    ],
    terms: [
      { term: "IPアドレス", desc: "ネットワーク上の機器を識別する番号。IPv4は32ビット、IPv6は128ビット。" },
      { term: "プライベートIPアドレス", desc: "組織内など限定された範囲でのみ使われるIPアドレス。インターネットには直接出られない。" },
      { term: "NAT(NAPT)", desc: "プライベートIPアドレスとグローバルIPアドレスを相互変換する技術。ポート番号も併用するものをNAPTと呼ぶ。" },
      { term: "ポート番号", desc: "同じIPアドレス内でどのアプリケーション・サービス宛かを識別する番号。" },
      { term: "TCP", desc: "コネクションを確立し、到達確認をしながら通信する信頼性重視のプロトコル。" },
      { term: "UDP", desc: "コネクションを確立せず、確認応答を省略する軽量なプロトコル。" },
      { term: "3ウェイハンドシェイク", desc: "TCPでコネクションを確立する際のSYN→SYN/ACK→ACKという3段階のやり取り。" }
    ]
  },

  a3: {
    unitId: "a3",
    title: "DNSの仕組み",
    sections: [
      { heading: "名前解決の流れ", body: "<p>人間が覚えやすい「example.jp」のようなドメイン名を、コンピュータが通信に使うIPアドレスへ変換する仕組みをDNS（Domain Name System）と呼び、この変換作業を「名前解決」と言います。利用者のPCはまず「キャッシュサーバー（フルサービスリゾルバ）」に問い合わせます。キャッシュサーバーは答えを知らなければ、ルート→トップレベルドメイン(.jp等)を管理するサーバー→そのドメインの「権威サーバー」の順に順番にたどっていき、最終的な答え（IPアドレス）を見つけ出して、その結果を一定時間キャッシュ（保存）します。この「権威サーバー」が、そのドメインの正しい情報を管理する本家のサーバーです。</p>", svg: "<svg viewBox='0 0 640 300' width='100%' style='max-width:640px;height:auto'><rect x='20' y='120' width='120' height='55' rx='6' fill='none' stroke='var(--grid)'/><text x='80' y='152' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>利用者PC</text><rect x='250' y='120' width='140' height='55' rx='6' fill='none' stroke='var(--grid)'/><text x='320' y='145' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>キャッシュ</text><text x='320' y='162' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>サーバー</text><rect x='500' y='20' width='120' height='50' rx='6' fill='none' stroke='var(--grid)'/><text x='560' y='50' font-family='sans-serif' font-size='12' fill='var(--ink)' text-anchor='middle'>ルート</text><rect x='500' y='110' width='120' height='50' rx='6' fill='none' stroke='var(--grid)'/><text x='560' y='140' font-family='sans-serif' font-size='12' fill='var(--ink)' text-anchor='middle'>.jp</text><rect x='500' y='200' width='120' height='50' rx='6' fill='none' stroke='var(--emerald)'/><text x='560' y='223' font-family='sans-serif' font-size='12' fill='var(--ink)' text-anchor='middle'>権威サーバー</text><text x='560' y='240' font-family='sans-serif' font-size='11' fill='var(--muted)' text-anchor='middle'>(example.jp)</text><line x1='140' y1='147' x2='250' y2='147' stroke='var(--indigo)' stroke-width='2'/><polygon points='250,147 240,142 240,152' fill='var(--indigo)'/><line x1='390' y1='135' x2='500' y2='90' stroke='var(--muted)' stroke-width='1.5'/><line x1='390' y1='145' x2='500' y2='140' stroke='var(--muted)' stroke-width='1.5'/><line x1='390' y1='160' x2='500' y2='220' stroke='var(--muted)' stroke-width='1.5'/><text x='280' y='270' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>キャッシュサーバーがルート→.jp→権威サーバーの順に問い合わせて答えを見つける</text></svg>" },
      { heading: "レコードの種類とキャッシュ", body: "<p>DNSにはドメイン名とIPアドレスを結びつける情報以外にも役割ごとの「リソースレコード」があります。代表的なものは、ドメイン名をIPv4アドレスに変換するAレコード、メールの配送先サーバーを示すMXレコード、別名を定義するCNAMEレコードです。名前解決のたびに毎回権威サーバーへ問い合わせていると時間がかかり負荷も高いため、キャッシュサーバーはTTL（Time To Live）という有効期限の間だけ結果を保存し、期限が切れるまでは同じ答えを使い回します。ドメインやサーバーを移転・変更した際、旧サーバーの情報が古いキャッシュとして各所に残っていると、利用者が意図しない旧サーバーへアクセスし続けてしまう問題が起こり得ます（令和6年秋 科目Bで実際に出題されました）。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「権威サーバーとキャッシュサーバーの役割の違い」「Aレコード・MXレコード・CNAMEの意味」「TTLの役割」が問われます。</p><p><b>科目B（記述）</b>: ドメイン名やサーバーの移転に伴い、DNSレコードの変更手順やTTLの事前短縮、切替期間中に旧サーバーへのアクセスが残るリスクとその対策を記述させる問題が出ています（令和6年秋）。移転作業のどの段階でどんな問題が起き得るかを、時系列で説明できるようにしておきましょう。f5（DNSセキュリティ）と合わせて学習すると理解が深まります。</p>" }
    ],
    terms: [
      { term: "名前解決", desc: "ドメイン名をIPアドレスに変換する処理。DNSの中心的な役割。" },
      { term: "権威サーバー", desc: "特定ドメインの正式な情報（IPアドレス等）を管理・応答するサーバー。" },
      { term: "キャッシュサーバー（フルサービスリゾルバ）", desc: "利用者からの問い合わせを受け、必要なら他のサーバーに問い合わせて結果をキャッシュするサーバー。" },
      { term: "Aレコード", desc: "ドメイン名とIPv4アドレスを対応付けるDNSレコード。" },
      { term: "MXレコード", desc: "そのドメイン宛のメールを受け取るサーバーを指定するDNSレコード。" },
      { term: "CNAMEレコード", desc: "あるドメイン名に対して別のドメイン名（別名）を割り当てるDNSレコード。" },
      { term: "TTL(Time To Live)", desc: "DNSの応答結果をキャッシュサーバーが保存しておく有効期限（秒）。" }
    ]
  },

  a4: {
    unitId: "a4",
    title: "HTTPとWebの仕組み",
    sections: [
      { heading: "リクエストとレスポンス", body: "<p>WebブラウザとWebサーバーは、HTTP（HyperText Transfer Protocol）というルールに従って通信します。ブラウザが「このページをください」という要求（リクエスト）を送り、サーバーがHTML等のデータを含む応答（レスポンス）を返す、という単純な一往復が基本の型です。リクエストにはGET（データの取得）やPOST（フォーム送信などデータの送信）といった「メソッド」があり、レスポンスには200(成功)・301/302(リダイレクト)・404(見つからない)・500(サーバーエラー)のような「ステータスコード」が付きます。HTTPS化された通信は、この土台の上にTLS（b4で学習）による暗号化とサーバー認証を重ねたものであり、HTTP自体の構造が変わるわけではありません。</p>", svg: "<svg viewBox='0 0 640 260' width='100%' style='max-width:640px;height:auto'><rect x='40' y='30' width='150' height='55' rx='6' fill='none' stroke='var(--grid)'/><text x='115' y='63' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>ブラウザ</text><rect x='450' y='30' width='150' height='55' rx='6' fill='none' stroke='var(--grid)'/><text x='525' y='63' font-family='sans-serif' font-size='14' fill='var(--ink)' text-anchor='middle'>Webサーバー</text><line x1='190' y1='55' x2='450' y2='55' stroke='var(--indigo)' stroke-width='2'/><polygon points='450,55 438,50 438,60' fill='var(--indigo)'/><text x='320' y='45' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>GET /page + Cookie(セッションID)</text><line x1='450' y1='95' x2='190' y2='95' stroke='var(--indigo)' stroke-width='2'/><polygon points='190,95 202,90 202,100' fill='var(--indigo)'/><text x='320' y='115' font-family='sans-serif' font-size='12' fill='var(--muted)' text-anchor='middle'>200 OK + HTML本文</text><rect x='160' y='150' width='320' height='70' rx='6' fill='none' stroke='var(--emerald)'/><text x='320' y='175' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>サーバーはセッションIDでログイン状態を判別</text><text x='320' y='195' font-family='sans-serif' font-size='13' fill='var(--ink)' text-anchor='middle'>HTTP自体は毎回の状態を覚えない(ステートレス)</text></svg>" },
      { heading: "Cookieとセッション、同一オリジンポリシー", body: "<p>HTTPは1回のやり取りごとに相手を忘れてしまう「ステートレス」な性質を持つため、ログイン状態を維持する仕組みとしてCookieが使われます。サーバーが発行したセッションID（本人確認の合言葉）をCookieに入れてブラウザに覚えさせ、以降のリクエストで自動的に送り返してもらうことでログイン状態を維持します。またブラウザには「同一オリジンポリシー」という重要な制約があり、あるWebサイト（オリジン。スキーム・ホスト名・ポート番号の組で決まる）のスクリプトは、原則として別のオリジンのデータを自由に読み取れないようになっています。この制約こそがXSSやCSRFといったWeb攻撃（e1〜e4で詳しく学びます）を理解する出発点になります。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「GET/POSTの違い」「ステータスコードの意味」「Cookieとセッション管理の仕組み」「同一オリジンポリシーとは何か」が定番です。</p><p><b>科目B（記述）</b>: Web系の大問（XSS・SQLインジェクション・セッションハイジャック等）のほぼすべてで、HTTPのやり取りやCookieの属性（Secure・HttpOnly・SameSite）を前提知識として使います。単独では出にくいですが、これを理解していないとe1〜e4の記述問題が解けません。</p>" }
    ],
    terms: [
      { term: "HTTPメソッド", desc: "GET（取得）・POST（送信）などリクエストの種類を表す指定。" },
      { term: "ステータスコード", desc: "レスポンスの結果を表す3桁の数字。200番台は成功、400番台はクライアント側エラー、500番台はサーバー側エラー。" },
      { term: "Cookie", desc: "サーバーがブラウザに保存させる小さなデータ。ログイン状態の維持などに使われる。" },
      { term: "セッションID", desc: "ログイン中の利用者を識別するためにサーバーが発行する一時的な合言葉。" },
      { term: "同一オリジンポリシー", desc: "スクリプトが別オリジン（別サイト）のデータへ自由にアクセスすることを制限するブラウザの基本ルール。" },
      { term: "ステートレス", desc: "1回ごとのやり取りで前回の状態を覚えていない性質。HTTPはこの性質を持つ。" },
      { term: "オリジン", desc: "スキーム・ホスト名・ポート番号の組み合わせで決まる、Webの「同じサイト」とみなす単位。" }
    ]
  },

  a5: {
    unitId: "a5",
    title: "電子メールの仕組み",
    sections: [
      { heading: "送信と受信のプロトコル", body: "<p>電子メールは「送信・転送」と「受信」で使うプロトコルが異なります。メールソフトからメールサーバーへ渡す時や、サーバー同士がメールを転送し合う時にはSMTP(Simple Mail Transfer Protocol)を使います。受信側では、サーバー上のメールを自分の端末にダウンロードするPOP3や、サーバー上にメールを残したまま複数端末で同期できるIMAPが使われます。スマートフォンとPCの両方で同じメールを見たい場合はIMAPが向いており、近年の企業向けメールサービスの多くはIMAP（またはWebメール）を前提にしています。SMTPには送信者を証明する仕組みが本来組み込まれておらず、Fromの欄は名乗るだけなら誰でも自由に書き換えられます。これが「送信者を自由に偽装できる」というメールのなりすまし問題の根本原因であり、対策はf4のSPF/DKIM/DMARCで学びます。</p>" },
      { heading: "メールヘッダーの読み方", body: "<p>メールには本文の前に「ヘッダー」という送受信の記録が付いています。差出人を示す From、実際に送信処理をしたサーバーの記録が転送のたびに追記されていく Received、返信先を指定する Reply-To などが代表的です。Fromは前述の通り自由に偽装できますが、Receivedにはメールが実際に経由したサーバーのIPアドレスや処理時刻が記録され、通常は途中の経路で改ざんしにくい情報です。フィッシングメールや標的型攻撃メールの調査では、このヘッダー情報を確認して送信元の実態を追ったり、名乗っているFromと実際の送信元が矛盾していないかを確認したりすることがよくあります。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「送信・転送はSMTP、受信はPOP3/IMAP」という役割分担、「メールヘッダーの各項目（From・Received・Reply-To）の意味」が問われます。</p><p><b>科目B（記述）</b>: 標的型攻撃メールやBEC（ビジネスメール詐欺）のシナリオで、メールヘッダーのFromとReceivedの矛盾から、なりすましメールであることを見抜かせる設問が出ます。f4（SPF/DKIM/DMARC）とセットで理解しておくと、なぜ送信ドメイン認証が必要なのかを説得力を持って記述できます。</p>" }
    ],
    terms: [
      { term: "SMTP", desc: "メールの送信・転送に使われるプロトコル。送信者を証明する仕組みを標準では持たない。" },
      { term: "POP3", desc: "メールサーバーからメールを自分の端末にダウンロードして受信するプロトコル。" },
      { term: "IMAP", desc: "メールをサーバー上に残したまま、複数端末で同期して閲覧できる受信プロトコル。" },
      { term: "メールヘッダー", desc: "送信者・経路・件名などの情報が記録された、メール本文の前に付くメタデータ部分。" },
      { term: "Received", desc: "メールが実際に経由したメールサーバーの記録が転送のたびに追記されるヘッダー項目。送信元調査に使われる。" },
      { term: "BEC（ビジネスメール詐欺）", desc: "取引先や経営層になりすまし、送金や情報提供をだまし取るメール詐欺。" }
    ]
  },

  a6: {
    unitId: "a6",
    title: "ネットワーク機器とLAN",
    sections: [
      { heading: "スイッチとルーターの役割分担", body: "<p>「スイッチ」は同じLAN内の機器同士を、MACアドレス（機器ごとに割り当てられた固有の識別番号）を見て中継する機器です。「ルーター」は異なるネットワーク同士（例: 社内LANとインターネット）をIPアドレスに基づいて中継する機器で、ここまで学んだIPアドレスによる通信経路の選択（ルーティング）を実際に行う役割を担います。家庭用の「Wi-Fiルーター」製品は、実際にはスイッチ・ルーター・NAT・無線LANアクセスポイントなど複数の機能を1台にまとめたものであることが多く、機能を分けて理解しておくと構成図の読解に役立ちます。企業のネットワークでは、これらの機能が用途ごとに別々の機器として設置され、間にファイアウォールなどの機器が挟まれる、より複雑な構成になります。</p>" },
      { heading: "VLANとネットワークの分割", body: "<p>同じスイッチにつながっていても、業務部門ごと・用途ごとに通信を論理的に分割したい場合にVLAN（Virtual LAN）を使います。VLANで分けたネットワーク同士は、直接には通信できず、ルーターやレイヤー3スイッチを経由する必要があります。この性質を利用して、来客用Wi-Fiと社内システムのネットワークを分離したり、重要なサーバー群だけを独立したセグメントに隔離したりすることで、万一どこかに侵入されても被害が広がる範囲を制限できます（f1のネットワーク設計にもつながる考え方です）。無線LANについても、SSID（ネットワーク名）ごとに接続先のVLANを分けるといった設計がよく使われます。</p>" },
      { heading: "試験ではこう出る", body: "<p><b>科目A-2</b>: 「スイッチとルーターの中継の基準（MACアドレス vs IPアドレス）の違い」「VLANの目的」「無線LANの基本用語（SSID・アクセスポイント）」が問われます。</p><p><b>科目B（記述）</b>: ネットワーク構成図が提示され、「攻撃者がどの区間を通って重要サーバーに到達できるか」「VLANやセグメント分割が不十分だったためにどこまで被害が広がったか」を説明させる問題の土台になります。f1（ファイアウォールとネットワーク設計）と合わせて構成図を読む練習をしておくと効果的です。</p>" }
    ],
    terms: [
      { term: "スイッチ", desc: "同一LAN内でMACアドレスをもとにフレームを中継する機器。" },
      { term: "ルーター", desc: "異なるネットワーク間でIPアドレスをもとにパケットを中継する機器。" },
      { term: "MACアドレス", desc: "ネットワーク機器に割り当てられた固有の識別番号。同一LAN内の通信の宛先識別に使われる。" },
      { term: "VLAN", desc: "物理的な配線構成に関わらず、論理的にネットワークを分割する技術。" },
      { term: "セグメント分割", desc: "ネットワークを複数の区画に分け、被害の拡大範囲を限定する設計手法。" },
      { term: "SSID", desc: "無線LANのネットワークを識別する名前。" },
      { term: "アクセスポイント", desc: "無線LAN端末を有線ネットワークに中継する機器。" }
    ]
  }

});
